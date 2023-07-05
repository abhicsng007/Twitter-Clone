const express = require('express');

const app = express();
const port = 3000;
const router = express.Router();
const User = require("../schemas/userSchema");
const bcrypt = require("bcrypt");

app.set('view engine','pug');
app.set('views','views');
app.use(express.urlencoded({extended:false}));

router.get("/", (req,res,next) => {
    
    res.status(200).render("register");
})

router.post("/",async(req,res,next) => {
    
    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;
    
    var payload = req.body;
    if(firstName && lastName && username && email && password){

        var user = await User.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        }).catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong!";
            res.status(200).render("register",payload);
        });

        if(user==null){

            var data = req.body;
            data.password = await bcrypt.hash(password,10);
            User.create(data).then((user) => {
                req.session.user = user;
                return res.redirect("/");
            })

        }
        else{
            if(email == user.email){
                payload.errorMessage = "email already in use";
            }
            else{
                payload.errorMessage = "username already in use";
            }
            res.status(200).render("register",payload);
        }



    }
    else{
        payload.errorMessage = "Make sure each field has a valid value";
        res.status(200).render("register",payload);
    }


    
})

module.exports = router;
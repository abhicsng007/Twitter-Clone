const express = require('express');
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
const router = express.Router();
const User = require("../schemas/userSchema");

app.set('view engine','pug');
app.set('views','views');

app.use(express.urlencoded({extended:false}));

router.get("/",(req,res,next) => {

    res.status(200).render("login");
})

router.post("/",async(req,res,next) => {
    var payload = req.body;
    if(req.body.loginUsername && req.body.loginPassword){
        var user = await User.findOne({
            $or:[
                {username:req.body.loginUsername},
                {email:req.body.loginUsername}
            ]
        }).catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong!";
            res.status(200).render("login",payload);
        });
        if(user != null){
            var result = await bcrypt.compare(req.body.loginPassword,user.password);
            if(result === true){
                req.session.user = user;
                return res.redirect("/");

            }
           
            
        }
        payload.errorMessage = "Incorrect Login Credentials!";
        return res.status(200).render("login",payload);
        
    }
    payload.errorMessage = "Make sure each field has a valid value!";
    res.status(200).render("login");
})

module.exports = router;
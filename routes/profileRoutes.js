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

    var payload = {
        pageTitle:req.session.user.username,
        userLoggedIn:req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        profileUser:req.session.user
        
    }

    res.status(200).render("profilePage",payload);
})



router.get("/:username",async(req,res,next) => {

    var payload = await getPayload(req.params.username,req.session.user);

    res.status(200).render("profilePage",payload);
})

router.get("/:username/replies",async(req,res,next) => {

    var payload = await getPayload(req.params.username,req.session.user);
    payload.selectedTab = "replies";
    res.status(200).render("profilePage",payload);
})

router.get("/:username/following",async(req,res,next) => {

    var payload = await getPayload(req.params.username,req.session.user);
    payload.selectedTab = "following";
    res.status(200).render("followersAndfollowing",payload);
})

router.get("/:username/followers",async(req,res,next) => {

    var payload = await getPayload(req.params.username,req.session.user);
    payload.selectedTab = "followers";
    res.status(200).render("followersAndfollowing",payload);
})

async function getPayload(username, userLoggedIn){
    var user = await User.findOne({username:username});
    if(user == null){
        user = await User.findById(username);
        if(user == null){
            return {
                pageTitle:"User not found",
                userLoggedIn:userLoggedIn,
                userLoggedInJs:JSON.stringify(userLoggedIn)
            }
        }
    }
    return {
        pageTitle:user.username,
        userLoggedIn:userLoggedIn,
        userLoggedInJs:JSON.stringify(userLoggedIn),
        profileUser:user
    }
}


module.exports = router;
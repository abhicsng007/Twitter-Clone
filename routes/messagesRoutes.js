const express = require('express');
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
const router = express.Router();
const User = require("../schemas/userSchema");



app.use(express.urlencoded({extended:false}));

router.get("/",(req,res,next) => {
    res.status(200).render("inboxPage",{ 
        pageTitle:"Inbox",
        userLoggedIn:req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    });
})

router.get("/new",(req,res,next) => {
    res.status(200).render("newMessage",{ 
        pageTitle:"New message",
        userLoggedIn:req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    });
})






module.exports = router;
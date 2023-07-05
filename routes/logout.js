const express = require('express');
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
const router = express.Router();
const User = require("../schemas/userSchema");



app.use(express.urlencoded({extended:false}));

router.get("/",(req,res,next) => {

    if(req.session){
        req.session.destroy(() =>{
            res.redirect("/login");
        })
    }

    
})

module.exports = router;
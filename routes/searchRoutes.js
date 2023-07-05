const express = require('express');
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
const router = express.Router();
const User = require("../schemas/userSchema");



app.use(express.urlencoded({extended:false}));

router.get("/",(req,res,next) => {

    var payload = createPayload(req.session.user);
    res.status(200).render("searchPage",payload);
})

router.get("/:selectedTab",(req,res,next) => {

    var payload = createPayload(req.session.user);
    payload.selectedTab = req.params.selectedTab;
    res.status(200).render("searchPage",payload);
})

function createPayload(userLoggedIn){
    return {
        pageTitle:"Search",
        userLoggedIn:userLoggedIn,
        userLoggedInJs: JSON.stringify(userLoggedIn)
        
    };
}


module.exports = router;
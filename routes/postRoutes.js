const express = require('express');
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
const router = express.Router();
const User = require("../schemas/userSchema");

app.set('view engine','pug');
app.set('views','views');

app.use(express.urlencoded({extended:false}));

router.get("/:id",(req,res,next) => {

    var payload = {
        pageTitle:"View post",
        userLoggedIn:req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        postId:req.params.id
        
    }

    res.status(200).render("postPage",payload);
})



module.exports = router;
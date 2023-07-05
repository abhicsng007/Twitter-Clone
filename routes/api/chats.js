const express = require('express');
const router = express.Router();
const User = require("../../schemas/userSchema");
const Post = require("../../schemas/postSchema");
const Chat = require("../../schemas/chatSchema");
const app = express();

app.use(express.urlencoded({extended:false}));

router.post("/",async (req,res,next) => {
    if(!req.body.user){
        console.log("Users params not sent with request");
        return res.sendStatus(400);
    }

    var users = JSON.parse(req.body.users);

    if(users.length == 0){
        console.log("Users array is empty");

    }

    users.push(req.session.user);

    var chatData = {
        users: users,
        isGroupChat: true
    };

    Chat.create(chatData)
    .then(results => res.status(200).send(results))
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    });
})


  
module.exports = router;
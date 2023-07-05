const express = require('express');

const app = express();
const port = 3000;
const middleware = require('./middleware');
const path = require("path");
const mongoose = require("./database");
const session = require("express-session");

app.set('view engine','pug');
app.set('views','views');
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,"public")));

app.use(session({
    secret:"rohirat",
    resave:true,
    saveUninitialized:false
}))

const loginRoute = require('./routes/loginRoutes.js');
const registerRoute = require('./routes/registerRoutes.js');
const logoutRoute = require('./routes/logout.js');
const postRoute = require("./routes/postRoutes");
const profileRoute = require("./routes/profileRoutes");
const uploadRoute = require("./routes/uploadRoutes");
const searchRoute = require("./routes/searchRoutes");
const messageRoute = require("./routes/messagesRoutes");

const postsApiRoute = require("./routes/api/posts");
const usersApiRoute = require("./routes/api/users");
const chatsApiRoute = require("./routes/api/chats");



app.use('/login',loginRoute);
app.use('/register',registerRoute);
app.use('/logout',logoutRoute);
app.use('/api/posts',postsApiRoute);
app.use('/api/users',usersApiRoute);
app.use('/api/chats',chatsApiRoute);
app.use('/posts',middleware.requireLogin,postRoute);
app.use('/profile',middleware.requireLogin,profileRoute);
app.use('/uploads',uploadRoute);
app.use('/search',middleware.requireLogin,searchRoute);
app.use('/messages',middleware.requireLogin,messageRoute);



const server = app.listen(port,() => console.log("Server listening on port"+port));


app.get("/",middleware.requireLogin,(req,res,next) => {
    var payload = {
        pageTitle:"Home",
        userLoggedIn:req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
        
    }
    res.status(200).render("home",payload);
})
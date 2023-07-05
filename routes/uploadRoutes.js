const express = require('express');
const path = require("path");
const app = express();
const port = 3000;
const router = express.Router();
const User = require("../schemas/userSchema");

app.set('view engine','pug');
app.set('views','views');

app.use(express.urlencoded({extended:false}));

router.get("/images/:path",(req,res,next) => {

    res.sendFile(path.join(__dirname,"../uploads/images/"+ req.params.path));
})




module.exports = router;
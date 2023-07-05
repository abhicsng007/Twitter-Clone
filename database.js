const mongoose = require("mongoose");

class Database{

    constructor(){
        this.connect();
    }

    connect(){mongoose.connect("mongodb+srv://abhi:abhi123@cluster0.6vfza.mongodb.net/twitterDB?retryWrites=true&w=majority")
    .then(() => {
        console.log("Database connection successful");
    }).catch((err) => {
        console.log("Database connection error"+err);
    });
}
    
}

module.exports = new Database();
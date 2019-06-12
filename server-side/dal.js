const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/super", { useNewUrlParser: true }, (err, mongoClient) => {

if(err) {
        console.log(err);
        return;
    }

    console.log("We're connected to " + mongoClient.name + " database on MongoDB.");

});

module.exports = {
    mongoose
};
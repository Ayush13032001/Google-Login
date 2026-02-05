const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
        .then(() => {
            console.log('MongoDB is Connected.....')
        }).catch((err) => {
            console.log("Error while connecting...", err);     
        })
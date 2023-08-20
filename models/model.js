const mongoose = require('mongoose');
const { ObjectId } = require("mongodb");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    followers: [{
        type: ObjectId,
        ref: "USER"
    }],

    Photo: {
        type: String,
    }

    ,
    following: [{
        type: ObjectId,
        ref: "USER"
    }]
})



mongoose.model("USER", userSchema);






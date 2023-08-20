const { ObjectId } = require("mongodb");
//mongoose.Schema.Types
const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({

    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        require: true

    },
    likes: [{
        type: ObjectId,
        ref: "USER"
    }],
    comments: [{
        comment: { type: String },
        postedBy: { type: ObjectId, ref: "USER" }

    }],
    postedBy: {
        type: ObjectId,
        ref: "USER"
    }
}, {
    timestamps: true
})

mongoose.model("POST", PostSchema);



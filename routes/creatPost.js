const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const POST = mongoose.model("POST")
const { route } = require('./auth')





router.post("/createpost", requireLogin, (req, res) => {
    const { body, pic } = req.body;
    if (!pic || !body) {
        return res.status(422).json({ error: "Please add all the fields" })
    }

    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    })

    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => console.log(err))
})




//route
router.get("/allposts", requireLogin, (req, res) => {
    POST.find()
        .populate("postedBy", "_id name Photo")
        .populate("comments.postedBy", " _id name ")
        .sort("-createdAt")
        .then(posts => res.json(posts))
        .catch(err => console.log(err));
})


router.get("/myposts", requireLogin, (req, res) => {
    POST.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name Photo")
        .populate("comments.postedBy", " _id name ")
        .sort("-createdAt")
        .then(myposts => {
            res.json(myposts)
        })
})


router.get("/myfollowingpost", requireLogin, (req, res) => {
    POST.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => { console.log(err) })
})













router.put("/like", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    })
        .populate("postedBy", "_id name Photo")
        .populate("likes", "_id name")
        .then((result, err) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }

        })
})

router.put("/unlike", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy", "_id name Photo")
        .populate("likes", "_id name")
        .then((result, err) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
})

router.put("/comment", requireLogin, (req, res) => {
    const comment = {
        comment: req.body.text,
        postedBy: req.user.id
    }
    POST.findByIdAndUpdate(req.body.postId, {

        $push: { comments: comment }
    }, {
        new: true
    }).populate("comments.postedBy", " _id name Photo ")

        .then((result, err) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
})





router.delete("/deletePost/:postId", requireLogin, (req, res) => {
    POST.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .then((post, err) => {
            if (!post || err) {
                console.log(err, post)
                return res.status(422).json({ message: "something is wrong" })
            }
            console.log(post.postedBy._id.toString(), req.user._id.toString())
            if (post.postedBy._id.toString() == req.user._id.toString()) {

                post.deleteOne()
                    .then(result => {
                        console.log(result)
                        return res.json({ message: "Successfully deleted" })
                    }).catch((err) => {
                        console.log(err)
                        return res.json("failed")
                    })
            }
        })
})
module.exports = router

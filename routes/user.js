const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const POST = mongoose.model("POST")
const USER = mongoose.model("USER")


//

//upload profilepic 
router.put("/uploadProfilePic", requireLogin, (req, res) => {
    USER.findByIdAndUpdate(req.user._id, {
        $set: { Photo: req.body.pic }
    }, {
        new: true
    })
        .then((result, err) => {
            if (err) return res.status(422).json({ error: err })
            else res.status(200).json(result)
        })
})

router.get("/user/:id", (req, res) => {
    USER.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
            POST.find({ postedBy: req.params.id })
                .populate("postedBy", "_id name")
                .populate("comments.postedBy", " _id name ")
                .then((post, err) => {
                    if (err) return res.status(422).json({ error: err })
                    res.status(200).json({ user, post })
                })
        })
        .catch(err => {
            return res.status(422).json({ error: "User not found" })
        })
})

//to unfollow

router.put("/unfollow", requireLogin, (req, res) => {
    let result3, result4
    USER.findByIdAndUpdate(req.body.followId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    })
        .then((result, err) => {
            if (err) {
                return res.status(422).json({ error: "error" })
            }
            result3 = result
        }
        )
    USER.findByIdAndUpdate(req.user._id, {
        $pull: { following: req.body.followId }
    }, {
        new: true
    })
        .then((result, err) => {
            if (err) return res.status(422).json({ error: "error" })


            result4 = result;
            return res.status(200).json({ message: "unfollowed" })
            //    return res.status(200).json({ message: " followed" })

        })


})

// router.put("/unfollow", requireLogin, (req, res) => {
//     USER.findByIdAndUpdate(req.body.followId, {
//         $pull: { followers: req.user._id }
//     }, {
//         new: true
//     },
//     ) // (err, result) => {
//     // if (err) {
//     //     return res.status(422).json({ error: err })
//     // }
//     USER.findByIdAndUpdate(req.user._id, {
//         $pull: { following: req.body.followId }
//     }, {
//         new: true
//     })
//     // .then(result => res.json(result))
//     // .catch(err => { return res.status(422).json({ error: err }) })
//     // }

// })
// router.put('/unfollow', requireLogin, (req, res) => {
//     USER.findByIdAndUpdate(req.body.followId, {
//         $pull: { folllowers: req.user._id }
//     },
//         {
//             new: true
//         }, (err, ersult) => {
//             if (err) return res.status(422).json({ error: err })
//             USER.findByIdAndUpdate(req.user._id, {
//                 $pull: { folllowing: req.body.followId }
//             }, {
//                 new: true
//             }).then(result => res.json(result))
//                 .catch(err => { return res.status(422).json({ error: err }) })
//         })
// })



// to follow

// router.put("/unfollow", requireLogin, (req, res) => {
//     // USER.findByIdAndUpdate(req.body.followId, {
//     //     $pull: { followers: req.user._id }
//     // }, {
//     //     new: true
//     // })
//     //     .then((result, err) => {
//     //         if (err) {
//     //             return res.status(422).json({ error: err })
//     //         }
//     //         else return res.status(200).json({ result, message: "unfollowed" })
//     //     }
//     //     )

//     USER.findByIdAndUpdate(req.user._id, {
//         $pull: { following: req.body.followId }
//     }, {
//         new: true
//     })
//     // .then((result, err) => {
//     //     if (err) {
//     //         return res.status(422).json({ error: err })
//     //     } else {
//     //         res.json(result)
//     //     }
//     //     console.log(result, err)
//     // })

//     console.log("unfollow nothing")
// }
// )




router.put("/follow", requireLogin, (req, res) => {
    let result1
    let result2
    USER.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, {
        new: true
    })
        .then((result, err) => {
            if (err) {
                return res.status(422).json({ error: "error in update follower" })
            }
            result1 = result;
        }
        )

    USER.findByIdAndUpdate(req.user._id, {
        $push: { following: req.body.followId }
    }, {
        new: true
    })
        .then((result, err) => {
            if (err) {
                return res.status(422).json({ error: "error in update following" })
            }
            result2 = result
            return res.status(200).json({ result1, result2, message: "Successfully followed" })
        })



})


// router.put("/follow", requireLogin, (req, res) => {
//     console.log(req.body.followId)
//     console.log(req.user._id)
//     USER.findByIdAndUpdate(req.body.followId, {
//         $push: { followers: req.user._id }
//     }, {
//         new: true
//     })
//         // .populate("followers", "_id name")
//         //    .populate("likes", "_id name")
//         .then((result, err) => {
//             if (err) {
//                 return res.status(422).json({ error: err })
//             } else {
//                 res.json(result)
//             }
//             console.log(result, err)
//         })



//     // USER.findByIdAndUpdate(req.user._id, {
//     //     $push: { following: req.body.followId }
//     // }, {
//     //     new: true
//     // })

//     //         .then(result => {
//     //             res.json(result)
//     //         })
//     //         .catch(err => { return res.status(422).json({ error: err }) })
// }

// )

// router.put("/follow", requireLogin, (req, res) => {
//     USER.findByIdAndUpdate(req.body.followId, {
//         $push: { followers: req.user._id }
//     }, {
//         new: true
//     },
//     ).then((err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         }
//     }
//     )
//     USER.findByIdAndUpdate(req.user._id, {
//         $push: { following: req.body.followId }
//     }, {
//         new: true
//     })
//         .then(result => {
//             res.json(result)

//         }
//         )
//     // .catch(err => { return res.status(422).json({ error: err }) })
//     //  }

// })

// router.put('/follow', requireLogin, (req, res) => {
//     USER.findByIdAndUpdate(req.body.followId, {
//         $push: { folllowers: req.user._id }
//     },
//         {
//             new: true
//         }, (err, ersult) => {
//             if (err) return res.status(422).json({ error: err })
//             USER.findByIdAndUpdate(req.user._id, {
//                 $push: { folllowing: req.body.followId }
//             }, {
//                 new: true
//             }).then(result => res.json(result))
//                 .catch(err => { return res.status(422).json({ error: err }) })
//         })
// })


module.exports = router;
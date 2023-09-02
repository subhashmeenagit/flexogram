
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const USER = mongoose.model("USER")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require("../keys")
const requireLogin = require('../middleware/requireLogin')

// router.get('/', (req, res) => {
//     res.send('Hello Bhai aagya khuch')
// })


//charCodeAt(i)
router.post("/signup", (req, res) => {
    const { name, userName, email, password } = req.body

    if (!name || !email || !userName || !password) {
        return res.status(422).json({ error: ` please add all required  fields` })
    }


    USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "user already exist with this email or useName" })
        }
        if (password.length <= 5) return res.status(422).json({ error: "Password should be greater than 6 number" })

        let Capt = false;
        let spec = false
        let small = false
        let num = false

        for (let i = 0; i < password.length; i++) {
            if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) small = true;
            if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) Capt = true;
            if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) num = true;
            if (password.charCodeAt(i) == 36 || password.charCodeAt(i) == 38 || password.charCodeAt(i) == 64 || password.charCodeAt(i) == 33) spec = true;
        }
        if (Capt == false) return res.status(422).json({ error: "password should contain at least 1 CAPITAL latter" })
        if (small == false) return res.status(422).json({ error: "password should contain at least 1 small latter" })
        if (num == false) return res.status(422).json({ error: "password should contain at least 1 number" })
        if (spec == false) return res.status(422).json({ error: "password should contain at least 1 special cheracter" })

        bcrypt.hash(password, 13).then((hasedPassword) => {
            const user = new USER({
                name,
                email,
                userName,
                password: hasedPassword
            })
            user.save()
                .then(user => { res.json({ message: "Registered Succesfullly !" }) })
                .catch(err => { console.log(err) })
        })
    })
})

router.post("/signin", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: `pleasse add email/password` })
    }

    USER.findOne({ email: email }).then((saveduserr) => {
        if (!saveduserr) {
            return res.status(422).json({ error: "Invalid email" })
        }
        bcrypt.compare(password, saveduserr.password).then((match) => {
            if (match) {

                const token = jwt.sign({ _id: saveduserr.id }, jwt_secret)
                const { _id, name, email, userName, Photo } = saveduserr
                res.status(200).json({ message: "Signin successfully !", token: token, user: { _id, name, email, userName, Photo } })
            }
            else return res.status(422).json({ error: "Invalid Password" })
        })
            .catch(err => console.log(err));
    })
})



module.exports = router











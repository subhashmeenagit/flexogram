
const express = require("express");
const cors = require("cors")
const app = express();
const PORT = process.env.port || 5000;
const mongoose = require("mongoose")
const { mongoUrl } = require("./keys")
const path = require("path")
mongoose.connect(mongoUrl);
require("./models/model")
require("./models/post")




app.use(cors())
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/creatPost'))
app.use(require("./routes/user"))

mongoose.connection.on('connected', () => {
    console.log("succceesfully connected to mongoDb")
})
mongoose.connection.on("error", () => {
    console.log("not connected ")
})



// app.get('/', (req, res) => {
//     res.json('hi this is port if flexo')
// })

//serving frontend yeeee

app.use(express.static(path.join(__dirname, "./flexogrm/build")))

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./flexogrm/build/index.html"),
        function (err) {
            res.status(500).send(err)
        }
    )
})

app.listen(PORT, () => {
    console.log("server is runing", PORT)
})



















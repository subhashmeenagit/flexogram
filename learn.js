

{







    /*




const express = require("express");
const cors = require('cors')
const app = express();
const PORT = 5000;
const mongoose = require("mongoose")
const mongoUrl = require("./keys")
require("./models/model")
mongoose.connect(mongoUrl);

app.use(cors)
app.use(express.json())
app.use(require('./routes/auth'))

mongoose.connection.on('connected', () => {
    console.log("succceesfully connected to mongoDb")
})
mongoose.connection.on("error", () => {
    console.log("not connected ")
})



app.get('/', (req, res) => {
    res.json('hi')
})

app.listen(PORT, () => {
    console.log("server is runing", PORT)
})






























data ke liye file bnai thi


//npm install bycrypt mongoose nonemon express 



const express = require("express");
const cors = require('cors')
const app = express();
const PORT = 5000;
const data = require('./data.js')

app.use(cors())
app.get('/', (req, res) => {
    res.json(data)
})
app.get('/about', (req, res) => {
    res.json(data)
})
app.listen(PORT, () => {
    console.log("server is runninf", PORT)
})



    //self createrd 
    //nodemon bar bar server run krwane ko kokkar ye kam khud kr deta hai
    // const http = require('http');
    // const { createServer } = require('http2');


    // const server = http.createServer((req, res) => {
    //     console.log('server ban gya')
    //     res.end('hello bhai huaa kuch')
    // })

    // server.listen(5000, "localhost", () => {
    //     console.log("server is running on 5000")
    // })

    */
}














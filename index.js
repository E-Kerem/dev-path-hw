const express = require("express");
const app = express();
const cors = require("cors");
const crypto = require('crypto');
app.use(cors());
app.use(express.json()); //req.body

let map = {}

app.get("/", async (req, res) => {
    res.json({ msg: "hello" })
})

app.post("/messages", async (req, res) => {
    try {
        const { message } = req.body;
        console.log(message)
        const hashedMessage = crypto.createHash('sha256').update(message).digest('hex');
        map[hashedMessage] = message
        console.log(hashedMessage)
        res.json(hashedMessage);
    } catch (err) {
        console.error(err.message);
    }
    console.log(map)
});

const salt = "123123"

app.get("/messages/:hashedMessage", async (req, res) => {
    try {
        const hashedMessage = req.params.hashedMessage;
        console.log(hashedMessage)
        if (hashedMessage in map) {
            res.json(map[hashedMessage])
        } else {
            res.sendStatus(404)
        }
    } catch (err) {
        console.error(err.message);
    }
});



// let server = "https://www.dev-path-rdzrs0jxm-e-kerem.vercel.app/"
// server = "dev-path-hw.vercel.app"
// const local = 8080
const PORT = process.env.port || 8080
app.listen(PORT, () => {
    console.log("server has started on port " + PORT);
});

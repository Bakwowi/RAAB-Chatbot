const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "PATCH", "HEAD", "DELETE", "OPTIONS"]
}));
app.use(express.json())

const httpServer = http.createServer(app);
const io = new Server(httpServer);


app.get("/", (req, res) => {
    res.send({
        message: "Hello from the server"
    })
});


app.post("/chat", async (req, res) => {
    const message = req.body;
    // console.log(message);
    const response = await fetch(`${process.env.AZURE_OPENAI_ENDPOINT}`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
            "api-key": process.env.AZURE_OPENAI_KEY
        },
        body: JSON.stringify({
            messages: [
                {role: "system", content: "You are a helpful assistant"},
                {role: "user", content: message["message"]}
            ],
            temperature: 0.2
        })
    });

    const data = await response.json();
    res.send(data);
    // console.log(data);
})





const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});


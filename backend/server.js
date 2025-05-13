const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json())


// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// })







const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.get("/", async (req, res) => {
    res.status(200).send({
        message: "hello fro RAAB"
    })
});


app.post("/test", (req, res) => {
    res.json(req.body);
    // console.log(req)
})



// const OpenAI = require("openai");

// const openai = new OpenAI();

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "developer", content: "You are a helpful assistant." }],
//     model: "gpt-4.1",
//     store: true,
//   });

//   console.log(completion.choices[0]);
// }

// main();




// app.post("/completions", async (req, res) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             model: "gpt-4.1",
//             messages: [{role: "user", content: "You are a helpful assistant"}],
//             max_tokens: 50,
//         })
//     }

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data = await response.json();
//         res.send(data);
//     } catch (error) {
//         console.error(error);
//     }
// })






io.on("connection", (socket) => {
    console.log(socket.id);
    // socket.emit("connect-server", "You have connected with the server")
    socket.emit("message", "Hi from the server");

    socket.on("client-message", (response) => {
        console.log(response);
    })
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});


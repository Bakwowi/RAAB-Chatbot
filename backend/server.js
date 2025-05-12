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

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

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
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
// const cors = require("cors"); 
const app = require("./app.js");
const socket = require("./sockets/socket.js");
const e = require("express");
const routes = express.Router();


const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
  },
});


socket(io);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

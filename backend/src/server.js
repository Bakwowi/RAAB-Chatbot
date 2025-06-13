const http = require("http");
const { Server } = require("socket.io");
const app = require("./app.js");
const socket = require("./sockets/socket.js");
const mongoose = require("mongoose");
const connectDB = require("./config/db.js");


const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true,
  },
});


socket(io);

connectDB();

const con = mongoose.connection;

con.on("open", () => {
  const PORT = process.env.PORT || 3000;
   httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

con.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});



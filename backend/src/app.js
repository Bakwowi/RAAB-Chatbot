const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Message = require("./models/messageModel.js");
const Conversation = require("./models/conversationModel.js");
// const connectDB = require("./config/db.js");
dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Hello from the server",
  });
});

// connectDB();
// const con = mongoose.connection;

// con.on("open", () => {
//   console.log("Connected to MongoDB");
// });
// con.on("error", (err) => {
//   console.error("MongoDB connection error:", err);
// });


app.get("/conversations/:userId", async (req, res) => {
  try {
    const conversations = await Conversation.find({ user_id: req.params.userId });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching conversations" });
  }
});

// app.get("/conversations/:conversationId");

// app.patch("/conversations/:conversationId/messages");

app.post("/conversations", async (req, res) => {
  const conversation = new Conversation({
    conversation_id: req.body.conversationId || "exampleConversation",
    user_id: req.body.userId,
    title: "New chat",
    messages: [],
    created_at: new Date(),
    updated_at: new Date()
  });
  try {
    const conv = await conversation.save();
    console.log("Conversation saved:", conv);
    res.status(201).json(conv);
  } catch (error) {
    res.status(500).json({ error: "Error saving conversation" });
  }
});


module.exports = app;
const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Message = require("./models/messageModel.js");
const Conversation = require("./models/conversationModel.js");
const {getTitle} = require("./controllers/chatController.js");
// const connectDB = require("./config/db.js");
dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PATCH", "DELETE"],
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
    const conversations = await Conversation.find({ userId: req.params.userId });
    res.json(conversations);
    // console.log(conversations)
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error fetching conversations" });
  }
});

// app.get("/conversations/:conversationId");

app.patch("/conversations", async (req, res) => {
  const { messages, conversationId, userId } = req.body;
  // const { conversationId } = req.params;

  // console.log("start of body", req.body, "end of body");

  if (!messages || !conversationId || !userId) {
    return res.status(400).json({ error: "No conversationid, message, or userId" });
  }

  try {
    // console.log(getTitle());
    const conversation = await Conversation.findOneAndUpdate(
      { userId: userId, conversationId: conversationId },
      { $set: { messages: messages, updated_at: new Date(), title: getTitle() } },
      { new: true }
    );
    // console.log("conversations patched");
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found." });
    }

    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: "Error updating messages." });
  }
});

// app.patch("/conversations/title")

app.post("/conversations", async (req, res) => {
  if (!req.body.userId) {
    return res.status(400).json({ error: "userId is required." });
  }
  // console.log("request body ",req.body);
  // console.log("Creating new conversation with body:", req.body.userId, req.body.conversationId, req.body.messages);
  const conversation = new Conversation({
    conversationId: req.body.conversationId || "exampleConversation",
    userId: req.body.userId,
    title: "New chat",
    messages: req.body.messages || [],
    created_at: new Date(),
    updated_at: new Date()
  });
  try {
    const conv = await conversation.save();
    // console.log("Conversation saved:");
    return res.status(201).json(conv);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error saving conversation" });
  }
});

app.get("/conversations/:userId/:conversationId/messages", async (req, res) => {
  const { userId, conversationId } = req.params;

  try {
    const conversation = await Conversation.findOne({ userId: userId, conversationId: conversationId });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found." });
    };

    const messages = conversation.messages.map((message) => ({
      role: message.role,
      content: message.content
    }));
    return res.json(messages);
  }
  catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "Error fetching messages." });
  }
});

app.delete("/conversations/:userId/:conversationId", async (req, res) => {
  const { userId, conversationId } = req.params;

  try {
    const deletedConversation = await Conversation.findOneAndDelete({ userId: userId, conversationId: conversationId });
    if (!deletedConversation) {
      return res.status(404).json({ error: "Conversation not found." });
    }
    return res.json({ message: "Conversation deleted successfully." });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return res.status(500).json({ error: "Error deleting conversation." });
  }
});


module.exports = app;
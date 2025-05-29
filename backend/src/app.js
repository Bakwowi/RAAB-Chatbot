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

app.get("/db", async (req, res) => {
  try {
      const data = await Message.find();
      res.status(200).json(data);
  } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
  }
});

app.get("/db/:id", async (req, res) => {
  try {
      const data = await Message.findById(req.params.id);
      res.status(200).json(data);
  } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
  }
});

app.post("/db", async (req, res) => {
    // console.log(req.body);
  const message = new Message({
    role: req.body.role,
    content: req.body.content
  });
  console.log(message);
  try {
    const mess = await message.save();
    res.status(201).json(mess);
  } catch (error) {
    res.status(500).json({ error: "Error saving message" });
  }
});

app.patch("/db/:id", async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      {
        role: req.body.role,
        content: req.body.content
      },
      { new: true }
    );
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: "Error updating message" });
  }
});

app.get("/conversations/:id", async (req, res) => {
  try {
    const data = await Conversation.find();
    res.status(200).json(data);
  }
  catch (error) {
    res.status(500).json({ error: "Error fetching conversations" });
  }
});
app.get("/messages", async (req, res) => {
  try {
    const data = await Message.find();
    res.status(200).json(data);
  }
  catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});


module.exports = app;
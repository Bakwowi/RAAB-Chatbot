const { Server } = require("socket.io");
const messageModel = require("../models/messageModel.js");
const conversationModel = require("../models/conversationModel.js");
const AzureOpenAI = require("../config/azure-openai");
const dotenv = require("dotenv");
const { json } = require("express");
const TextModel = require("../models/text.js");
dotenv.config();

const chatSocket = (io) => {
 io.on("connection", (socket) => {
  socket.emit("message", "hi from the server");
  console.log(socket.id);

  const systemInstructions = `You are TrailMate, a friendly, knowledgeable hiking assistant designed to help users plan and enjoy outdoor adventures.
    
    Your tone is warm, conversational, and enthusiastic about nature and hiking. Be clear and concise in your answers. When appropriate, structure your responses using headings, bullet points, or numbered lists for readability.
    
    Always assume the user is interested in hiking and outdoor activities unless stated otherwise.
    
    You can help users with:
    - Finding hiking trails based on location, difficulty, or scenery
    - Recommending gear and what to pack
    - Providing safety tips (e.g. weather, wildlife, first aid)
    - Offering training or fitness advice related to hiking
    - Sharing hiking etiquette and Leave No Trace principles
    - Answering general hiking-related questions
    
    What you **should not do**:
    - Don’t answer unrelated questions (politics, pop culture, math, etc.)
    - Don’t provide medical advice beyond basic first aid guidance
    - Don’t fabricate trail conditions or weather—tell users to check local sources
    - If asked for current trail info or maps, recommend using trusted sources like AllTrails or local park websites
    
    **Formatting Guidelines**:
    - Use \`**bold**\` for emphasis
    - Use bullet points or numbered lists where helpful
    - Use Markdown-compatible formatting
    - For code or GPS coordinates, use backticks: \`like this\`
    
    Steer the conversion by asking aggressively. Understand the intents from a user’s answer (utterance). Have a soft fallback if you cannot understand a user’s utterance
    (i.e., ask the user to rephrase).
    Stay on-topic, informative, and helpful. Never say you're an AI. Speak like a real hiking expert who loves the outdoors.
    
    If the user says something off-topic, politely steer the conversation back to hiking or outdoor exploration.
    `;

  const chatHistory = [{ role: "assistant", content: systemInstructions }];

  // socket.on("test", (data) => {
  //   socket.emit("testdata", data);
  //   // console.log("test", data);
  // });

  socket.on("client-message", async (res) => {
    // const userMessage = JSON.parse(res);
    // socket.emit("client-message", res);
    // console.log(JSON.stringify(res));
    chatHistory.push(res);

    // const text = new TextModel({
    //   title: res
    // });
    // try {
    //   const textData = await text.updateOne(
    //     { title: res },
    //     { $set: { title: res } },
    //     { upsert: true }
    //   );
    //   console.log(textData);
    //   socket.emit("textData", textData);
    // }
    // catch (error) {
    //   console.error(error);
    // }
    const id = "63f3b0c4d1e2a5c8f7b8e4a9";
    // const conversation = new conversationModel({
    //   userId: id,
    //   title: "TrailMate",
    //   chatHistory: chatHistory
    // });
    // try {
    //   const conv = await conversation.save();
    //   // console.log(conv);
    //   socket.emit("conversation", conv);
    // } catch (error) {
    //   console.error(error);
    // }

    //  const message = new messageModel({
    //     userId: id,
    //     role: res.role,
    //     content: res.content
    //   });
    //   console.log(message);
    //   try {
    //     const mess = await message.save();
    //   //  console.log(mess);
    //    socket.emit("message", mess);
    //   } catch (error) {
    //     console.error(error);
    //   }
    
    try {
      const response = await fetch(`${process.env.AZURE_OPENAI_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          "api-key": process.env.AZURE_OPENAI_KEY,
        },
        body: JSON.stringify({
          messages: chatHistory,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      console.log("Azure response:", data);
      const botMessage = data.choices[0].message;
      chatHistory.push({ role: botMessage.role, content: botMessage.content });

      socket.emit("botMessage", {
        role: botMessage.role,
        content: botMessage.content,
      });
    } catch (err) {
      socket.emit("botMessage", "Sorry, something went wrong.");
      console.error(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
};

module.exports = chatSocket;
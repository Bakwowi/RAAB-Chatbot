const messageModel = require("../models/messageModel");
const AzureOpenAI = require("../config/azure-openai");


const chatController = async (req, res) => {
        try {
        const { message } = req.body;
        const response = await AzureOpenAI(message);
        const newMessage = new messageModel({
            role: message.role,
            content: response.content,
        });
        console.log("New message:", newMessage);
        await newMessage.save();
        res.status(200).json(newMessage);
        } 
        catch (error) {
        console.error("Error in chatController:", error);
        res.status(500).json({ error: "Internal server error" });
        }
};

const getMessages = async (req, res) => {
    try {
        const messages = await messageModel.find();
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}



module.exports = {
    chatController,
    getMessages
};
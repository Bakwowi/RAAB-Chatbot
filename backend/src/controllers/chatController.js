const messageModel = require("../models/messageModel");
const conversationModel = require("../models/conversationModel");
const { getAzureOpenAIResponse, generateConversationTitle } = require("../config/azure-openai");

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

let chatHistory = [{ role: "assistant", content: systemInstructions }];
let messageCount = 0;
let chatTitle = "";
let isTitleGenerated = false;
let isNewConversation = true;

const chatController = async (userMessage, userId) => {
  chatHistory.push(userMessage);
  messageCount++;
  try {
  if (true) {
    isTitleGenerated = true;
    const title = await generateConversationTitle(chatHistory);
    console.log("Generated title:", title);
    chatTitle = title;
    messageCount = 0;
  }
} catch (error) {
  console.error("Error generating conversation title:", error);
  chatTitle = "Untitled Conversation";
  isTitleGenerated = false;
  messageCount = 0;
}

  try {
    // console.log(chatHistory);
    const response = await getAzureOpenAIResponse(chatHistory);
    chatHistory.push(response);

    await conversationModel.updateOne(
      { userId: userId || "exampleOne" },
      {
      $set: {
        title: chatTitle,
        chatHistory: chatHistory.slice(1), // Exclude system instructions
      },
      },
      { upsert: true }
    );

    return [response, chatTitle, chatHistory];
  } catch (error) {
    console.error("Error in chatController:", error);
    return "An error occurred while processing your request.";
  }
};

// const getMessages = async (req, res) => {
//     try {
//         const messages = await messageModel.find();
//         res.status(200).json(messages);
//     } catch (error) {
//         console.error("Error fetching messages:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }

module.exports = chatController;

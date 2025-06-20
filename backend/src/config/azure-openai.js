// const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

// const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY;
// const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;


const getAzureOpenAIResponse = async (prompt) => {
   try {
    //   const response = await fetch(`${process.env.AZURE_OPENAI_ENDPOINT}`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "Application/json",
    //       "api-key": process.env.AZURE_OPENAI_KEY,
    //     },
    //     body: JSON.stringify({
    //       messages: prompt,
    //       temperature: 0.7,
    //     }),
    //   });

    // if (!response.ok) {
    //   throw new Error(`Error: ${response.statusText}`);
    // }

    // const data = await response.json();
    // return data.choices[0].message;
    return (
      {
        role: "assistant", 
        content: "This is a mock response from Azure OpenAI. Please replace this with actual API call. You can use the commented code above to make the actual call."
      }
    );
  } catch (error) {
    console.error('Error fetching from Azure OpenAI:', error);
    throw error;
  }
}

const generateConversationTitle = async (messages) => {
  // const response = fetch(`${process.env.AZURE_OPENAI_ENDPOINT}`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "api-key": process.env.AZURE_OPENAI_KEY,
  //   },
  //   body: JSON.stringify({
  //     messages: [
  //       {
  //         role: "system",
  //         content: "You are a helpful assistant that generates titles for conversations based on the provided messages.",
  //       },
  //       ...messages,
  //     ],
  //     temperature: 0.7,
  //   }),
  // });

  // if (!response.ok) {
  //   throw new Error(`Error: ${response.statusText}`);
  // }

  // const data = await response.json();
  // if (data.choices && data.choices.length > 0) {
  //   return data.choices[0].message.content;
  // } else {
  //   throw new Error("No title generated from the conversation.");
  // }
  return "Mock Conversation Title"; // Replace with actual title generation logic
};

module.exports = {getAzureOpenAIResponse, generateConversationTitle};
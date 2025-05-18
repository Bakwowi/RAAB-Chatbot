const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY;
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;


const getAzureOpenAIResponse = async (prompt) => {
  const url = `${AZURE_OPENAI_ENDPOINT}`;
  const headers = {
    'Content-Type': 'application/json',
    'api-key': AZURE_OPENAI_API_KEY,
  };
  const body = JSON.stringify({
    prompt: prompt,
    max_tokens: 100,
    temperature: 0.7,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].text;
  } catch (error) {
    console.error('Error fetching from Azure OpenAI:', error);
    throw error;
  }
}

module.exports = getAzureOpenAIResponse;
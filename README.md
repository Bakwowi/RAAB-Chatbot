# 🤖 RAAB – AI Chatbot using MERN Stack, Socket.IO & Azure OpenAI

**RAAB (Responsive AI Assistant Bot)** is an intelligent chatbot application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js), enhanced with **real-time messaging via Socket.IO**, and powered by the **OpenAI API through Azure**. RAAB delivers fast, natural conversations for use cases such as virtual assistance, customer support, and productivity tools.

---

## 🚀 Features

- 💬 **Real-time Chat with Socket.IO** – Fast and smooth message exchange between users and bot.
- 🧠 **AI-Powered Responses** – Integrates with Azure-hosted OpenAI models (e.g., GPT-4).
- 💾 **MongoDB Integration** – Persists chat messages for history and context.
- 🌐 **MERN Stack** – Full-stack JavaScript solution for scalability and performance.
- 🛡️ **Environment-Based Config** – Secure handling of API keys and deployment details.

---

## 🧱 Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB (via Mongoose)  
- **Real-Time**: Socket.IO  
- **AI Service**: Azure OpenAI (GPT-4 or GPT-3.5-turbo)  
- **Dev Tools**: dotenv, concurrently, CORS, Axios

---

## 📁 Project Structure

<pre> ``` 
  RAAB/ 
  ├── frontend/ 
  │ ├── public/ 
  │ └── src/ 
  │     ├── assets/ 
  │     ├── components/ 
  │     ├── css/ 
  │     ├── js/ 
  │     ├── App.jsx
  │     └── Main.jsx
  ├── backend/ 
  │ └── src/ 
  │     ├── config/ 
  │     ├── controllers/ 
  │     ├── models/ 
  │     ├── socket/ 
  │     ├── utils/ 
  │     ├── app.js
  │     ├── .env 
  │     └── server.js
  ├── .gitignore
  └── README.md
  ``` </pre>

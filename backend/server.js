const express = require("express"); // Import the Express.js framework.
const http = require("http"); // Import the HTTP module to create the server.
const {Server} = require("socket.io")
const dotenv = require("dotenv"); // Import dotenv to manage environment variables.

dotenv.config(); // Load environment variables from a `.env` file.

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);






const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});
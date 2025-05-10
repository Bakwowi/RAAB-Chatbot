const express = require("express"); // Import the Express.js framework.
const http = require("http"); // Import the HTTP module to create the server.
const dotenv = require("dotenv"); // Import dotenv to manage environment variables.

dotenv.config(); // Load environment variables from a `.env` file.

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
    res.send("Hello from the server");
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});
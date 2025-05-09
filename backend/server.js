const express = require("express"); // Import the Express.js framework.
const http = require("http"); // Import the HTTP module to create the server.
const dotenv = require("dotenv"); // Import dotenv to manage environment variables.

dotenv.config(); // Load environment variables from a `.env` file.

/**
 * Create an instance of an Express application.
 * This will be used to define routes and middleware.
 */
const app = express();

/**
 * Create an HTTP server using the Express application.
 */
const server = http.createServer(app);

/**
 * Set a GET route for the root URL ("/").
 * The server responds with a simple message "Hello from the server".
 */
app.get("/", (req, res) => {
    res.send("Hello from the server");
});

/**
 * The port number on which the server will listen and
 * this value is retrieved from the environment variables.
 */
const PORT = process.env.PORT;

/**
 * Start the server and listen on the specified port then
 * sends a message to the console when the server is running.
 */
server.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});
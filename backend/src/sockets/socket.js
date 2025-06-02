const chatController = require("../controllers/chatController.js");
const dotenv = require("dotenv");
dotenv.config();

const chatSocket = (io) => {
 io.on("connection", (socket) => {
  socket.emit("message", "hi from the server");
  console.log(socket.id);

  socket.on("client-message", async (res) => {
    const userId = socket.handshake.auth ? socket.handshake.auth.userId : null;

    console.log("userId from socket auth", socket.handshake.auth);
    console.log("userId from socket", userId);
    console.log("recieving user message", res);

    response = await chatController(res[0], userId, res[1]);
    // console.log("response from chatController", response);
    const [botResponse, chatTitle, chatHistory] = response;
    socket.emit("botMessage", botResponse);
    socket.emit("chatTitle", chatTitle);
    socket.emit("chatHistory", chatHistory);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
};

module.exports = chatSocket;
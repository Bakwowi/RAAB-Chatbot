const {chatController} = require("../controllers/chatController.js");
const dotenv = require("dotenv");
dotenv.config();

const chatSocket = (io) => {
 io.on("connection", (socket) => {
  socket.emit("message", "hi from the server");
  console.log(socket.id);

  socket.on("client-message", async (res, userId) => {
    console.log("recieving user message", res);
    response = await chatController(res, userId);
    // console.log("response from chatController", response);
    socket.emit("botMessage", response);
    
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
};

module.exports = chatSocket;
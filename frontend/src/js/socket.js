// socket.js
import { io } from "socket.io-client";

const URL = "http://localhost:3000";
let socket = null;

function getSocket() {
  if (!socket) {
    const userId = getOrCreateUserId();
    console.log("Connecting to socket with userId:", userId);
    socket = io(URL, {
      withCredentials: true,
      // autoConnect: false,
      auth: { 
        userId: userId
      }
    });
  }
  return socket;
}

function getOrCreateUserId() {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("userId", userId);
  }
  return userId;
}

export default getSocket;

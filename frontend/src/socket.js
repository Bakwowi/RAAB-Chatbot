// socket.js
import { io } from "socket.io-client";

const URL = "http://localhost:3000";
let socket = null;

function getSocket() {
  if (!socket) {
    const userId = getOrCreateUserId();
    socket = io(URL, {
      withCredentials: true,
      autoConnect: false,
      auth: { userId }
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

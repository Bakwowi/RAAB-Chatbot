import React from "react";
import SideBar from "./components/SideBarComponents/SideBar.jsx";
import ChatWindow from "./components/ChatComponents/ChatWindow.jsx";
import "./css/App.css";
import getSocket from "./js/socket.js";

class App extends React.Component {
  constructor() {
    super();
    this.socket = null;
    this.state = {
      conversations: [],
      activeConversation: null,
    };
  }
  componentDidMount = () => {
    this.socket = getSocket();

    if (!this.socket.connected) {
      this.socket.connect();
    }
  };
  componentWillUnmount = () => {
    this.socket.off();
    // this.socket.off("botMessage");
  };

saveMessageToConversation = (message, conversationId) => {
    // Save the message to the conversation in the state
    this.setState((prevState) => {
        const conversations = prevState.conversations.slice();
        const index = conversations.findIndex(
            (conv) => conv.conversationId === conversationId
        );
        if (index !== -1) {
            // Add message to existing conversation
            conversations[index] = {
                ...conversations[index],
                chatHistory: [...conversations[index].chatHistory, message],
            };
        } else {
            // Create new conversation if not found
            conversations.push({
                conversationId,
                title: "New Chat",
                chatHistory: [message],
                Timestamp: new Date().toISOString(),
            });
        }
        return { conversations };
    });
    console.log(this.state.conversations);
};

  resetConversations = () => {
    this.setState({
        conversations: [],
        
    });
};

  createNewConversation = (callback) => {
    // // Create a new chat by sending a POST request to the server
    // fetch(`http://localhost:3000/conversations`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     userId: localStorage.getItem("userId") || "default",
    //     conversationId: Math.random().toString(36).substring(2, 15),
    //     title: "New Chat",
    //     chatHistory: [],
    //     Timestamp: new Date().toISOString(),
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log("New conversation created:", data);
    //     // this.socket.emit("newConversation", data);
    let conversationId = Math.random().toString(36).substring(2, 15)
        this.setState(
          () => ({
            activeConversation: conversationId,
          }),
          () => {
            // console.log(this.state.activeConversation);
            this.resetConversations();
            // console.log("Active conversation set to:", conversationId);
          }
        );
        if (callback) {
          callback(conversationId);
        }
    //   })
    //   .catch((error) => {
    //     console.error("Error creating new conversation:", error);
    //   });
  };

  sendMessage = (message) => {
    if (this.state.activeConversation === null) {
      this.createNewConversation((conversationId) => {
        this.socket.emit("client-message", [message, conversationId]);
        // this.saveMessageToConversation(message, conversationId);
      });

    //   console.log("No active conversation, created a new one.");
    } else {
    //   this.saveMessageToConversation(message, this.state.activeConversation);
      this.socket.emit("client-message", [
        message,
        this.state.activeConversation,
      ]);
    }
  };

  render() {
    return (
      <div className="container">
        <SideBar
          newConversation={this.createNewConversation}
          activeConversation={this.state.activeConversation}
        />
        <ChatWindow
          newConversation={this.createNewConversation}
          conversations={this.state.conversations}
          activeConversation={this.state.activeConversation}
          sendMessage={this.sendMessage}
          saveMessageToConversation={this.saveMessageToConversation}
        />
      </div>
    );
  }
}

export default App;

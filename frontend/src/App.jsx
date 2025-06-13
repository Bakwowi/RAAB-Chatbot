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

  generateRandomId = (length = 10) =>  {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }


  createNewConversation = () => {
    const convid = this.generateRandomId();
    fetch("http://localhost:3000/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        conversationId: convid,
        userId: localStorage.getItem("userId")
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          activeConversation: data.conversation_id
        })
      })
      .catch(error => console.error(error));
  };
  
  render() {
    return (
      <div className="container">
        <SideBar
          createNewConversation={this.createNewConversation}
          conversations={this.state.conversations}
          activeConversation={this.state.activeConversation}
        />
        <ChatWindow
          createNewConversation={this.createNewConversation}
          activeConversation={this.state.activeConversation}
        />
      </div>
    );
  }
}

export default App;

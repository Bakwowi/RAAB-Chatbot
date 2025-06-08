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

  


  render() {
    return (
      <div className="container">
        <SideBar
          handleNewChat={this.handleNewChat}
          conversations={this.state.conversations}
          activeConversation={this.state.activeConversation}
        />
        <ChatWindow
          activeConversation={this.state.activeConversation}
        />
      </div>
    );
  }
}

export default App;

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
      loading: true
    };
    this.userId = localStorage.getItem("userId")
  }
  componentDidMount = () => {
    this.socket = getSocket();

    if (!this.socket.connected) {
      this.socket.connect();
    }

    this.fetchConversations();
  };
  componentWillUnmount = () => {
    this.socket.off();
    // this.socket.off("botMessage");
  };

   fetchConversations = () => {
      // const userId = localStorage.getItem("userId") || "default";
      fetch(`http://localhost:3000/conversations/${this.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            conversations: data,
            loading: false,
          });
        })
        .catch((error) => {
          console.error("Error fetching conversations:", error);
          this.setState({ loading: false });
        });
    };

  generateRandomId = (length = 10) =>  {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }


  createNewConversation = (callback=null) => {
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
       
        this.setState((prevState) => ({
          conversations: [data, ...prevState.conversations],
          activeConversation: data.conversationId
        }), () => {
          if(callback){
          callback();
        }
        });
          console.log(data)
        
      })
      .catch(error => console.error(error));
  };
  
  render() {
    return (
      <div className="container">
        <SideBar
          createNewConversation={this.createNewConversation}
          fetchConversations={this.fetchConversations}
          conversations={this.state.conversations}
          activeConversation={this.state.activeConversation}
          loading={this.state.loading}
        />
        <ChatWindow
          createNewConversation={this.createNewConversation}
          fetchConversations={this.fetchConversations}
          activeConversation={this.state.activeConversation}
        />
      </div>
    );
  }
}

export default App;

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
      messages: [],
      activeConversation: null,
      loading: true,
    };
    this.userId = localStorage.getItem("userId");
  }
  componentDidMount = () => {
    console.log("App component mounted");
   

    this.socket = getSocket();

    if (!this.socket.connected) {
      this.socket.connect();
    }

    this.fetchConversations();

    const savedActiveConversation = sessionStorage.getItem("activeConversation");
    if (savedActiveConversation) {
      this.setState({ activeConversation: savedActiveConversation }, () => {
        console.log(
          "Active conversation set from localStorage:",
          this.state.activeConversation
        );
      });
      this.fetchMessages(savedActiveConversation);
    }

    //  const savedConversation = localStorage.getItem("messages");
    // if (savedConversation) {
    //   const parsedMessages = JSON.parse(savedConversation);
    //   if (parsedMessages.length > 0) {
    //     localStorage.removeItem("messages");
    //     console.log(
    //       "Messages found in localStorage, removing and setting state.",
    //       parsedMessages
    //     );
    //   }
    // }
    // const savedActiveConversation = sessionStorage.getItem("activeConversation");
    // if (savedActiveConversation) {

    // };
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
        "Content-Type": "application/json",
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

  // saveMessagesToDb = (messages) => {
  //   const { activeConversation } = this.state;
  //   if (!activeConversation) {
  //     console.error("No active conversation to save messages to.");
  //     return;
  //   }

  //   fetch(`http://localhost:3000/conversations/${activeConversation}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       messages: messages,
  //       conversationId: activeConversation,
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log("Messages saved successfully:", data);
  //       this.fetchConversations();
  //     })
  //     .catch(error => console.error("Error saving messages:", error));
  // };

  generateRandomId = (length = 10) => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  createNewConversation = () => {
    const convid = this.generateRandomId();
    fetch("http://localhost:3000/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: convid,
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState(
          (prevState) => ({
            conversations: [data, ...prevState.conversations],
            activeConversation: data.conversationId,
            messages: [],
          }),
          () => {
            this.fetchConversations();
            sessionStorage.setItem("activeConversation", data.conversationId);
          }
        );
        // console.log(data)
      })
      .catch((error) => console.error(error));
  };

  fetchMessages = (conversationId) => {
    fetch(
      `http://localhost:3000/conversations/${
        localStorage.getItem("userId") || "default"
      }/${conversationId}/messages`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState(
          {
            messages: data,
            activeConversation: conversationId,
          },
          () => {
            console.log("Messages fetched for conversation:", conversationId);
            // console.log("Messages:", this.state.messages);
          }
        );
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  render() {
    return (
      <div className="container">
        <SideBar
          createNewConversation={this.createNewConversation}
          fetchMessages={this.fetchMessages}
          conversations={this.state.conversations}
          activeConversation={this.state.activeConversation}
          loading={this.state.loading}
        />
        <ChatWindow
          createNewConversation={this.createNewConversation}
          fetchConversations={this.fetchConversations}
          activeConversation={this.state.activeConversation}
          messages={this.state.messages}
        />
      </div>
    );
  }
}

export default App;

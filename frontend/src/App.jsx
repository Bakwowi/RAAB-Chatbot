import React from "react";
import SideBar from "./components/SideBarComponents/SideBar.jsx";
import ChatWindow from "./components/ChatComponents/ChatWindow.jsx";
import "./css/App.css";
import getSocket from "./js/socket.js";
import ErrorBoundary from "./ErrorBoundary.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.socket = null;
    this.state = {
      conversations: [],
      messages: [],
      activeConversation: null,
      loading: true
      // chatTitle: "New Chat"
    };
    this.userId = localStorage.getItem("userId");
  }
  componentDidMount = () => {
    // console.log("App component mounted");
   

    this.socket = getSocket();

    if (!this.socket.connected) {
      this.socket.connect();
    }

    this.fetchConversations(this.getActiveConversation);
   

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

  getActiveConversation = () => {
    //  console.log(this.state.conversations)

    if(this.state.conversations.length > 0) {
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
    } else {
      const savedActiveConversation = sessionStorage.getItem("activeConversation");
      if (savedActiveConversation) {
        sessionStorage.removeItem("activeConversation");
        console.log(
          "No conversations found, removing active conversation from sessionStorage."
        );
      }
    };
  };

  fetchConversations = (callback = "") => {
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
        }, () => {
         
          if (typeof callback === "function") {
            callback();
          }
        });
        return data;
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

  createNewConversation = (callback = () => {console.log("hello world")}) => {
    const convid = this.generateRandomId();
    // console.log("user message in createNewConversation", UserMessage);
    fetch("http://localhost:3000/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: convid,
        userId: localStorage.getItem("userId"),
        messages: [],
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
            // this.saveMessagesToDb(UserMessage);
            sessionStorage.setItem("activeConversation", data.conversationId);
          }
        );
        // console.log(data)
      })
      .catch((error) => console.error(error));
  };

  // saveMessagesToDb = (messages) => {
  //   console.log("Saving messages to DB:", messages);
  //   const { activeConversation } = this.state;
  //   if (!activeConversation) {
  //     console.error("No active conversation to save messages to.");
  //     return;
  //   }
  //   // console.log("active conversation => ",this.props.activeConversation);
  //   // console.log("messages to save => ", messages, this.props.activeConversation);
  //   fetch("http://localhost:3000/conversations", {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       messages: messages,
  //       conversationId: activeConversation,
  //       userId: localStorage.getItem("userId") || "default",
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log("Messages saved successfully:", data);
  //       this.fetchConversations();
  //     })
  //     .catch((error) => console.error("Error saving messages:", error));
  // };

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
            // chatTitle: data[1]
          },
          () => {
            // console.log("Messages fetched for conversation:", conversationId);
            // console.log("Messages:", this.state.messages);
          }
        );
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  setActiveConversation = (value) => {
    this.setState({
      activeConversation: value,
    });
  };

  

  render() {
    return (
      <div className="container">
        <ErrorBoundary>
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
          saveMessagesToDb={this.saveMessagesToDb}
          setActiveConversation={this.setActiveConversation}
          ChatTitle={this.state.chatTitle}
        />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;

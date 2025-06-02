import React from "react";
import SideBar from "./components/SideBarComponents/SideBar.jsx";
import ChatWindow from "./components/ChatComponents/ChatWindow.jsx";
import "./css/App.css";
import getSocket from "./js/socket.js";


class App extends React.Component {
    constructor(){
        super();
        this.socket = null;
        this.state = {
            conversations: [],
            activeConversation: null,
        }
    }
    componentDidMount = () => {
        this.socket = getSocket();

        if (!this.socket.connected) {
        this.socket.connect();
        }
    }
    componentWillUnmount = () => {
        this.socket.off();
        // this.socket.off("botMessage");
    };

    createNewConversation = () => {
        // Create a new chat by sending a POST request to the server
        fetch(`http://localhost:3000/conversations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: localStorage.getItem("userId") || "default",
                conversationId: Math.random().toString(36).substring(2, 15),
                title: "New Chat",
                chatHistory: [],
                Timestamp: new Date().toISOString(),
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log("New conversation created:", data);
            this.socket.emit("newConversation", data);
            this.setState((prevState) => ({
                conversations: [data, ...prevState.conversations],
                activeConversation: data.conversationId
            }), () => {
                console.log(this.state.activeConversation);
                console.log("Active conversation set to:", data.conversationId);
            });
            

        })
        .catch((error) => {
            console.error("Error creating new conversation:", error);
        });
    };

    render() {
        return(
            <div className="container">
                <SideBar newConversation={this.createNewConversation} activeConversation={this.state.activeConversation} />
                <ChatWindow newConversation={this.createNewConversation} conversations={this.state.conversations} activeConversation={this.state.activeConversation} />
            </div>
        )
    }
}


export default App;
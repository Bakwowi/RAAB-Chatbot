import React from "react";
import "../../css/ChatWindowStyles/ChatHeader.css";
import ShareSvg from "../../assets/svgs/ShareIcon.svg";
import MenuSvg from "../../assets/svgs/MenuIcon.svg";
import DeleteIcon from "../../assets/svgs/DeleteIcon.svg";


class ChatHeader extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount = () => {
        document.addEventListener("mousedown", (e) => {
            const menu = document.getElementById("menu");
            const menuBtn = document.getElementById("menu-btn");
            // Close menu if click is outside menu and menu button
            if (
                menu &&
                menu.style.display === "block" &&
                !menu.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {
                menu.style.display = "none";
            }
        });
    };

    toggleMenu = () => {
        const menu = document.getElementById("menu");
        if (menu.style.display === "block") {
            menu.style.display = "none";
        } else {
            menu.style.display = "block";
        }
    };

    deleteChat = () => {
        const confirmation = window.confirm("Are you sure you want to delete this chat?");
        if (confirmation) {
            // Call the delete chat function passed from props
            this.props.deleteChat();
        }
    };

    shareChat = () => {
        // prompt the user to download as a text file or a json file
        const messages = this.props.messages;
        const chatTitle = this.props.chatTitle || "New Chat";
        // Show a simple prompt with two buttons for user to choose format
        const format = window.prompt("Download chat as 'text' or 'json'? Type your choice:");
        const userResponse = format && format.trim().toLowerCase();
        if (userResponse === "text") {
            const fileContent = messages.map(msg => `${msg.role}: ${msg.content}`).join("\n");
            const blob = new Blob([fileContent], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${chatTitle}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        else if (userResponse === "json") {
            const blob = new Blob([JSON.stringify(messages, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${chatTitle}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            window.alert("Invalid input. Please type 'text' or 'json'.");
        }
    }

    render() {
        return (
            <div className="chat-header">
            <div className="chat-title">{this.props.chatTitle}</div>
            <div className="menu">
                <button id="menu-btn" title="Menu" onClick={this.toggleMenu}>
                <img src={MenuSvg} alt="Menu" />
                </button>
                <div id="menu">
                <button id="share-btn" title="Share chat" onClick={this.shareChat}>
                    <img src={ShareSvg} alt="Share" />
                    Share Chat
                </button>
                <button id="delete-btn" title="Delete chat" onClick={this.deleteChat}>
                    <img src={DeleteIcon} alt="Delete" />
                    Delete Chat
                </button>
                </div>
            </div>
            </div>
        );
    };
};

export default ChatHeader;
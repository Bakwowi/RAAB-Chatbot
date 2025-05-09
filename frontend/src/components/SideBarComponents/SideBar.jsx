import React from "react";
import ChatsHistory from "./ChatsHistory.jsx"
import "../../css/SideBar.css";



class SideBar extends React.Component {
    render() {
        return (
            <div className="side-bar">
                <div className="side-bar-header">
                    <div className="logo">Logo goes here</div>
                    <div className="close-side-bar-btn"></div>
                </div>
                <div className="new-chat">
                    <button id="new-chat-btn">
                        <span>icon </span>
                        New chat
                    </button>
                </div>
                <div className="conversation-history">
                    <div className="label">Chats</div>
                    <ChatsHistory />
                </div>
                <div className="settings">
                    <button id="settings-btn">
                        <span>icon </span> Settings
                    </button>
                </div>
            </div>
        );
    };
};


export default SideBar;
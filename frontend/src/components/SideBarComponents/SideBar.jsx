import React from "react";
import Chats from "./Chats.jsx";
import "../../css/SideBarStyles/SideBar.css";



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
                <div className="label">Chats</div>
                <div className="conversation-history">
                        <Chats />
                        <Chats />
                        <Chats />
                        <Chats />
                        <Chats />
                        <Chats />
                        <Chats />
                        <Chats />
                        
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
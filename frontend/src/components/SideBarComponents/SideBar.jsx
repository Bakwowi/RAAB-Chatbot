import React from "react";
import Chats from "./Chats.jsx";
import "../../css/SideBarStyles/SideBar.css";
import SideBarSvg from "../../assets/svgs/sideBarIcon.svg";
import NewChatSvg from "../../assets/svgs/NewChatIcon.svg";
import SettingsSvg from "../../assets/svgs/SettingsIcon.svg";



class SideBar extends React.Component {
    render() {
        return (
            <nav className="side-bar">
                <div className="side-bar-header">
                    <div className="sub-side-bar-header">
                        <div className="logo">RAAB</div>
                        <button id="close-side-bar-btn">
                            <img src={SideBarSvg} id="side-bar-svg" />
                        </button>
                    </div>
                </div>
                <div className="new-chat">
                    <button id="new-chat-btn">
                        <img src={NewChatSvg} id="new-chat-svg" />
                        New chat
                    </button>
                </div>
                <div className="label">Chats</div>
                <div className="conversation-history">
                    <Chats classActive="active" />
                    <Chats />
                    <Chats />
                    <Chats />
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
                        <img src={SettingsSvg} id="settings-svg"/> Settings
                    </button>
                </div>
            </nav>
        );
    };
};


export default SideBar;
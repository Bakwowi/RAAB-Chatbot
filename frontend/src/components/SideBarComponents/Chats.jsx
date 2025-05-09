import React from "react";
import "../../css/SideBarStyles/Chats.css";


class ChatsHistory extends React.Component {
    render() {
        return (
                <div className="chat active">
                    <div className="chat-title-time">
                        <div className="chat-title">
                            The chat title goes here
                        </div>
                        <div className="time">
                            the time of chat goes here
                        </div>
                    </div>
                    <div className="chat-description">
                        a small chat description goes here
                    </div>

                </div>
        );
    };
};


export default ChatsHistory;
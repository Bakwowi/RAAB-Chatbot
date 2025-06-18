import React from "react";
import "../../css/SideBarStyles/Chats.css";


class ChatsHistory extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props.classActive);
    };

    handleChatClick = () => {
        // console.log("Chat clicked:", this.props.conversationId);
        // console.log("Active conversation before click:", this.props.activeConversation);
        // this.props.setActiveConversation(this.props.conversationId);
        // console.log("Active conversation after click:", this.props.activeConversation);
        this.props.fetchMessages(this.props.conversationId);
    }

    render() {
        return (
                <button id="chat" className={this.props.classActive} title="Open this chat" onClick={this.handleChatClick}>
                    <div className="chat-title-time">
                        <div className="chat-title">
                            {this.props.chatTitle}
                        </div>
                        <div className="chat-time">
                            {this.props.chatTime}
                        </div>
                    </div>
                    <div className="chat-description">
                            {this.props.chatDescription}
                    </div>

                </button>
        );
    };
};


export default ChatsHistory;
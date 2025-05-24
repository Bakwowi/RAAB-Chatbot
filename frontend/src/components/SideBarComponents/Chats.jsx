import React from "react";
import "../../css/SideBarStyles/Chats.css";


class ChatsHistory extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props.classActive);
    };

    render() {
        return (
                <button id="chat" className={this.props.classActive} title="Open this chat">
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
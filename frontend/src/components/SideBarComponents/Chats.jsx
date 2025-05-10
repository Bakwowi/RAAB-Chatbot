import React from "react";
import "../../css/SideBarStyles/Chats.css";


class ChatsHistory extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props.classActive);
    };

    render() {
        return (
                <button id="chat" className={this.props.classActive}>
                    <div className="chat-title-time">
                        <div className="chat-title">
                            The chat title goes here
                        </div>
                        <div className="chat-time">
                            2025-05-10
                        </div>
                    </div>
                    <div className="chat-description">
                        a small chat description goes here
                    </div>

                </button>
        );
    };
};


export default ChatsHistory;
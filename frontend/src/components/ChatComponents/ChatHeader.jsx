import React from "react";
import "../../css/ChatWindowStyles/ChatHeader.css";
import ShareSvg from "../../assets/svgs/ShareIcon.svg";


class ChatHeader extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="chat-header">
                <div className="chat-title">{this.props.chatTitle}</div>
                <div className="share">
                    <button id="share-btn">
                        <img src={ShareSvg} />
                        Share
                    </button>
                </div>
            </div>
        );
    };
};

export default ChatHeader;
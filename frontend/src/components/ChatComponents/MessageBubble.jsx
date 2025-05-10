import React from "react";
import "../../css/ChatWindowStyles/MessageBubble.css";


class MessageBubble extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        return(
            <div className="message-bubble-wrapper" id={this.props.id}>
                <span className="message-bubble-tail"></span>
                <div className="message-bubble">{this.props.message}</div>
            </div>
        );
    };
};

export default MessageBubble;
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import remarkGfm from 'remark-gfm';

import "../../css/ChatWindowStyles/MessageBubble.css";

class MessageBubble extends React.Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
      <div className= {`${this.props.id} message-bubble-wrapper`}>
        <span className="message-bubble-tail"></span>
        <div className="message-bubble">
          <div>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeSanitize]}>
              {this.props.message}
            </ReactMarkdown>
          </div>
            {this.props.className === "typing-loader" && <span className={`${this.props.className}`}>
                {/* <div></div>
                <div></div>
                <div></div> */}

                <div className="dot-wave__dot"></div>
                <div className="dot-wave__dot"></div>
                <div className="dot-wave__dot"></div>
                {/* <div class="dot-wave__dot"></div> */}
            </span>}
        </div>
      </div>
    );
  }
}

export default MessageBubble;

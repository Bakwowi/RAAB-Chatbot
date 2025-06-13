import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import remarkGfm from 'remark-gfm';
import CopySvg from "../../assets/svgs/CopyIcon.svg";

import "../../css/ChatWindowStyles/MessageBubble.css";

class MessageBubble extends React.Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
      <div className="message-bubble-container">
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
      <div className={`copy-div ${this.props.id === "user" ? "user-copy" : "bot-copy"}`}>
          <button
            id="copy"
            onClick={() => {
              // if (navigator && navigator.clipboard) {
              //   navigator.clipboard.writeText(this.props.message);
              // }
              const p = document.querySelector(".message-bubble div");
              // console.log(this.props.message);
            }}
            title="Copy message"
          >
            <img src={CopySvg} alt="Copy" />
          </button>
        </div>
      </div>
    );
  }
}

export default MessageBubble;

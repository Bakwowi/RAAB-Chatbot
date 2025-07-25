import React from "react";
import "../../css/SideBarStyles/Chats.css";

class ChatsHistory extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props.classActive);
  }

  handleChatClick = () => {
    // console.log("Chat clicked:", this.props.conversationId);
    // console.log("Active conversation before click:", this.props.activeConversation);
    // this.props.setActiveConversation(this.props.conversationId);
    // console.log("Active conversation after click:", this.props.activeConversation);
    this.props.fetchMessages(this.props.conversationId);
    sessionStorage.setItem("activeConversation", this.props.conversationId);
  };


  render() {
    return (
      <button
        id="chat"
        className={this.props.classActive}
        title="Open this chat"
        onClick={this.handleChatClick}
      >
          <div className="button-mock" onClick={this.handleMenuClick}>
            <svg
              viewBox="0 0 24 24"
              width={20}
              height={20}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="var(--svg-color)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                  fill="var(--svg-color)"
                ></path>{" "}
              </g>
            </svg>
        </div>

        <div className="chat-title-time">
          <div className="chat-title">{this.props.title}</div>
          <div className="chat-time">{this.props.chatTime}</div>
        </div>
        <div className="chat-description">{this.props.chatDescription}</div>
      </button>
    );
  }
}

export default ChatsHistory;

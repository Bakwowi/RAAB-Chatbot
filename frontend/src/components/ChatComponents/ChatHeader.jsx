import React from "react";
import "../../css/ChatWindowStyles/ChatHeader.css";
// import ShareSvg from "../../assets/svgs/ShareIcon.svg";
// import MenuSvg from "../../assets/svgs/MenuIcon.svg";
import DeleteIcon from "../../assets/svgs/DeleteIcon.svg";

class ChatHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }

  handleOutsideClick = (e) => {
    const menu = document.getElementById("menu");
    const menuBtn = document.getElementById("menu-btn");
    // Close menu if click is outside menu and menu button
    if (
      menu &&
      menu.style.display === "block" &&
      !menu.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      menu.style.display = "none";
    }
  };

  toggleMenu = () => {
    const menu = document.getElementById("menu");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  };

  deleteChat = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this chat?"
    );
    if (confirmation) {
      // Call the delete chat function passed from props
      this.props.deleteChat();
    }
  };

  shareChat = () => {
    // prompt the user to download as a text file or a json file
    const messages = this.props.messages;
    const chatTitle = this.props.chatTitle || "New Chat";
    // Show a simple prompt with two buttons for user to choose format
    const format = window.prompt(
      "Download chat as 'text' or 'json'? Type your choice:"
    );
    const userResponse = format && format.trim().toLowerCase();
    if (userResponse === "text") {
      const fileContent = messages
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");
      const blob = new Blob([fileContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${chatTitle}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (userResponse === "json") {
      const blob = new Blob([JSON.stringify(messages, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${chatTitle}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      window.alert("Invalid input. Please type 'text' or 'json'.");
    }
  };

  render() {
    return (
      <div className="chat-header">
        <div className="menu-btn">Menu-btn</div>
        <div className="chat-title">{this.props.chatTitle}</div>
        <div className="menu">
          <button id="menu-btn" title="Menu" onClick={this.toggleMenu}>
            {/* <img src={MenuSvg} alt="Menu" /> */}
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
                  d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5Z"
                  stroke="var(--svg-color)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z"
                  stroke="var(--svg-color)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19Z"
                  stroke="var(--svg-color)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
          <div id="menu">
            <button id="share-btn" title="Share chat" onClick={this.shareChat}>
              {/* <img src={ShareSvg} alt="Share" /> */}
              <svg
                viewBox="0 0 24 24"
                width={20}
                height={20}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
                    d="M20 13V17.5C20 20.5577 16 20.5 12 20.5C8 20.5 4 20.5577 4 17.5V13M12 3L12 15M12 3L16 7M12 3L8 7"
                    stroke="var(--svg-color)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              Share Chat
            </button>
            <button
              id="delete-btn"
              title="Delete chat"
              onClick={this.deleteChat}
            >
              <img src={DeleteIcon} alt="Delete" />
              Delete Chat
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatHeader;

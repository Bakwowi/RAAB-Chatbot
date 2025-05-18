import React from "react";
import "../../css/ChatWindowStyles/ChatWindow.css";
import MessageBubble from "./MessageBubble";
import ArrowDownSvg from "../../assets/svgs/ArrowDownIcon.svg";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import getSocket from "../../socket.js";

class ChatWindow extends React.Component {
  constructor() {
    super();
    this.socket = getSocket();
    this.state = {
      messages: [],
    };
    // this.isBotTyping = false;
  }

  componentDidMount = () => {

    this.socket.on("message", (response) => {
      console.log(response);
    });

    this.socket.on("botMessage", (response) => {
      console.log(response);
      // console.log(this.state.messages)
      if (response !== "Sorry, something went wrong.") {
        this.setState((previousState) => {
          // console.log(previousState)
          const updated = [...previousState.messages];
          if (
            updated.length &&
            updated[updated.length - 1].content === "Typing..."
          ) {
            updated.pop();
          }

          return this.animateResponse(response);

          // return { messages: [...updated, response] };
        });
      } else {
        console.log("sorry an error occured in our server");
      }
    });
  };

  componentWillUnmount = () => {
    this.socket.disconnect();
  };

  animateResponse = (response) => {
    const message = response.content;
    const typingSpeed = 50; // Adjust the speed of typing here
    let index = 0;

    const interval = setInterval(() => {
      if (index < message.length) {
        this.setState((previousState) => ({
          messages: [
            ...previousState.messages.slice(0, -1),
            { role: "assistant", content: message.slice(0, index + 1) },
          ],
        }));
        index++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);
  }

  sendMessage = (message) => {
    this.setState((previousState) => ({
      messages: [...previousState.messages, { role: "user", content: message }],
    }));

    this.setState((previousState) => ({
      messages: [
        ...previousState.messages,
        { role: "assistant", content: "Typing..." },
      ],
    }));

    this.socket.emit("client-message", { role: "user", content: message });

    console.log(this.state.messages);
  };

  render() {
    return (
      <div className="chat-window">
        <div className="chat-area">
          <ChatHeader chatTitle="This is were the chat title will appear" />
          <div className="chat-body">
            {this.state.messages
              .filter((msg) => msg.role !== "system")
              .map((msg, index) => (
                <MessageBubble
                  key={index}
                  id={msg.role === "user" ? "user" : "assistant"}
                  message={msg.content === "Typing..." ? "" : msg.content}
                  className={msg.content === "Typing..." ? "typing-loader" : ""}
                />
              ))}
          </div>
          <div className="scroll-to-bottom">
            <button id="scroll-to-bottom-btn">
              <img src={ArrowDownSvg} />
            </button>
          </div>
        </div>
        <MessageInput sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default ChatWindow;

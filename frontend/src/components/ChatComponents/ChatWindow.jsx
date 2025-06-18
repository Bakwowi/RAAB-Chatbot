import React from "react";
import "../../css/ChatWindowStyles/ChatWindow.css";
import MessageBubble from "./MessageBubble";
import ArrowDownSvg from "../../assets/svgs/ArrowDownIcon.svg";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import getSocket from "../../js/socket.js";

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.socket = getSocket();
    this.state = {
      messages: [],
      isNewChat: true,
      isBotTyping: false,
      chatTitle: "Chat Title",
    };
    this.lastUserMessage = ""
    // this.isBotTyping = false;
  }

  componentDidMount = () => {
    this.socket.on("message", (response) => {
      console.log(response);
    });

    this.socket.on("botMessage", (response) => {
      console.log("bot response => ", response);
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
              // if (this.props.activeConversation === null) {
              //   this.props.createNewConversation();
              // } else {
              //   this.saveMessagesToDb(this.lastUserMessage, response);
              // }
          return this.animateResponse(response);
          // return { messages: [...updated, response] };
        });
        // return this.setState({isBotTyping: false});
      } else {
        console.log("sorry an error occured in our server");
      }

      const savedMessages = localStorage.getItem("messages");
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        this.setState((previousState) => ({
          messages: [...previousState.messages, ...parsedMessages],
          isNewChat: false,
        }));
      }

    });

     const savedMessages = localStorage.getItem("messages");
     console.log("saved messages => ", savedMessages);
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      this.setState({
        messages: parsedMessages,
        isNewChat: false,
      });
    };
  };

  componentWillUnmount = () => {
    this.socket.off("botMessage");
    this.socket.disconnect();
    // console.log("Socket disconnected");
    // localStorage.setItem("messages", JSON.stringify({hi: "there too"}));
    // document.addEventListener("beforeunload", () => {
    //   localStorage.setItem("messages", JSON.stringify(this.state.messages));
    //   console.log("Messages saved to localStorage:", this.state.messages);
    // });
  };

  componentDidUpdate = (prevProps) => {
    // console.log("componentDidUpdate called");
    if(prevProps.messages !== this.props.messages) {
      console.log("current props messages", this.props.messages);
      this.setState({
        messages: this.props.messages,
        isNewChat: false,
      });
      if(this.props.activeConversation.trim() !== "") {
        localStorage.setItem("messages", JSON.stringify(this.props.messages));
      };
  };
    
  };

  animateResponse = (response) => {
    const message = response.content;
    const typingSpeed = 2;
    let step = 2;
    let index = 0;

    const interval = setInterval(() => {
      if (index < message.length) {
        this.setState((previousState) => ({
          messages: [
            ...previousState.messages.slice(0, -1),
            { role: "assistant", content: message.slice(0, index + 1) },
          ],
        }));
        index += step;
      } else {
        clearInterval(interval);
        this.setState({ isBotTyping: false }, () => {
          
          this.socket.emit("botMessage", this.state.messages);
          this.saveMessagesToDb(this.state.messages);
          console.log("Final message sent to server:", this.state.messages);
        });
      }
    }, typingSpeed);
  };
    
  sendMessage = async (message) => {
    localStorage.setItem("messages", JSON.stringify(this.state.messages));
    this.setState({ isBotTyping: true, isNewChat: false });
    // console.log(this.state.isBotTyping);
    this.setState((previousState) => ({
      messages: [...previousState.messages, { role: "user", content: message }],
    }), () => {
      this.socket.emit("clientMessage",  this.state.messages);
      // this.saveMessagesToDb(this.state.messages);
      // console.log("Message sent to server:", message);
    });

    this.setState((previousState) => ({
      messages: [
        ...previousState.messages,
        { role: "assistant", content: "Typing..." },
      ],
    }));

    // this.lastUserMessage = message;
    // console.log("last user message => ", this.lastUserMessage);
    // this.socket.emit("client-message", {role: "user", content: message});

  console.log("Sending message:", message);
   
  };

  saveMessagesToDb = (messages) => {
    const { activeConversation } = this.props;
    if (!activeConversation) {
      console.error("No active conversation to save messages to.");
      return;
    }
    // console.log("active conversation => ",this.props.activeConversation);
    // console.log("messages to save => ", messages, this.props.activeConversation);
    fetch(`http://localhost:3000/conversations`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: messages,
        conversationId: activeConversation,
        userId: localStorage.getItem("userId") || "default",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Messages saved successfully:", data);
        this.props.fetchConversations();
      })
      .catch((error) => console.error("Error saving messages:", error));
  };

  render() {
    // Example: Only render chat window if there are messages or isNewChat is false
    if (this.state.isNewChat && this.state.messages.length === 0) {
      return (
        <div className="chat-window">
          <div className="chat-area">
            <p className="chat-intro-title">
              Lost in the woods? I've got answers! 😎
            </p>
          </div>
          <MessageInput
            sendMessage={this.sendMessage}
            isBotTyping={this.state.isBotTyping}
          />
        </div>
      );
    }

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
        <MessageInput
          sendMessage={this.sendMessage}
          isBotTyping={this.state.isBotTyping}
        />
      </div>
    );
  }
}

export default ChatWindow;

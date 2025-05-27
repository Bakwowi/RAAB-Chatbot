import React from "react";
import "../../css/ChatWindowStyles/MessageInput.css";
import AddFileSvg from "../../assets/svgs/AddFileIcon.svg";
// import MicSvg from "../../assets/svgs/MicIcon.svg";
import SendSvg from "../../assets/svgs/SendIcon.svg";
import StopSVG from "../../assets/svgs/stop.svg";

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInputEmpty: true,
    };
  }
  //   componentDidMount = () => {
  //     console.log(this.props.isBotTyping);
  //     if (this.props.isBotTyping === false) {
  //       this.setState({ isInputEmpty: true });
  //   };
  // }

  componentDidUpdate = (previousProps) => {
    // console.log(previousProps)
    if (previousProps.isBotTyping && this.props.isBotTyping === false) {
      const sendButton = document.querySelector("#send-btn");
      sendButton.classList.remove("active");
      sendButton.disabled = true;
    }

  };

  handleButtonSubmit = (e) => {
    e.preventDefault();
    if (!this.props.isBotTyping) {
      const inputField = document.querySelector("#input-field");
      // const sendButtonSvg = document.querySelector("#send-btn img");
      // console.log(inputField.value.trim());

      if (inputField.value.trim() == "") {
        console.log("can't submit an empty input field");
        return;
      } else {
        this.props.sendMessage(inputField.value.trim());
        // console.log("sending message", inputField.value.trim());
        inputField.value = "";
      }
    } else {
      console.log("stopping bot");
    }
  };

  handleInputChange = (e) => {
    const inputField = e.target;
    const sendButton = document.querySelector("#send-btn");

    // console.log(inputField.value.trim());

    if (inputField.value.trim() === "") {
      if (!this.props.isBotTyping) {
        this.setState({ isInputEmpty: true });
        sendButton.classList.remove("active");
      }
    } else {
      this.setState({ isInputEmpty: false });
      sendButton.classList.add("active");
      sendButton.disabled = false;
    }
  };

  render() {
    return (
      <div className="message-input">
        <div className="input-field-container">
          <textarea
            name="input-field"
            id="input-field"
            rows={1}
            placeholder="Ask anything"
            onChange={this.handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                this.handleButtonSubmit(e);
              }
            }}
          ></textarea>
          <button id="add-file-btn" title="Add file">
            <img src={AddFileSvg} />
          </button>
        </div>
        <button
          className=""
          id="send-btn"
          onClick={this.handleButtonSubmit}
          title="Send message"
          disabled={this.state.isInputEmpty && !this.props.isBotTyping}
        >
          <img src={this.props.isBotTyping == true ? StopSVG : SendSvg} />
        </button>
      </div>
    );
  }
}

export default MessageInput;

import React from "react";
import "../../css/ChatWindowStyles/MessageInput.css";
import AddFileSvg from "../../assets/svgs/AddFileIcon.svg";
import MicSvg from "../../assets/svgs/MicIcon.svg";
import SendSvg from "../../assets/svgs/SendIcon.svg";
import StopSVG from "../../assets/svgs/stop.svg";

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
  }
  // componentDidMount = () => {
  //       console.log(this.props.isBotTyping);
  // };

  handleButtonSubmit = () => {
    const inputField = document.querySelector("#input-field");
    const sendButtonSvg = document.querySelector("#send-btn img");

    if (inputField.value.trim() == "") {
      console.log("can't submit an empty input field");
      return;
    } else {
      this.props.sendMessage(inputField.value);
      inputField.value = "";
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
        ></textarea>
        <button id="add-file-btn" title="Add file">
          <img src={AddFileSvg} />
        </button>
        </div>
        <button
          id="send-btn"
          onClick={this.handleButtonSubmit}
          title="Send message"
          disabled={this.props.isBotTyping}
        >
          <img src={this.props.isBotTyping == true ? StopSVG : SendSvg} />
        </button>
      </div>
    );
  }
}

export default MessageInput;

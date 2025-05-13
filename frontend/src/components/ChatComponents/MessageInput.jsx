import React from "react";
import "../../css/ChatWindowStyles/MessageInput.css";
import AddFileSvg from "../../assets/svgs/AddFileIcon.svg";
import MicSvg from "../../assets/svgs/MicIcon.svg";
import SendSvg from "../../assets/svgs/SendIcon.svg";



class MessageInput extends React.Component {
    constructor(props){
        super(props);
    }

    handleButtonSubmit = () => {
        const inputField = document.querySelector("#input-field")
        this.props.handleInput(inputField.value);
    }

    render() {
        return (
            <div className="message-input">
                <div className="input">
                    <textarea 
                        name="input-field" 
                        id="input-field" 
                        rows={1} 
                        placeholder="Ask anything">
                    </textarea>
                </div>
                <div className="input-options">
                    <div className="left-options">
                        <div className="add-file">
                            <button id="add-file-btn">
                                <img src={AddFileSvg} />
                            </button>
                        </div>
                        <div className="use-mic">
                            <button id="use-mic-btn">
                                <img src={MicSvg} />
                            </button>
                        </div>
                    </div>
                    <div className="send-message">
                        <button id="send-btn" onClick={this.handleButtonSubmit}>
                            <img src={SendSvg} />
                        </button>
                    </div>
                </div>
            </div>
        );
    };
};

export default MessageInput;
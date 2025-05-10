import React from "react";
import "../../css/ChatWindowStyles/MessageInput.css";
import AddFileSvg from "../../assets/svgs/AddFileIcon.svg";
import MicSvg from "../../assets/svgs/MicIcon.svg";
import SendSvg from "../../assets/svgs/SendIcon.svg";



class MessageInput extends React.Component {

    HandleInputChange = (e) => {
        // const textarea = document.getElementById('input-field');
        // const inputWrapper = document.querySelector('.input');

        // const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight); // ~1.2rem
        // const maxRows = 5;

        // textarea.rows = 1; // Reset to get correct scrollHeight
        // const currentRows = Math.min(Math.floor(textarea.scrollHeight / lineHeight), maxRows);
        // textarea.rows = currentRows;

        // // Move the wrapper up by the amount it grew
        // const offset = (currentRows - 1) * lineHeight;
        // inputWrapper.style.marginBottom = `-${offset}px`;
        console.log(e.target.rows);
    }

    render() {
        return (
            <div className="message-input">
                <div className="input">
                    <textarea 
                        name="input-field" 
                        id="input-field" 
                        rows={1} 
                        placeholder="Ask anything"
                        onChange={this.HandleInputChange}>
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
                        <button id="send-btn">
                            <img src={SendSvg} />
                        </button>
                    </div>
                </div>
            </div>
        );
    };
};

export default MessageInput;
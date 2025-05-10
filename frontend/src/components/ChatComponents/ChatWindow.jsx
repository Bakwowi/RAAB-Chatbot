import React from "react";
import "../../css/ChatWindowStyles/ChatWindow.css";
import MessageBubble from "./MessageBubble";
import ArrowDownSvg from "../../assets/svgs/ArrowDownIcon.svg";


class ChatWindow extends React.Component {
    render() {
        return (
            <div className="chat-window">
                <div className="chat-area">
                    <div className="chat-header">
                        <div className="chat-title">The current chat title appears here</div>
                        <div className="share">
                            <button id="share-btn">
                                svg Share
                            </button>
                        </div>
                    </div>
                    <div className="chat-body">
                        <MessageBubble
                            id="user-message"
                            message="Hi RAAB" />
                        <MessageBubble
                            id="chatbot-message"
                            message="Hey 👋! How can I help you today?" />
                        <MessageBubble
                            id="user-message"
                            message="Do you know about hiking?" />
                        <MessageBubble
                            id="chatbot-message"
                            message="Hiking! Yeah, What about hiking are you interested in? Trails, gear, safety tips, or something else?" />
                        <MessageBubble
                            id="user-message"
                            message="Safety tips" />
                        <MessageBubble
                            id="chatbot-message"
                            message="Here are some essential hiking safety tips:
                                    1. Plan ahead: Research the trail, check the weather, and let someone know your itinerary.
                                    2. Bring essentials: Pack water, snacks, a map, compass, first aid kit, and extra layers.
                                    3. Stay on track: Follow trail markers and use your map to avoid getting lost.
                                    4. Be prepared for emergencies: Know basic first aid and have a plan for unexpected situations.
                                    5. Respect nature: Follow Leave No Trace principles and be mindful of wildlife.

                                    Some other tips to consider:

                                    - Hike with a buddy when possible.
                                    - Keep your phone charged and consider a portable charger.
                                    - Be aware of potential hazards like wildlife, steep drop-offs, and inclement weather.

                                    Do you have a specific hiking trip planned or any particular concerns?" />
                        <MessageBubble
                            id="user-message"
                            message="Yes" />
                        <MessageBubble
                            id="chatbot-message"
                            message="RAAB is typing..." />
                    </div>
                    <div className="scroll-to-bottom">
                        <button id="scroll-to-bottom-btn">
                            <img src={ArrowDownSvg} />
                        </button>
                    </div>
                </div>
                <div className="message-input">
                    <div className="input">
                        <textarea name="input-field" id="input-field" rows={1} placeholder="Ask anything"></textarea>
                    </div>
                    <div className="input-options">
                        <div className="left-options">
                        <div className="add-file">
                            <button id="add-file-btn">
                                svg add
                            </button>
                        </div>
                        <div className="use-mic">
                            <button id="use-mic-btn">
                                svg mic
                            </button>
                        </div>
                        </div>
                        <div className="send-message">
                            <button id="send-btn">
                                svg send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}


export default ChatWindow;
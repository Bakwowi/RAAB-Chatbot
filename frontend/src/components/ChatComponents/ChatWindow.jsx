import React from "react";
import "../../css/ChatWindowStyles/ChatWindow.css";
import MessageBubble from "./MessageBubble";
import ArrowDownSvg from "../../assets/svgs/ArrowDownIcon.svg";
import AddFileSvg from "../../assets/svgs/AddFileIcon.svg";
import MicSvg from "../../assets/svgs/MicIcon.svg";
import SendSvg from "../../assets/svgs/SendIcon.svg";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";


class ChatWindow extends React.Component {



    render() {
        return (
            <div className="chat-window">
                <div className="chat-area">
                    <ChatHeader chatTitle="This is were the chat title will appear"/>
                    <div className="chat-body">
                        <MessageBubble
                            id="user-message"
                            message="Hi RAAB" />
                        {/* <MessageBubble
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
                            message="RAAB is typing..." /> */}
                    </div>
                    <div className="scroll-to-bottom">
                        <button id="scroll-to-bottom-btn">
                            <img src={ArrowDownSvg} />
                        </button>
                    </div>
                </div>
                <MessageInput />
            </div>
        );
    };
}


export default ChatWindow;
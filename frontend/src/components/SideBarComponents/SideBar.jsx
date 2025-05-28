import React from "react";
import Chats from "./Chats.jsx";
import "../../css/SideBarStyles/SideBar.css";
// import SideBarSvg from "../../assets/svgs/sideBarIcon.svg";
import NewChatSvg from "../../assets/svgs/NewChatIcon.svg";
import SettingsSvg from "../../assets/svgs/SettingsIcon.svg";
import logo from "../../assets/images/RAAB-logo.png";



class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conversations: [],
            activeConversation: null,
            loading: true
        };
    };
    componentDidMount = () => {
        fetch("http://localhost:3000/conversations", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ 
                    conversations: data,
                    loading: false
                });
                // console.log("Conversations fetched successfully:", data);
            })
            .catch((error) => {
                console.error("Error fetching conversations:", error);
                this.setState({ loading: false });
        });
        // console.log(response);
    };

    render() {
        // if (this.state.loading === true) {
        //     return (
        //         ""
        //     );
        // };

        const sortedConversations = this.state.conversations
            .sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp))
            .map((conversation) => {
                // Format the timestamp to "YYYY-MM-DD"
                const formattedDate = conversation.Timestamp
                    ? new Date(conversation.Timestamp).toISOString().slice(0, 10)
                    : "";

                return (
                    <Chats 
                        key={conversation._id}
                        classActive={this.state.activeConversation === conversation._id ? "active" : ""}
                        chatTitle={conversation.title.slice(0, 25) + "..."}
                        chatTime={formattedDate}
                        chatDescription={conversation.chatHistory[1].content.slice(0, 20) + "..."}
                    />
                );
            });
        return (
            <nav className="side-bar">
                <div className="side-bar-header">
                    <div className="sub-side-bar-header">
                        <div className="logo">
                            <img src={logo} alt="RAAB" />
                        </div>
                        <button id="new-chat-btn" title="New chat">
                            <img src={NewChatSvg} id="new-chat-svg" />
                        </button>
                    </div>
                </div>
                <div className="search-chat">
                    <input type="search" name="search-chat-input" id="search-chat-input" placeholder="Search chats"/>
                </div>
                <div className="label">Chats</div>
                <div className="conversation-history">

                    {this.state.loading === false ? (this.state.conversations.length > 0 ? (
                        sortedConversations
                    ) : (
                        <div className="no-conversations">
                            No conversations yet.
                        </div>
                    )) : (
                        <div className="loading">
                            <div className="loader">
                                <div className="spin1"></div>
                                <div className="spin2"></div>
                                <div className="spin3"></div>
                            </div>
                            <div className="text">
                                <p>loading conversations</p>
                            </div>
                        </div>
                    )}

                    {/* <Chats 
                        classActive="active" 
                        chatTitle="this is a chat title and when it is long, it gets sliced"
                        chatTime="2025-05-23"
                        chatDescription="This is the chat description"/> */}
                    {/* <Chats 
                        classActive="active" 
                        chatTitle={`${"this is a chat title and when it is long, it gets sliced".slice(0, 28) + "..."}`}
                        chatTime="2025-05-23"
                        chatDescription="This is the chat description"/>
                    <Chats 
                        classActive="" 
                        chatTitle={`${"this is a chat title and when it is long, it gets sliced".slice(0, 28) + "..."}`}
                        chatTime="2025-05-23"
                        chatDescription="This is the chat description"/>
                    <Chats 
                        classActive="" 
                        chatTitle={`${"this is a chat title and when it is long, it gets sliced".slice(0, 28) + "..."}`}
                        chatTime="2025-05-23"
                        chatDescription="This is the chat description"/>
                    <Chats 
                        classActive="" 
                        chatTitle={`${"this is a chat title and when it is long, it gets sliced".slice(0, 28) + "..."}`}
                        chatTime="2025-05-23"
                        chatDescription="This is the chat description"/>
                    <Chats 
                        classActive="" 
                        chatTitle={`${"this is a chat title and when it is long, it gets sliced".slice(0, 28) + "..."}`}
                        chatTime="2025-05-23"
                        chatDescription="This is the chat description"/>
                    <Chats 
                        classActive="" 
                        chatTitle={`${"this is a chat title and when it is long, it gets sliced".slice(0, 28) + "..."}`}
                        chatTime="2025-05-23"
                        chatDescription="This is the chat description"/>
                    <Chats 
                        classActive="" 
                        chatTitle={`${"this is a chat title and when it is long, it gets sliced".slice(0, 28) + "..."}`}
                        chatTime="2025-05-23"
                        chatDescription="This is the chat description"/>
                    <Chats 
                        classActive="" 
                        chatTitle={`${"this is a chat title and when it is long, it gets sliced".slice(0, 28) + "..."}`}
                        chatTime="2025-05-23"
                        chatDescription="This is the chat description"/>
                    <Chats 
                        classActive="" 
                        chatTitle={`${"this is a chat title and when it is long, it gets sliced".slice(0, 28) + "..."}`}
                        chatTime="2025-05-23"
                        chatDescription="This is the chat description"/>
                    <Chats 
                        classActive="" 
                        chatTitle={`${"this is a chat title and when it is long, it gets sliced".slice(0, 28) + "..."}`}
                        chatTime="2025-05-23"
                        chatDescription="This is the chat description"/>
                    <Chats 
                        classActive="" 
                        chatTitle={`${"this is a chat title and when it is long, it gets sliced".slice(0, 28) + "..."}`}
                        chatTime="2025-05-23"
                        chatDescription="This is the chat description"/>
                    <Chats 
                        classActive="" 
                        chatTitle={`${"this is a chat title and when it is long, it gets sliced".slice(0, 28) + "..."}`}
                        chatTime="2025-05-23"
                        chatDescription="This is the chat description"/>
                    <Chats 
                        classActive="" 
                        chatTitle={`${"this is a chat title and when it is long, it gets sliced".slice(0, 28) + "..."}`}
                        chatTime="2025-05-23"
                        chatDescription="This is the chat description"/> */}
                       
                     {/* <Chats />
                    <Chats />
                    <Chats />
                    <Chats />
                    <Chats />
                    <Chats />
                    <Chats />
                    <Chats />
                    <Chats />
                    <Chats />
                    <Chats />  */}

                </div>
                <div className="settings">
                    <button id="settings-btn" title="Settings">
                        <img src={SettingsSvg} id="settings-svg"/> Settings
                    </button>
                </div>
            </nav>
        );
    };
};


export default SideBar;
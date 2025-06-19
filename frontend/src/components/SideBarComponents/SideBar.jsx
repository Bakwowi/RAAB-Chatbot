import React from "react";
import Chats from "./Chats.jsx";
import "../../css/SideBarStyles/SideBar.css";
// import SideBarSvg from "../../assets/svgs/sideBarIcon.svg";
import NewChatSvg from "../../assets/svgs/NewChatIcon.svg";
import SettingsSvg from "../../assets/svgs/SettingsIcon.svg";
import logo from "../../assets/images/RAAB-logo.png";
import backSvg from "../../assets/svgs/BackIcon.svg";
import DropdownSvg from "../../assets/svgs/DropdownIcon.svg";
import TickSvg from "../../assets/svgs/TickIcon.svg";
import setTheme from "../../js/settings.js";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      activeConversation: null,
      loading: true,
    };
    this.userId = localStorage.getItem("userId")
  };
  // componentDidMount = () => {
  //  this.fetchConversations();
  // };

  // newConversation = () => {
  //   this.props.newConversation();
  //   // this.props.fetchConversations();
  // }

  componentDidMount = () => {
  
    this.handleDocumentClick = (e) => {
      const selectThemeBtn = document.querySelector(".select-theme-btn");
      const themeOptions = document.querySelector(".theme-options");
      if (
        selectThemeBtn &&
        !selectThemeBtn.contains(e.target) && // If the click is not on the select theme button
        themeOptions &&
        !themeOptions.contains(e.target)
      ) {
        if (themeOptions) {
          themeOptions.classList.remove("open");
        }
      }
    };

    this.handleSettingsClick = (e) => {
      const settingsDiv = document.querySelector("#settings");
      const themeOptions = document.querySelector(".theme-options");
      // If the click is on a theme option or inside the theme options, do nothing
      if (themeOptions && themeOptions.contains(e.target)) {
        return;
      }
      if (e.target === settingsDiv) {
        settingsDiv.classList.remove("open");
      }
    };

    document.addEventListener("click", this.handleDocumentClick);
    const settingsDiv = document.querySelector("#settings");
    if (settingsDiv) {
      settingsDiv.addEventListener("click", this.handleSettingsClick);
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener("click", this.handleDocumentClick);
    const settingsDiv = document.querySelector("#settings");
    if (settingsDiv) {
      settingsDiv.removeEventListener("click", this.handleSettingsClick);
    }
  };

  componentDidUpdate = (prevProps) => {
    // Check if the activeConversation prop has changed
    if (prevProps.activeConversation !== this.props.activeConversation) {
      this.setState({
        activeConversation: this.props.activeConversation,
      });
    }
  };

  fetchMessages = (conversationId) => {
    // console.log("Fetching messages for conversation:", conversationId);
    this.props.fetchMessages(conversationId);
  };

  toggleThemeMenu = () => {
    // console.log("Toggling theme options menu");
    const themeOptions = document.querySelector(".theme-options");
    if (!themeOptions) return;
    if (themeOptions.classList.contains("open")) {
      themeOptions.classList.remove("open");
    }
    else {
      themeOptions.classList.add("open");
    }
  };
  setTheme = (e, theme) => {
    if (e) e.preventDefault();
    // Remove "active" class from all theme options
    const themeOptions = document.querySelectorAll(".theme-option");
    themeOptions.forEach(option => option.classList.remove("active"));
    // Add "active" class to the clicked option
    if (e) e.target.classList.add("active");
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  componentDidMount = () => {
    // ...existing code...
    // Set active class for theme option based on localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const themeBtn = document.getElementById(`${savedTheme}-theme`);
      if (themeBtn) {
        themeBtn.classList.add("active");
      }
    }
    // ...rest of your componentDidMount code...
    this.handleDocumentClick = (e) => {
      const selectThemeBtn = document.querySelector(".select-theme-btn");
      const themeOptions = document.querySelector(".theme-options");
      if (
        selectThemeBtn &&
        !selectThemeBtn.contains(e.target) &&
        themeOptions &&
        !themeOptions.contains(e.target)
      ) {
        if (themeOptions) {
          themeOptions.classList.remove("open");
        }
      }
    };

    this.handleSettingsClick = (e) => {
      const settingsDiv = document.querySelector("#settings");
      const themeOptions = document.querySelector(".theme-options");
      if (themeOptions && themeOptions.contains(e.target)) {
        return;
      }
      if (e.target === settingsDiv) {
        settingsDiv.classList.remove("open");
      }
    };

    document.addEventListener("click", this.handleDocumentClick);
    const settingsDiv = document.querySelector("#settings");
    if (settingsDiv) {
      settingsDiv.addEventListener("click", this.handleSettingsClick);
    }
  };



  render() {

    const sortedConversations = this.props.conversations
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .map((conversation) => {
        // Format the timestamp to "YYYY-MM-DD"
        const formattedDate = conversation.updated_at
          ? new Date(conversation.updated_at).toISOString().slice(0, 10)
          : "";

        return (
            // console.log("Conversation:", conversation);
          <Chats
            key={conversation.conversationId}
            fetchMessages={this.fetchMessages}
            conversationId={conversation.conversationId}
            classActive={
              this.props.activeConversation === conversation.conversationId ? "active" : ""
            }
            chatTitle={conversation.title.slice(0, 25) + "..."}
            chatTime={formattedDate}
            chatDescription={
              Array.isArray(conversation.messages) && conversation.messages.length > 1 && conversation.messages[1].content
                ? conversation.messages[1].content.slice(0, 20) + "..."
                : "No messages yet"
            }
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
            <button id="new-chat-btn" title="New chat" 
            onClick={this.props.createNewConversation}>
              <img src={NewChatSvg} id="new-chat-svg" />
            </button>
          </div>
        </div>
        <div className="search-chat">
          <input
            type="search"
            name="search-chat-input"
            id="search-chat-input"
            placeholder="Search chats"
          />
        </div>
        <div className="label">Chats</div>
        <div className="conversation-history">
          {this.props.loading === false ? (
            this.props.conversations.length > 0 ? (
              sortedConversations
            ) : (
              <div className="no-conversations">No conversations yet.</div>
            )
          ) : (
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
        </div>
        <div className="settings">
          <button id="settings-btn" title="Settings" onClick={() => {
            const settingsDiv = document.querySelector("#settings");
            settingsDiv.classList.toggle("open");
          }}>
            <img src={SettingsSvg} id="settings-svg" /> Settings
          </button>
          <div id="settings">
            <div className="settings-container">
            <div className="close">
              <button id="back-btn" title="Back to chats" onClick={() => {
                const settingsDiv = document.querySelector("#settings");
                const themeOptions = document.querySelector(".theme-options");
                settingsDiv.classList.remove("open");
                if (themeOptions) {
                  themeOptions.classList.remove("open");
                }

              }}>
                <img src={backSvg} id="back-svg" />
              </button>
            </div>
            <div className="settings-content">
              <div className="theme">
                <div className="label"><p>Theme</p></div>
                <div className="theme-select">
                  <button id="select-theme-btn" className="select-theme-btn" onClick={this.toggleThemeMenu}>Select <img src={DropdownSvg} /></button>
                  <div className="theme-options">
                    <button className="theme-option" id="light-theme" onClick={(e) => this.setTheme(e, "light")}>Light <img src={TickSvg} /></button>
                    <button className="theme-option" id="dark-theme" onClick={(e) => this.setTheme(e, "dark")}>Dark <img src={TickSvg} /></button>
                    <button className="theme-option" id="system-theme" onClick={(e) => this.setTheme(e, "system")}>System <img src={TickSvg} /></button>
                </div>
                </div>
                <div/>
              </div>
              
          </div>
          </div>
        </div>
        </div>
      </nav>
    );
  }
}

export default SideBar;

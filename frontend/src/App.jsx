import React from "react";
import SideBar from "./components/SideBarComponents/SideBar.jsx";
import ChatWindow from "./components/ChatComponents/ChatWindow.jsx";
import "./css/App.css";


class App extends React.Component {
    render() {
        return(
            <div className="container">
                <SideBar />
                <ChatWindow />
            </div>
        )
    }
}


export default App;
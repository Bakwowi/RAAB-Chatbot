import React from "react";
import SideBar from "./components/SideBarComponents/SideBar.jsx";
import ChatWindow from "./components/ChatComponents/ChatWindow.jsx";
import "./css/App.css";
import getSocket from "./socket";


class App extends React.Component {
    constructor(){
        super();
        this.socket = null;
    }
    componentDidMount = () => {
        this.socket = getSocket();

        if (!this.socket.connected) {
        this.socket.connect();
        }
    }
    componentWillUnmount = () => {
        this.socket.off();
        // this.socket.off("botMessage");
    };

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
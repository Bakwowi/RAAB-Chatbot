import React from "react";
import SideBar from "./components/SideBarComponents/SideBar.jsx";
import ChatWindow from "./components/ChatComponents/ChatWindow.jsx";


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
import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Chat from "./Components/Chat";
import Register from "./Components/Register";
import LogIn from "./Components/LogIn";
import { SessionProvider } from "./Context/SessionContext";
import { SocketProvider } from "./Context/SocketProvider";

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <SessionProvider>
          <NavBar />
          <Route exact path="/">
            <div className="user-selection">
              <LogIn />
              <Register />
            </div>
          </Route>
          <Route exact path="/chat">
            <Chat />
          </Route>
        </SessionProvider>
      </SocketProvider>
    </div>
  );
}

export default App;

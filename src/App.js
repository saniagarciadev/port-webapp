import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Chat from "./Components/Chat";
import Register from "./Components/Register";
// import LogIn from "./Components/LogIn";
import { SessionProvider } from "./Context/SessionContext";
import { SocketProvider } from "./Context/SocketContext";

function App() {
  return (
    <div className="App">
      <SessionProvider>
        <SocketProvider>
          <NavBar />
          <Route exact path="/">
            <Register />
          </Route>
          <Route exact path="/chat">
            <Chat />
          </Route>
        </SocketProvider>
      </SessionProvider>
    </div>
  );
}

export default App;

import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Chat from "./Components/Chat";
import LogIn from "./Components/LogIn";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/">
        <LogIn />
      </Route>
      <Route exact path="/chat">
        <Chat />
      </Route>
    </div>
  );
}

export default App;

import React from "react";
// import { Route } from "react-router-dom";
import "./App.css";
import ContextProviders from "./Context/ContextProviders";
import { useAuth } from "./Context/AuthContext";
import NavBar from "./Components/NavBar";
import Chat from "./Components/Chat";
import LogInScreen from "./Components/LogInScreen";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {user ? (
        <ContextProviders>
          <NavBar />
          <Chat />
        </ContextProviders>
      ) : (
        <LogInScreen />
      )}
    </div>
  );
}

export default App;

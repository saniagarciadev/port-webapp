import React from "react";
import "./App.css";
import ContextProviders from "./Context/ContextProviders";
import { useAuth } from "./Context/AuthContext";
import { useUI } from "./Context/UIContext";
import ChatWindow from "./Components/Chat/ChatWindow";
import LogIn from "./Components/WelcomeScreen/LogIn";
import ConnsMenu from "./Components/Connections/ConnsMenu";
import OptionsMenu from "./Components/OptionsMenu/OptionsMenu";
import Header from "./Components/Chat/Header";

function App() {
  const { user } = useAuth();
  const { appPosition } = useUI();

  return (
    <>
      {user ? (
        <ContextProviders>
          <Header />
          <div className={`app ${appPosition}`}>
            <ConnsMenu />
            <ChatWindow />
            <OptionsMenu />
          </div>
        </ContextProviders>
      ) : (
        <LogIn />
      )}
    </>
  );
}

export default App;

import React, { useState } from "react";
import { useAuth } from "./AuthContext";

const ChatContext = React.createContext();

function ChatProvider({ children }) {
  const { user } = useAuth();
  const [chatLog, setChatLog] = useState(null);
  const [contactsList, setContactsList] = useState(user.connections);
  const [recipient, setRecipient] = useState({
    username: "universe",
    status: "online",
  });
  const [theirLiveText, setTheirLiveText] = useState("");

  const values = {
    chatLog,
    setChatLog,
    contactsList,
    setContactsList,
    recipient,
    setRecipient,
    theirLiveText,
    setTheirLiveText,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
}

const useChat = () => React.useContext(ChatContext);
export { ChatProvider, useChat };

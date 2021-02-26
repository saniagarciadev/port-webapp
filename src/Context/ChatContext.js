import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ChatContext = React.createContext();

function ChatProvider({ children }) {
  const { user } = useAuth();
  const [chatLog, setChatLog] = useState(null);
  const [contactsList, setContactsList] = useState(user.connections);
  const [recipient, setRecipient] = useState(null);
  const [incoming, setIncoming] = useState(null);
  const [liveText, setLiveText] = useState(null);

  useEffect(() => {
    if (incoming && recipient) {
      incoming.senderId === recipient._id
        ? setChatLog((prev) => {
            return [incoming, ...prev];
          })
        : console.log("notification");
      liveText && setLiveText(null);
    } else if (incoming) {
      console.log("notification");
    }
  }, [incoming]);

  const values = {
    chatLog,
    setChatLog,
    contactsList,
    setContactsList,
    recipient,
    setRecipient,
    liveText,
    setLiveText,
    setIncoming,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
}

const useChat = () => React.useContext(ChatContext);
export { ChatProvider, useChat };

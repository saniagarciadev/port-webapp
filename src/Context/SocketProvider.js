import io from "socket.io-client";
import React, { useContext, useState, useEffect } from "react";
import { useSession } from "../Context/SessionContext";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const { user, conversation, setConversation } = useSession();

  useEffect(() => {
    if (user) {
      const newSocket = io("https://port-contact-server.herokuapp.com", {
        query: user,
        withCredentials: true,
      });
      setSocket(newSocket);
    }
  }, [user]);

  socket.on("message", (newMessage) => {
    setConversation((prev) => {
      conversation.messages = [...prev.messages, newMessage];
    });
  });

  const values = {
    socket,
    setSocket,
  };

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
}

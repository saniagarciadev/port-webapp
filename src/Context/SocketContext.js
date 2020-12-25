import { io } from "socket.io-client";
import React, { useContext, useState, useEffect } from "react";
import { useSession } from "./SessionContext";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const { user, setConversation } = useSession();
  useEffect(() => {
    socket &&
      socket.on("message", (msg) => {
        console.log(msg);
        setConversation((prevConversation) => {
          return {
            ...prevConversation,
            messages: [...prevConversation.messages, msg],
          };
        });
      });
  }, [socket]);

  useEffect(() => {
    console.log(
      "User detected by Socket Context. Connecting to socket > localhost:4000"
    );
    if (user) {
      const newSocket = io("http://localhost:4000", {
        // query: user,
        withCredentials: true,
      });
      setSocket(newSocket);
    }
  }, [user]);

  const values = {
    socket,
    setSocket,
  };

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
}

import io from "socket.io-client";
import React, { useContext, useState, useEffect } from "react";
import { useSession } from "../Context/SessionContext";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  // const [socket, setSocket] = useState();

  //   const { user, setUser, conversation, setConversation } = useSession();

  const socket = io("https://port-contact-server.herokuapp.com", {
    withCredentials: true,
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

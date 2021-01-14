import { io } from "socket.io-client";
import React, { useContext, useState, useEffect } from "react";
import { useSession } from "./SessionContext";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  // const [contactNS, setContactNS] = useState(null);
  const {
    user,
    contactsList,
    // conversation,
    setConversation,
    updateOnlineStatus,
    updateLiveStatus,
    // currConversation,
  } = useSession();

  // useEffect(() => {
  //   if (user) {
  //     startSocketConnection(user);
  //   }
  // }, [user]);

  const startSocketConnection = (userObj) => {
    // console.log(`Connecting to socket process.env.REACT_APP_PORT_SERVER`);
    // const generalSocket = ;
    setSocket(
      io(`process.env.REACT_APP_PORT_SERVER/chat`, {
        query: userObj,
        withCredentials: true,
      })
    );
  };

  const isContact = async (userData) => {
    if (contactsList) {
      const found = await contactsList.find(
        (contact) => userData.userId === contact._id
      );
      return found ? true : false;
    } else {
      return false;
    }
  };

  const clientIsRecipient = (userData) => {
    const answer = userData.recipientId === user._id;
    return answer;
  };

  useEffect(() => {
    if (socket && user) {
      socket.on("connect", () => {
        socket.emit("online status", { userId: user._id, isOnline: true });
        console.log(`Send status: ${user.username} is online.`);
      });

      socket.on("user status update", (userData) => {
        const userIsContact = isContact(userData);
        if (userIsContact) {
          updateOnlineStatus(userData);
        }
        socket.emit("user status back", { userId: user._id, isOnline: true });
      });

      socket.on("user status back", (userData) => {
        const userIsContact = isContact(userData);
        if (userIsContact) {
          updateOnlineStatus(userData);
        }
      });

      socket.on("user is live", async (userData) => {
        const userIsContact = await isContact(userData);
        const isLive = clientIsRecipient(userData);
        if (userIsContact) {
          updateLiveStatus(userData, isLive);
        }
        console.log(userData);
      });

      socket.on("user logged out", (userData) => {
        updateOnlineStatus(userData);
      });

      socket.on("message", (msg) => {
        setConversation((prevConversation) => [msg, ...prevConversation]);
        // console.log(msg);
      });
    }
  }, [socket]);

  const values = {
    socket,
    setSocket,
    startSocketConnection,
  };

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
}

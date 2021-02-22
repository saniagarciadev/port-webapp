import { io } from "socket.io-client";
import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useChat } from "./ChatContext";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();
  const {
    contactsList,
    recipient,
    setChatLog,
    setContactsList,
    setRecipient,
    theirLiveText,
    setTheirLiveText,
  } = useChat();

  const startSocketConnection = async (userObj) => {
    setSocket(
      io(`${process.env.REACT_APP_PORT_SERVER}/chat`, {
        query: {
          _id: userObj._id,
          username: userObj.username,
          connections: JSON.stringify(userObj.connections),
        },
        withCredentials: true,
      })
    );
  };

  useEffect(() => {
    socket && socket.close();
    user && startSocketConnection(user);
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("ask status", async (userId) => {
        setContactsList((prev) =>
          prev.map((c) => (c._id === userId ? { ...c, status: "online" } : c))
        );
        const myStatus = recipient._id === userId ? "live" : "online";
        socket.emit("send status", {
          userId,
          status: myStatus,
        });
        console.log("contact online");
      });
      socket.on("status", async ({ userId, status }) => {
        setContactsList((prev) =>
          prev.map((c) => (c._id === userId ? { ...c, status } : c))
        );
        console.log(status);
      });
      socket.on("message", async (msg) => {
        if (msg.senderId === recipient._id || msg.senderId === user._id) {
          setChatLog((prev) => {
            return [msg, ...prev];
          });
        } else {
          console.log(`Notification: '${msg.content}'`);
        }
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

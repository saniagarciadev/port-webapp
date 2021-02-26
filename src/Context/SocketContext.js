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
  const { user, setUser } = useAuth();
  const [online, setOnline] = useState(false);
  const {
    contactsList,
    recipient,
    setIncoming,
    liveText,
    setLiveText,
    setChatLog,
    setContactsList,
  } = useChat();

  const startSocketConnection = async (userObj) => {
    const contactIds = await userObj.connections.map((c) => c._id);
    setSocket(
      io(`${process.env.REACT_APP_PORT_SERVER}/chat`, {
        query: {
          _id: userObj._id,
          username: userObj.username,
          connections: JSON.stringify(contactIds),
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
      socket.on("connect", () => {
        console.log("socket connected");
        setOnline(true);
      });
      socket.on("ask status", async ({ userId, socketId, status }) => {
        console.log("ask status", userId, socketId, status);
        const isContact = await contactsList.find((c) => c._id === userId);
        if (isContact) {
          setContactsList((prev) =>
            prev.map((c) =>
              c._id === userId
                ? { ...c, status: "online", socketId: socketId }
                : c
            )
          );
          const myStatus =
            recipient && recipient._id === userId ? "live" : "online";
          socket.emit("send status", {
            userId,
            socketId: socketId,
            status: myStatus,
          });
        }
      });
      socket.on("status", async ({ userId, socketId, status }) => {
        console.log("status", userId, socketId, status);
        setContactsList((prev) =>
          prev.map((c) =>
            c._id === userId ? { ...c, socketId: socketId, status } : c
          )
        );
        socket.emit("update contact", { userId, socketId, status });
      });
      socket.on("msg sent", async (msg) => {
        setChatLog((prev) => {
          return [msg, ...prev];
        });
      });

      socket.on("msg received", async (msg) => {
        setIncoming(msg);
      });
      socket.on("live text", (input) => {
        setLiveText(input);
      });
      socket.on("disconnect", (reason) => {
        setOnline(false);
        console.log(reason);
      });
    }
  }, [socket]);

  const values = {
    socket,
    setSocket,
    online,
    setOnline,
    startSocketConnection,
  };

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
}

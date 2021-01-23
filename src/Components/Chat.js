import React, { useState, useRef, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import "../App.css";
import { useAuth } from "../Context/AuthContext";
import { useChat } from "../Context/ChatContext";
import { useSocket } from "../Context/SocketContext";

export default function Chat(props) {
  // const history = useHistory();
  const {
    createContactsList,
    chatLog,
    setChatLog,
    currConversation,
    theirLiveText,
  } = useChat();
  const { user } = useAuth();
  const chatBottom = useRef();
  const messageRef = useRef();
  // const [chatHeight, setChatHeight] = useState("");
  const { socket, startSocketConnection } = useSocket();

  const scrollToBottom = () => {
    if (chatBottom.current) {
      chatBottom.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    createContactsList(user.connections);
    startSocketConnection(user);

    // let windowHeight = window.innerHeight;
    // setChatHeight(`${windowHeight}px`);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatLog, setChatLog]);

  const handleMessage = (e) => {
    e.preventDefault();
    if (!messageRef.current["message"].value) {
      return;
    }

    const messageData = {
      senderId: user._id,
      recipientId: currConversation._id,
      content: messageRef.current["message"].value,
    };

    const roomId = currConversation.roomId;

    socket.emit("message", messageData, roomId);

    messageRef.current["message"].value = "";
  };

  const handleLiveText = (e) => {
    socket.emit("live text", e.target.value);
  };

  const messageClass = (m) => {
    if (currConversation.isLive && user._id === m.senderId) {
      return "my-message";
    } else if (user._id === m.senderId) {
      return "my-message";
    } else {
      return "their-message";
    }
  };

  return (
    <div className="Chat">
      <div ref={chatBottom}></div>
      {chatLog && (
        <ul className="chat-log">
          <div className="chat-bottom"></div>
          {currConversation.isLive && theirLiveText && (
            <li>
              <div className="their-live-text">{theirLiveText}</div>
            </li>
          )}
          {chatLog.map((m, index) => (
            <li
              key={index}
              className={
                user._id === m.senderId
                  ? "my-message-line"
                  : "their-message-line"
              }
            >
              <div className={user && messageClass(m)}>{m.content}</div>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleMessage} className="message-form" ref={messageRef}>
        <input
          onChange={(e) => {
            currConversation.isLive && handleLiveText(e);
          }}
          className={
            currConversation.isLive
              ? "message-input live-message-input"
              : "message-input"
          }
          name="message"
          autoComplete="off"
        ></input>
      </form>
    </div>
  );
}

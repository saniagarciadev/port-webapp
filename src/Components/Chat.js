import React, { useRef, useEffect } from "react";
import "../App.css";
import { useAuth } from "../Context/AuthContext";
import { useChat } from "../Context/ChatContext";
import { useSocket } from "../Context/SocketContext";

export default function Chat(props) {
  const { chatLog, setChatLog, recipient, liveText, setLiveText } = useChat();
  const { user } = useAuth();
  const chatBottom = useRef();
  const messageRef = useRef();
  const { socket } = useSocket();

  const scrollToBottom = () => {
    if (chatBottom.current) {
      chatBottom.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog, setChatLog]);

  const handleMessage = (e) => {
    e.preventDefault();
    if (!messageRef.current["message"].value) {
      return;
    }

    socket.emit("send msg", {
      senderId: user._id,
      recipientId: recipient._id,
      socketId: recipient.socketId,
      content: messageRef.current["message"].value,
    });

    messageRef.current["message"].value = "";
  };

  const sendLiveText = (e) => {
    socket.emit("live text", {
      input: e.target.value,
      socketId: recipient.socketId,
    });
  };

  return (
    <div className="Chat">
      <div ref={chatBottom}></div>
      {chatLog && (
        <ul className="chat-log">
          <div className="chat-bottom"></div>
          {liveText && (
            <li>
              <div className="their-live-text">{liveText}</div>
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
              <div
                className={
                  user._id === m.senderId ? "my-message" : "their-message"
                }
              >
                {m.content}
              </div>
            </li>
          ))}
        </ul>
      )}
      {recipient && (
        <form
          onSubmit={handleMessage}
          className="message-form"
          ref={messageRef}
        >
          <input
            onChange={(e) => {
              recipient.status === "live" && sendLiveText(e);
            }}
            className={
              recipient.status === "live"
                ? "message-input live-input"
                : "message-input"
            }
            name="message"
            autoComplete="off"
          ></input>
        </form>
      )}
    </div>
  );
}

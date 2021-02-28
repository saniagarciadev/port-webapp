import React, { useRef, useEffect } from "react";
import "../../App.css";
import { useAuth } from "../../Context/AuthContext";
import { useChat } from "../../Context/ChatContext";

export default function ChatLog(props) {
  const { chatLog, setChatLog, liveText } = useChat();
  const { user } = useAuth();
  const chatBottom = useRef();

  const scrollToBottom = () => {
    if (chatBottom.current) {
      chatBottom.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog, setChatLog]);

  return (
    <div className="chat-log">
      <div ref={chatBottom}></div>
      {chatLog && (
        <ul className="message-list">
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
    </div>
  );
}

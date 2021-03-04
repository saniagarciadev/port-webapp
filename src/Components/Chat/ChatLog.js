import React from "react";
import "../../App.css";
import { useAuth } from "../../Context/AuthContext";
import { useChat } from "../../Context/ChatContext";

export default function ChatLog(props) {
  const { chatLog, liveText } = useChat();
  const { user } = useAuth();

  return (
    <div className="chat-log">
      {chatLog && (
        <ul className="message-list">
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

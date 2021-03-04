import React from "react";
import InputArea from "./InputArea";
import ChatLog from "./ChatLog";
import { useUI } from "../../Context/UIContext";

export default function ChatWindow() {
  const { chatOpacity } = useUI();

  return (
    <div className="chat-window" style={{ opacity: chatOpacity }}>
      <InputArea />
      <div className="dark-gradient"></div>
      <ChatLog />
    </div>
  );
}

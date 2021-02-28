import React, { useRef, useEffect } from "react";
import "../../App.css";
import { useAuth } from "../../Context/AuthContext";
import { useChat } from "../../Context/ChatContext";
import { useSocket } from "../../Context/SocketContext";

export default function InputArea() {
  const { recipient } = useChat();
  const { user } = useAuth();
  const messageRef = useRef();
  const { socket } = useSocket();

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
    <div>
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

import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { useChat } from "../../Context/ChatContext";
import { useSocket } from "../../Context/SocketContext";
import { useUI } from "../../Context/UIContext";
import "../../App.css";

export default function AnimatedNav() {
  const {
    recipient,
    setContactsList,
    setChatLog,
    liveText,
    setLiveText,
  } = useChat();
  const { socket, online } = useSocket();
  const { user } = useAuth();
  const { toggleConns, toggleOpts, chatOpen } = useUI();

  return (
    <div
      className={`animated-nav ${!recipient && "hidden-nav"} ${
        !chatOpen && "hidden-nav"
      }`}
    >
      <span
        className={`circle material-icons ${
          recipient
            ? !recipient.status
              ? "offline-button"
              : recipient.status + "-button"
            : "offline-button"
        } `}
      >
        alternate_email
      </span>
      <span class="material-icons">clear</span>
      <span
        className={`circle material-icons ${
          online ? "live-button" : "offline-button"
        }`}
      >
        settings
      </span>
    </div>
  );
}

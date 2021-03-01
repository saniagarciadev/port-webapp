import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { useChat } from "../../Context/ChatContext";
import { useSocket } from "../../Context/SocketContext";
import { useUI } from "../../Context/UIContext";
import AnimatedNav from "./AnimatedNav";
import "../../App.css";

export default function Header() {
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

  const closeConversation = async (contact) => {
    setContactsList((prev) =>
      prev.map((c) => (c._id === contact._id ? { ...c, recipient: false } : c))
    );
    contact.socketId &&
      socket.emit("send status", {
        userId: contact._id,
        socketId: contact.socketId,
        status: "online",
      });
    setChatLog([]);
    liveText && setLiveText(null);
  };

  return (
    <header>
      <nav>
        <ul className="nav-list">
          <li className="left-button">
            <button
              onClick={() => {
                toggleConns();
              }}
              className={`round-button plain-button material-icons`}
            >
              alternate_email
            </button>
          </li>
          {recipient && (
            <li
              className="recipient-name"
              style={{
                justifyContent: "flex-end",
              }}
            >
              <span
                className={`${
                  recipient.status === "live" ? "live-username" : "username"
                }`}
                style={{
                  textAlign: "right",
                  opacity: `${chatOpen ? 1 : 0}`,
                }}
              >
                {" "}
                {recipient.username}
              </span>
            </li>
          )}
          <li className="center-button">
            <button
              className="close-connection"
              onClick={() => {
                recipient && closeConversation(recipient);
              }}
              style={{ pointerEvents: `${chatOpen ? "auto" : "none"}` }}
            >
              <AnimatedNav />
            </button>
          </li>

          <li
            className={`${chatOpen && recipient ? "username-1" : "username-2"}`}
            style={{
              justifyContent: `${
                chatOpen && recipient ? "flex-start" : "flex-end"
              }`,
            }}
          >
            <span className={`${online ? "live-username" : "username"}`}>
              {user.username}
            </span>
          </li>

          <li className="right-button">
            <button
              onClick={() => toggleOpts()}
              className={`round-button ${
                chatOpen
                  ? recipient
                    ? "plain-button"
                    : online
                    ? "live-button"
                    : "offline-button"
                  : online
                  ? "live-button"
                  : "offline-button"
              } material-icons `}
            >
              settings
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

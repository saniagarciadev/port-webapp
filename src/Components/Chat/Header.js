import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { useChat } from "../../Context/ChatContext";
import { useSocket } from "../../Context/SocketContext";
import { useUI } from "../../Context/UIContext";
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
  const { toggleConns, toggleOpts } = useUI();

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
        {/* {recipient && (
          <span onClick={() => closeConversation(recipient)}>
            {" "}
            {recipient.username}
          </span>
        )} */}
        <ul className="nav-list">
          <li className="nav-left">
            <button
              onClick={() => toggleConns()}
              className={`round-button material-icons ${
                recipient && recipient.status
              }`}
            >
              alternate_email
            </button>
          </li>
          <li className="nav-right">
            <span className="user-title">{user.username}</span>

            <button
              onClick={() => toggleOpts()}
              className={`round-button material-icons ${online && "live"}`}
            >
              {/* settings */}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

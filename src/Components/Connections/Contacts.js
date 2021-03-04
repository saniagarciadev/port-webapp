import React, { useEffect } from "react";
import { useChat } from "../../Context/ChatContext";
import { useSocket } from "../../Context/SocketContext";
import { useUI } from "../../Context/UIContext";
import AddConnection from "./AddConnection";

export default function Contacts(props) {
  const {
    setChatLog,
    contactsList,
    recipient,
    setRecipient,
    setContactsList,
    liveText,
    setLiveText,
  } = useChat();
  const { socket } = useSocket();
  const { toggleConns } = useUI();

  useEffect(() => {
    setRecipient(contactsList.find((c) => c.recipient));
  }, [contactsList]);

  const openConversation = async (contact) => {
    toggleConns();
    socket.emit("send status", {
      userId: contact._id,
      socketId: contact.socketId ? contact.socketId : null,
      status: "live",
    });
    if (recipient) {
      setContactsList((prev) =>
        prev.map((c) => {
          if (c._id === recipient._id) {
            return { ...c, recipient: false };
          } else if (c._id === contact._id) {
            return { ...c, recipient: true };
          } else {
            return c;
          }
        })
      );
      recipient.socketId &&
        socket.emit("send status", {
          userId: recipient._id,
          socketId: recipient.socketId,
          status: "online",
        });
    } else {
      setContactsList((prev) =>
        prev.map((c) => (c._id === contact._id ? { ...c, recipient: true } : c))
      );
    }
    socket.once("chat history", (messages) => {
      setChatLog(messages);
    });
    liveText && setLiveText(null);
  };

  return (
    <div className="connections">
      <ul>
        {contactsList &&
          contactsList.map((contact, index) => (
            <li
              key={index}
              onClick={() => openConversation(contact)}
              className={
                contact.status ? `contact ${contact.status}` : "contact"
              }
            >
              {contact.username}
            </li>
          ))}
        <AddConnection />
      </ul>
    </div>
  );
}

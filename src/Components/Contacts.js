import React, { useEffect } from "react";
import { useChat } from "../Context/ChatContext";
import { useSocket } from "../Context/SocketContext";

export default function Contacts(props) {
  const {
    setChatLog,
    contactsList,
    recipient,
    setRecipient,
    setContactsList,
  } = useChat();
  const { socket } = useSocket();

  useEffect(() => {
    setRecipient(contactsList.find((c) => c.recipient));
  }, [contactsList]);

  const openConversation = async (contact) => {
    contact.socketId &&
      socket.emit("send status", {
        userId: contact._id,
        socketId: contact.socketId,
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
  };

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
  };

  return (
    <div className="connections">
      {contactsList &&
        contactsList.map((contact) => (
          <>
            <span
              onClick={() => openConversation(contact)}
              className={
                contact.status ? `contact ${contact.status}` : "contact"
              }
            >
              {contact.username}
              <div className="status">
                {contact.status ? contact.status : "offline"}
              </div>
            </span>
          </>
        ))}
      <button onClick={() => console.log(recipient)}>log</button>
      {recipient && (
        <>
          <span
            onClick={() => openConversation(recipient)}
            className={
              recipient.status ? `recipient ${recipient.status}` : "recipient"
            }
          >
            {" "}
            {recipient.username}
            <div className="status">
              {recipient.status ? recipient.status : "offline"}
            </div>
          </span>
          <button onClick={() => closeConversation(recipient)}>x</button>
        </>
      )}
    </div>
  );
}

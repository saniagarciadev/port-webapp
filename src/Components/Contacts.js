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
    const myRecipient = contactsList.find((c) => c.recipient);
    myRecipient ? setRecipient(myRecipient) : setRecipient(null);
  }, [contactsList]);

  const openConversation = async (contact) => {
    console.log(contact);
    setContactsList((prev) =>
      prev.map((c) => (c._id === contact._id ? { ...c, recipient: true } : c))
    );
    socket.emit("send status", {
      userId: contact._id,
      socketId: contact.socket ? contact.socket : null,
      status: "live",
    });
    socket.once("chat history", (messages) => {
      setChatLog(messages);
    });
  };

  const closeConversation = async (contact) => {
    setContactsList((prev) =>
      prev.map((c) => (c._id === contact._id ? { ...c, recipient: false } : c))
    );
    socket.emit("send status", {
      userId: contact._id,
      socketId: contact.socket ? contact.socket : null,
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
      <button onClick={() => socket.emit("log")}>log</button>
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

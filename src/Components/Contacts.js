import React from "react";
import { useChat } from "../Context/ChatContext";
import { useSocket } from "../Context/SocketContext";

export default function Contacts(props) {
  const { setChatLog, contactsList, recipient, setRecipient } = useChat();
  const { socket } = useSocket();

  const openConversation = async (contact) => {
    socket.emit("set recipient", contact._id);
    socket.once("chat history", (messages) => {
      setChatLog(messages);
    });
    setRecipient(contact);
  };

  const closeConversation = async (recipient) => {
    socket.emit("send status", {
      userId: recipient._id,
      status: "online",
    });
    setRecipient({
      username: "universe",
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
      {recipient.username !== "universe" && (
        <>
          <span
            onClick={() => openConversation(recipient)}
            className={
              recipient.status ? `recipient ${recipient.status}` : "recipient"
            }
          >
            {" "}
            {recipient.username}
          </span>
          <span>{recipient.status}</span>
          <button onClick={() => closeConversation(recipient)}>x</button>
        </>
      )}
    </div>
  );
}

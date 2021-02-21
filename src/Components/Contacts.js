import React from "react";
import { useChat } from "../Context/ChatContext";
import { useSocket } from "../Context/SocketContext";
import { useAuth } from "../Context/AuthContext";

export default function Contacts(props) {
  const { user } = useAuth();

  const {
    setChatLog,
    contactsList,
    setContactsList,
    recipient,
    setRecipient,
  } = useChat();
  const { socket } = useSocket();

  const openConversation = async (contact) => {
    let myRecipient = contact;
    if (contact.status === "live") {
      myRecipient.status = "together";
    }
    socket.emit("live", JSON.stringify(contact));
    socket.once("chat history", (messages) => {
      setChatLog(messages);
    });
    setContactsList(user.connections.filter((c) => c._id !== contact._id));
    setRecipient(myRecipient);
  };

  const closeConversation = async (recipient) => {
    socket.emit("status", {
      contact: JSON.stringify(recipient),
      status: "online",
    });
    let recipientStatus;
    recipient.status === "together"
      ? (recipientStatus = "live")
      : (recipientStatus = recipient.status);
    setContactsList((prev) => {
      return [
        ...prev,
        {
          _id: recipient._id,
          username: recipient.username,
          status: recipientStatus,
        },
      ];
    });
    setRecipient({
      username: "universe",
      status: "online",
    });
  };

  return (
    <div className="connections">
      {contactsList &&
        contactsList.map((contact) => (
          <span
            onClick={() => openConversation(contact)}
            className={contact.status ? `contact ${contact.status}` : "contact"}
          >
            {contact.username}
          </span>
        ))}
      {recipient.username !== "universe" && (
        <>
          <span
            className={
              recipient.status ? `contact ${recipient.status}` : "contact"
            }
          >
            {" "}
            {recipient.username}
          </span>
          <button onClick={() => closeConversation(recipient)}>x</button>
        </>
      )}
    </div>
  );
}

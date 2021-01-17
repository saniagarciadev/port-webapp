import React, { useState, useEffect } from "react";
import { useSession } from "../Context/SessionContext";
import { useSocket } from "../Context/SocketContext";

export default function Contacts(props) {
  const {
    user,
    // setUser,
    // conversation,
    setConversation,
    contactsList,
    currConversation,
    setCurrConversation,
  } = useSession();
  const { socket } = useSocket();
  const [selectedContact, setSelectedContact] = useState("");

  useEffect(() => {
    currConversation && console.log(currConversation);
  }, [currConversation, currConversation]);

  const openConversation = async (contact) => {
    // if (currConversation.username !== contact.username) {
    const roomId = (await contact.isLive)
      ? contact.roomId
      : `${contact.username}${user.username}`;
    const userData = {
      userId: user._id,
      recipientId: contact._id,
      isLive: true,
      roomId: roomId,
    };
    socket.emit("join room", userData);
    setCurrConversation(() => {
      return { ...contact, roomId: userData.roomId };
    });
    socket.once("chat history", (messages) => {
      setConversation(messages);
    });
    setSelectedContact(contact._id);
    // }
  };

  const contactClass = (contact) => {
    if (contact.isLive && contact._id === selectedContact) {
      return "contact live-contact-open";
    } else if (contact.isLive) {
      return "contact live-contact";
    } else if (contact.isOnline && contact._id === selectedContact) {
      return "contact online-contact-open";
    } else if (contact.isOnline) {
      return "contact online-contact";
    } else if (contact._id === selectedContact) {
      return "contact selected-contact";
    } else {
      return "contact inactive-contact";
    }
  };

  return (
    <div className="connections">
      {contactsList &&
        contactsList.map((contact, index) => (
          <span
            onClick={() => openConversation(contact)}
            className={contactClass(contact)}
          >
            {contact.username}
          </span>
        ))}
    </div>
  );
}

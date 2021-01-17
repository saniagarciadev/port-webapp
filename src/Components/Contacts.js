import React, { useState } from "react";
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

  const openConversation = async (contact) => {
    if (currConversation.username !== contact.username) {
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
      // console.log(roomId);
      socket.once("chat history", (messages) => {
        console.log(messages);
        setConversation(messages);
      });
      setSelectedContact(contact._id);
    }

    // fetch(process.env.REACT_APP_PORT_SERVER + "/messages/" + contact._id, {
    //   method: "GET",
    //   credentials: "include",
    //   // "Access-Control-Allow-Origin": "http://port.contact/",
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setConversation(res);
    //     // console.log(res);
    //   })
    //   .catch((err) => console.log(err));
  };

  // const deleteConnection = (contact) => {
  //   fetch(`${process.env.REACT_APP_PORT_SERVER}/connections/`, {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //     body: JSON.stringify(contact),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.success === true) {
  //         console.log(res.updatedContact);
  //         setUser((prevUser) => {
  //           return { ...prevUser, connections: res.updatedContacts };
  //         });
  //       } else {
  //         console.log(res.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error: ", error);
  //     });
  //   // console.log(c);
  //   // const index = usersList.indexOf(user);
  //   // setUsersList((prev) => prev.slice(index, 1));
  // };

  const contactClass = (contact) => {
    if (contact.isLive) {
      return "contact live-contact";
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

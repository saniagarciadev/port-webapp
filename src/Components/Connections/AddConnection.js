import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useChat } from "../../Context/ChatContext";

export default function AddConnection(props) {
  const { user } = useAuth();
  const { recipient, createContactsList } = useChat();
  const addContactForm = useRef();
  const [showAddInput, setShowAddInput] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();

    const newContact = {
      username: addContactForm.current["username"].value,
    };
    const contactExists = user.connections
      ? user.connections.find(
          (contact) => contact.username === newContact.username
        )
      : false;
    if (contactExists) {
      console.log(`User ${newContact.username} is already a contact.`);
    } else {
      fetch(`${process.env.REACT_APP_PORT_SERVER}/connections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newContact),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === true) {
            console.log(res.updatedContacts);
            createContactsList(res.updatedContacts);
          } else {
            console.log(res.message);
          }
        })
        .catch((err) => console.log(err));
    }
    addContactForm.current["username"].value = "";
  };

  return (
    <form className="add-contact" ref={addContactForm} onSubmit={handleAdd}>
      <input
        className="add-contact-input"
        name="username"
        type="text"
        placeholder="Name"
      ></input>
      <button>Add</button>
    </form>
  );
}

import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useChat } from "../Context/ChatContext";

export default function AddConnection(props) {
  const { user } = useAuth();
  const { currConversation, createContactsList } = useChat();
  const addContactForm = useRef();
  const [showAddInput, setShowAddInput] = useState(false);
  const [showAddTitle, setShowAddTitle] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    setShowAddInput(false);
    setShowCloseButton(false);
  }, [currConversation]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!showAddInput) {
      toggleAdd();
      return;
    }

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
      // console.log(`Request to add this contact: ${JSON.stringify(newContact)}`);
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
            // setUser((prevUser) => {
            //   return { ...prevUser, connections: res.updatedContacts };
            // });
          } else {
            console.log(res.message);
          }
        })
        .catch((err) => console.log(err));
    }
    addContactForm.current["username"].value = "";
    toggleAdd();
  };

  const toggleAdd = () => {
    setShowAddInput((prev) => !prev);
    setShowAddTitle(false);
    setShowCloseButton((prev) => !prev);
  };

  return (
    <form className="add-contact" ref={addContactForm} onSubmit={handleAdd}>
      <button
        onMouseEnter={() => setShowAddTitle(true)}
        onMouseLeave={() => setShowAddTitle(false)}
        onClick={handleAdd}
        type="submit"
      >
        <span className="material-icons">
          {showCloseButton ? "close" : "add_circle"}
        </span>
      </button>
      <input
        className={
          showAddInput ? "add-contact-input" : "add-contact-input hide-input"
        }
        name="username"
        type="text"
        placeholder="Contact username"
      ></input>
      <div
        className={`add-contact-text ${
          showAddTitle ? "show-add-contact-text" : "hide-add-contact-text"
        }`}
      >
        Add contact
      </div>
      <div
        className={
          showAddInput
            ? "dark-background"
            : "dark-background hide-dark-background"
        }
        onClick={showAddInput && toggleAdd}
      ></div>
    </form>
  );
}

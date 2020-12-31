import React, { useRef, useState, useEffect } from "react";
import { useSession } from "../Context/SessionContext";

export default function AddConnection(props) {
  const { user, setUser, currConversation, createContactsList } = useSession();
  const addContactForm = useRef();
  const [showAddInput, setShowAddInput] = useState(false);
  const [showAddTitle, setShowAddTitle] = useState(false);

  useEffect(() => {
    setShowAddInput(false);
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
      fetch("http://localhost:4000/connections", {
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
  };

  return (
    <form className="add-contact" ref={addContactForm} onSubmit={handleAdd}>
      {/* <button type="submit">
          <span className="material-icons">add_circle</span>
        </button> */}
      <div
        onMouseEnter={() => setShowAddTitle(true)}
        onMouseLeave={() => setShowAddTitle(false)}

        // className="logout-button"
      >
        <button onClick={handleAdd} type="submit">
          <span className=" material-icons">add_circle</span>
        </button>
        <input
          id="add-contact-field"
          className={showAddInput ? "show-add" : "hide-add"}
          name="username"
          type="text"
          placeholder="Username"
        ></input>
        <span
          onClick={handleAdd}
          className={`add-title ${
            showAddTitle ? "show-logout" : "hide-logout"
          } ${showAddInput ? "add-title-off" : "add-title-on"}`}
        >
          Add contact
        </span>
      </div>
    </form>
  );
}

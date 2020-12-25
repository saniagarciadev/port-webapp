import React, { useRef } from "react";
import { useSession } from "../Context/SessionContext";

export default function AddConnection(props) {
  const { user, setUser } = useSession();
  const addContactForm = useRef();

  const handleAdd = async (e) => {
    e.preventDefault();

    const newContact = {
      username: addContactForm.current["username"].value,
    };
    const contactExists = (await user.connections)
      ? await user.connections.find(
          (contact) => contact.username === newContact.username
        )
      : false;
    if (contactExists) {
      console.log(`User ${newContact.username} is already a contact.`);
    } else {
      console.log(`Request to add this contact: ${JSON.stringify(newContact)}`);
      fetch("http://localhost:4000/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newContact),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === true) {
            setUser((prev) => {
              prev.connections = res.updatedContacts;
            });
          } else {
            console.log(res.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <form className="add-contact" ref={addContactForm} onSubmit={handleAdd}>
        <input name="username" type="text" placeholder="Username"></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

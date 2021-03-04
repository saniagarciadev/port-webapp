import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useChat } from "../../Context/ChatContext";
import { useSocket } from "../../Context/SocketContext";
import { useUI } from "../../Context/UIContext";

export default function AddConnection(props) {
  const { user } = useAuth();
  const { recipient, setRecipient, setContactsList } = useChat();
  const addContactForm = useRef();
  const { showAddConn, setShowAddConn } = useUI();
  const { socket } = useSocket();

  const handleAdd = async (e) => {
    e.preventDefault();
    recipient && setRecipient(null);

    const username = await addContactForm.current["username"].value;

    if (username) {
      const data = {
        username: username,
      };

      fetch(`${process.env.REACT_APP_PORT_SERVER}/connections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          setContactsList((prev) => {
            return [res, ...prev];
          });
          socket.emit("ask status");
          setShowAddConn(false);
        })
        .catch((err) => console.log(err));

      addContactForm.current["username"].value = "";
    } else {
      setShowAddConn(false);
    }
  };

  return (
    <>
      {showAddConn ? (
        <form className="add-contact" ref={addContactForm} onSubmit={handleAdd}>
          <input
            className="add-contact-input"
            name="username"
            type="text"
            placeholder="Enter contact username"
            autofocus="true"
          ></input>
          <button>Add</button>
        </form>
      ) : (
        <li
          onClick={() => setShowAddConn(true)}
          className="contact plus-button"
          style={{ fontSize: "2em", padding: "0px 0px 5px 0px" }}
        >
          +
        </li>
      )}
    </>
  );
}

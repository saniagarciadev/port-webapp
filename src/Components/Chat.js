import React, { useState, useRef, useEffect, useContext } from "react";
// import { Link, useParams } from "react-router-dom";
import "../App.css";
import { UserContext } from "../Context/UserContext";

export default function Chat(props) {
  const { user, setUser } = useContext(UserContext);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentConversation, setCurrentConversation] = useState([]);
  const [recipientId, setRecipientId] = useState("");
  const addContactForm = useRef();
  const chatLog = useRef();
  const chatBottom = useRef();
  const messageRef = useRef();
  const [chatHeight, setChatHeight] = useState("");
  //   const [deletedMessage, setDeletedMessage] = useState();

  const scrollToBottom = () => {
    chatBottom.current.scrollIntoView({ block: "end", behavior: "smooth" });
  };

  useEffect(() => {
    // setInterval(() => {
    fetch("http://localhost:4000/user/" + props.userId)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
        setContacts(res.contacts);
      });
    // console.log(user.contacts);
    fetch("http://localhost:4000/messages/" + props.userId)
      .then((res) => res.json())
      .then((res) => setMessages(res));
    // }, 1000);
    let windowHeight = window.innerHeight;
    setChatHeight(`${windowHeight - 180}px`);
  }, []);

  useEffect(() => {
    console.log(contacts);
  }, [contacts]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const openConversation = (recipient) => {
    console.log(recipient.name, recipient._id);

    setRecipientId(recipient._id);
    const getMessage = (item) => {
      if (item.senderId === user._id && item.recipientId === recipient._id) {
        return true;
      } else if (
        item.senderId === recipient._id &&
        item.recipientId === user._id
      ) {
        return true;
      } else {
        return false;
      }
    };
    const conversationMessages = messages.filter(getMessage);
    setCurrentConversation(conversationMessages);
  };

  const handleMessage = (e) => {
    e.preventDefault();

    if (!messageRef.current["message"].value) {
      return;
    }
    const data = {
      senderId: props.userId,
      recipientId: recipientId,
      message: messageRef.current["message"].value,
      // roomId: JSON.stringify(roomId),
    };

    fetch("http://localhost:4000/messages/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) =>
        setCurrentConversation((prev) => {
          console.log(res);
          return [...prev, res];
        })
      );

    messageRef.current["message"].value = "";
  };

  const deleteMessage = (m, index) => {
    fetch("http://localhost:4000/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(m),
    });

    chatLog.current.children[index].classList.add("hidden");
  };

  const handleContactAdd = (e) => {
    e.preventDefault();

    const userExists = props.usersList.find(
      (user) => user.name === addContactForm.current["username"].value
    );

    // console.log(props.usersList);

    // console.log(userExists._id);

    // const contactExists = contacts.find((contact) => contact.name === name);

    // console.log(contacts);

    if (userExists) {
      fetch("http://localhost:4000/contacts/" + user.name + "/" + user._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userExists),
      })
        .then((res) => res.json())
        .then((res) => setContacts(res.contacts));
      // openConversation(newContact);
    } else {
      alert(`User doesn't exist`);
    }
  };

  const deleteContact = (c) => {
    fetch("http://localhost:4000/contacts/" + user._id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(c),
    })
      .then((res) => res.json())
      .then((res) => setContacts(res.value.contacts));
    // .catch((error) => {
    //   console.error("Error:", error);
    // });
    // console.log(c);
    // const index = usersList.indexOf(user);
    // setUsersList((prev) => prev.slice(index, 1));
  };

  return (
    <div className="Chat">
      <div className="conversations">
        {contacts.map((c) => (
          <div className="contact">
            <button onClick={() => openConversation(c)}>{c.name}</button>
            <button
              className="delete-user-button"
              onClick={() => deleteContact(c)}
            >
              x
            </button>
          </div>
        ))}
        <form
          className="add-contact"
          ref={addContactForm}
          onSubmit={handleContactAdd}
        >
          <input name="username" type="text" placeholder="Username"></input>
          <button>Add</button>
        </form>
      </div>

      <div className="chat-log" style={{ height: chatHeight }} ref={chatLog}>
        {currentConversation.map((m, index) => (
          <div
            id={index}
            className={
              user._id === m.senderId ? "my-message-line" : "their-message-line"
            }
          >
            <div
              className={
                user._id === m.senderId ? "my-message" : "their-message"
              }
              onClick={() => deleteMessage(m, index)}
            >
              {m.message}
            </div>
          </div>
        ))}
        <div ref={chatBottom}></div>
      </div>
      <form id="message-form" ref={messageRef} onSubmit={handleMessage}>
        <input
          name="message"
          type="text"
          placeholder="Gotta xat fast"
          autoComplete="off"
        ></input>
        <button type="submit" className="material-icons">
          flash_on
        </button>
      </form>
    </div>
  );
}

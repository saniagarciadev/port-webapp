import React, { useState, useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import { useSession } from "../Context/SessionContext";
import { useSocket } from "../Context/SocketContext";

const {
  PORT_CONTACT_SERVER = "https://port-contact-server.herokuapp.com",
} = process.env;

export default function Chat(props) {
  const history = useHistory();
  const {
    user,
    setUser,
    createContactsList,
    conversation,
    setConversation,
    currConversation,
  } = useSession();
  // const chatLog = useRef();
  const chatBottom = useRef();
  const messageRef = useRef();
  const [chatHeight, setChatHeight] = useState("");
  const { socket, startSocketConnection } = useSocket();

  const scrollToBottom = () => {
    if (chatBottom.current) {
      chatBottom.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const asyncStart = async (userObj) => {
    await setUser(userObj);
    await createContactsList(userObj.connections);
    startSocketConnection(userObj);
  };

  useEffect(() => {
    if (!user) {
      fetch(PORT_CONTACT_SERVER, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        "Access-Control-Allow-Origin": "http://port.contact/",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.authenticated === false) {
            console.log("Start session to enter chat.");
            history.push("/");
          } else {
            asyncStart(res.user);

            console.log(
              `User ${res.user.username} has been correctly authenticated.`
            );
          }
        })
        .catch((err) => console.log(err));
    }
    // else if (user && !socket) {
    //   console.log(
    //     `User ${user.username} remains authenticated from previous visit.`
    //   );
    //   startSocketConnection(user);
    // } else if (!user) {
    //   history.push("/");
    // }

    let windowHeight = window.innerHeight;
    setChatHeight(`${windowHeight}px`);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversation, setConversation]);

  const handleMessage = (e) => {
    e.preventDefault();

    if (!messageRef.current["message"].value) {
      return;
    }

    const messageData = {
      senderId: user._id,
      recipientId: currConversation._id,
      content: messageRef.current["message"].value,
    };

    const roomId = currConversation.roomId;

    socket.emit("message", messageData, roomId);

    messageRef.current["message"].value = "";

    // fetch(PORT_CONTACT_SERVER + "/messages/" + conversation.connection._id, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(messageData),
    // })
    //   .then((res) => res.json())
    //   .then((res) =>
    //     setConversation((prev) => {
    //       conversation.messages = [...prev.messages, res.newMessage];
    //     })
    //   );
  };

  // const deleteMessage = (m, index) => {
  //   fetch(PORT_CONTACT_SERVER + "/messages", {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(m),
  //   });

  // chatLog.current.children[index].classList.add("hidden");
  // };

  return (
    <div className="Chat" style={{ height: chatHeight }}>
      <div ref={chatBottom}></div>

      {conversation && (
        <ul className="chat-log">
          <div className="chat-bottom"></div>
          {conversation.map((m, index) => (
            <li
              key={index}
              className={
                user._id === m.senderId
                  ? "my-message-line"
                  : "their-message-line"
              }
            >
              <div
                className={
                  user._id === m.senderId ? "my-message" : "their-message"
                }
              >
                {m.content}
              </div>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleMessage} className="message-form" ref={messageRef}>
        <input
          className="message-input"
          name="message"
          autoComplete="off"
        ></input>
      </form>

      {/* <button type="submit" className="material-icons">
          flash_on
        </button> */}
    </div>
  );
}

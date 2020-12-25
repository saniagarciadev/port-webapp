import React, { useState, useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import { useSession } from "../Context/SessionContext";
import { useSocket } from "../Context/SocketContext";

const { PORT_CONTACT_SERVER = "http://localhost:4000" } = process.env;

export default function Chat(props) {
  const history = useHistory();
  const { user, setUser, conversation, setConversation } = useSession();
  const chatLog = useRef();
  const chatBottom = useRef();
  const messageRef = useRef();
  const [chatHeight, setChatHeight] = useState("");
  const { socket } = useSocket();

  const scrollToBottom = () => {
    if (chatBottom.current) {
      chatBottom.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!user) {
      fetch(PORT_CONTACT_SERVER + "/", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        "Access-Control-Allow-Origin": "http://localhost:4000/",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.authenticated === false) {
            console.log("Start session to enter chat.");
            history.push("/");
          } else {
            console.log(`Authorized user: ${res.user}`);
            setUser(res.user);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    let windowHeight = window.innerHeight;
    setChatHeight(`${windowHeight - 180}px`);
    scrollToBottom();
  }, [conversation, setConversation]);

  const handleMessage = (e) => {
    e.preventDefault();

    if (!messageRef.current["message"].value) {
      return;
    }

    const messageData = {
      senderId: user._id,
      recipientId: conversation.connection._id,
      content: messageRef.current["message"].value,
    };

    socket.emit("message", messageData);

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

    messageRef.current["message"].value = "";
  };

  const deleteMessage = (m, index) => {
    fetch(PORT_CONTACT_SERVER + "/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(m),
    });

    chatLog.current.children[index].classList.add("hidden");
  };

  return (
    <>
      {user && (
        <div className="Chat">
          <div
            className="chat-log"
            style={{ height: chatHeight }}
            ref={chatLog}
          >
            {conversation
              ? conversation.messages.map((m, index) => (
                  <div
                    id={index}
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
                      onClick={() => deleteMessage(m, index)}
                    >
                      {m.content}
                    </div>
                  </div>
                ))
              : ""}
            <div ref={chatBottom}></div>
          </div>

          <form onSubmit={handleMessage} id="message-form" ref={messageRef}>
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
      )}
    </>
  );
}

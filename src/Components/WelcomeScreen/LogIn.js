import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";

export default function LogIn() {
  const { login, setUser, setUserIsTemp } = useAuth();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [showUsernameInput, setShowUsernameInput] = useState(true);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [usernameSaved, setUsernameSaved] = useState("");

  //~~ Check if username exists. If it doesn't, create temporary user ~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const handleUsername = (e) => {
    e.preventDefault();
    const username = usernameRef.current["username"].value;
    setUsernameSaved(username);
    fetch(`${process.env.REACT_APP_PORT_SERVER}/login/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          setShowUsernameInput(false);
          setShowPasswordInput(true);
          console.log("User exists.");
          return false; //~~ No temporary user created.
        } else if (res.status === 201) {
          setUserIsTemp(true);
          return res.json(); //~~ Return temporary user object.
        }
      })
      .then((res) => {
        if (res) {
          setUser(res);
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  //~~ Run login credentials through login function ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const handlePassword = (e) => {
    e.preventDefault();
    const data = {
      username: usernameSaved,
      password: passwordRef.current["password"].value,
    };
    login(data);
  };

  const goBack = () => {
    setShowPasswordInput(false);
    setShowUsernameInput(true);
  };

  useEffect(() => {
    showPasswordInput && passwordRef.current["password"].focus();
  }, [showPasswordInput]);

  return (
    <div className="login-screen">
      <h1 className="app-title">Port</h1>
      <form
        ref={usernameRef}
        className={showUsernameInput ? "message-form" : "hide-login-input"}
        style={{ position: "relative" }}
        onSubmit={handleUsername}
      >
        <input
          className="message-input"
          name="username"
          placeholder="Username"
          autoFocus={true}
          required
        ></input>
      </form>
      <form
        ref={passwordRef}
        className={`later-input ${
          showPasswordInput ? "message-form" : "hide-login-input"
        }`}
        style={{ position: "relative" }}
        onSubmit={handlePassword}
      >
        <button className="material-icons go-back" onClick={goBack}>
          keyboard_backspace
        </button>
        <input
          className="message-input"
          type="password"
          name="password"
          placeholder="Password"
          autoFocus={true}
          required
        ></input>
      </form>
    </div>
  );
}

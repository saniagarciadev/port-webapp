import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSession } from "../Context/SessionContext";
import { useSocket } from "../Context/SocketContext";

export default function Register() {
  let history = useHistory();
  const { user, setUser, createContactsList } = useSession();
  const { startSocketConnection } = useSocket();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showUsernameInput, setShowUsernameInput] = useState(true);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  // const [emailInput, setEmailInput] = useState("");

  // HTML FORM SEND
  // <Form action="/subdomain" method="post">
  // <input type="text" name="username"/>

  const asyncStart = async (userObj) => {
    await setUser(userObj);
    await createContactsList(userObj.connections);
    await startSocketConnection(userObj);
    history.push("/chat");
  };

  const storeUsername = (e) => {
    e.preventDefault();
    //Check all fields are correctly filled out
    const username = usernameRef.current["username"].value;

    setUsernameInput(username);

    // console.log(usernameInput);

    fetch(`${process.env.REACT_APP_PORT_SERVER}/login/username`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // "Access-Control-Allow-Origin": "http://port.contact/",
      credentials: "include",
      body: JSON.stringify({ username: username }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(username, res.success);
        if (res.success === true) {
          setUserExists(true);
          setShowUsernameInput(false);
          setShowPasswordInput(true);
        } else {
          setUserExists(false);
          setShowUsernameInput(false);
          setShowPasswordInput(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const storePassword = () => {
    setPasswordInput(passwordRef.current["password"].value);
    setShowPasswordInput(false);
    setShowEmailInput(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(userExists);
    if (userExists) {
      const loginData = {
        username: usernameInput,
        password: passwordRef.current["password"].value,
      };
      // console.log(loginData);

      fetch(`${process.env.REACT_APP_PORT_SERVER}/login`, {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
        // "Access-Control-Allow-Origin": "http://port.contact/",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === true) {
            asyncStart(res.user);
            // console.log(res.user);
            // console.log(`Logged in user: ${res.user.username}`);
            // startSocketConnection(res.user);
            // history.push("/chat");
          } else {
            console.log(res.message);
            // history.push("/chat");
          }
        })
        .catch((err) => console.log(err));
    } else {
      storePassword();
    }
  };

  const registerUser = (e) => {
    e.preventDefault();
    const registerData = {
      username: usernameInput,
      password: passwordInput,
      email: emailRef.current["email"].value,
    };
    fetch(`${process.env.REACT_APP_PORT_SERVER}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // "Access-Control-Allow-Origin": "http://port.contact/",
      credentials: "include",
      body: JSON.stringify(registerData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          asyncStart(res.user);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        debugger;
      });
  };

  const goBack = () => {
    if (showPasswordInput) {
      setShowPasswordInput(false);
      setShowUsernameInput(true);
    } else {
      setShowEmailInput(false);
      setShowPasswordInput(true);
    }
  };

  return (
    <div className="login-area">
      <form
        ref={usernameRef}
        className={`login-input ${
          showUsernameInput ? "show-login-input" : "hide-login-input"
        }`}
        onSubmit={storeUsername}
      >
        <input name="username" required></input>
        <p>username</p>
      </form>

      <form
        ref={passwordRef}
        className={`login-input later-input ${
          showPasswordInput ? "show-login-input" : "hide-login-input"
        }`}
        onSubmit={handleLogin}
      >
        <p className="go-back" onClick={goBack}>
          {"<"}
        </p>
        <input type="password" name="password" required></input>
        <p>password</p>
      </form>

      <form
        ref={emailRef}
        className={`login-input later-input ${
          showEmailInput ? "show-login-input" : "hide-login-input"
        }`}
        onSubmit={registerUser}
      >
        <p className="go-back" onClick={goBack}>
          {"<"}
        </p>
        <input
          type="email"
          name="email"
          // required
        ></input>
        <p>email</p>
      </form>
    </div>
    /* <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
        ></input>
      </div>

      <input type="email" name="email" placeholder="E-mail" required></input>
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
      ></input>
      <button type="submit">Create</button> */
  );
}

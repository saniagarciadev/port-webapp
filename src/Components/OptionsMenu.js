import React, { useState, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
// import { useHistory } from "react-router-dom";
import { useSocket } from "../Context/SocketContext";

export default function OptionsMenu(props) {
  // let history = useHistory();
  const { user, setUser } = useAuth();
  const { socket } = useSocket();
  const [showOptionsMenuLabel, setShowOptionsMenuLabel] = useState(false);
  const [showOptionsMenuWindow, setShowOptionsMenuWindow] = useState(false);
  const [show, setShow] = useState({
    username: false,
    register: false,
    delete: false,
    about: false,
  });
  const registerRef = useRef();
  const usernameRef = useRef();

  const toggleShowOptionsMenu = () => {
    setShowOptionsMenuWindow((prev) => !prev);
    setShowOptionsMenuLabel(false);
  };

  const handleSignUp = () => {};

  const handleLogout = async () => {
    fetch(process.env.REACT_APP_PORT_SERVER + "/logout", {
      credentials: "include",
      // "Access-Control-Allow-Origin": "http://port.contact/",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        socket.emit("log out");
        setUser(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="menu-button">
        <span
          className={`menu-label ${
            showOptionsMenuLabel ? "show-menu-label" : "hide-menu-label"
          }`}
        >
          Options
        </span>
        <span
          onMouseEnter={() => setShowOptionsMenuLabel(true)}
          onMouseLeave={() => setShowOptionsMenuLabel(false)}
          onClick={toggleShowOptionsMenu}
          className="material-icons menu-icon"
        >
          {showOptionsMenuWindow ? "close" : "menu"}
        </span>
      </div>
      <div
        className={
          showOptionsMenuWindow
            ? "menu-window show-menu-window"
            : "menu-window hide-menu-window"
        }
      >
        <div className="menu-login-info">Temporary user: {user.username}</div>
        <div className="option-div">
          <p
            onClick={() =>
              setShow((prev) => {
                return { ...prev, username: !prev.username };
              })
            }
          >
            Change username{" "}
            <span class="material-icons option-arrow">keyboard_arrow_down</span>
          </p>
          <form
            ref={usernameRef}
            style={show.username ? { height: "4.5ch" } : { height: "0ch" }}
            className={"option-input"}
            // onSubmit={handlePassword}
          >
            port.contact/{" "}
            <input
              type="text"
              name="username"
              defaultValue={user.username}
              required
            ></input>
          </form>
        </div>

        <div className="option-div">
          <p
            onClick={() =>
              setShow((prev) => {
                return { ...prev, register: !prev.register };
              })
            }
          >
            Save account and conversations{" "}
            <span class="material-icons option-arrow">keyboard_arrow_down</span>
          </p>
          <form
            ref={registerRef}
            style={show.register ? { height: "4.5ch" } : { height: "0ch" }}
            className="option-input"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
            ></input>
            <input
              type="password"
              name="password"
              placeholder="Set password"
              required
            ></input>
          </form>
        </div>

        <div className="option-div">
          <p
            onClick={() =>
              setShow((prev) => {
                return { ...prev, delete: !prev.delete };
              })
            }
          >
            Delete temporary user data{" "}
            <span class="material-icons option-arrow">keyboard_arrow_down</span>
          </p>
          <button
            onClick={() => handleLogout()}
            style={show.delete ? { height: "4.5ch" } : { height: "0" }}
            className="option-input option-button"
          >
            Close and delete
          </button>
        </div>

        <div className="option-div">
          <p
            onClick={() =>
              setShow((prev) => {
                return { ...prev, about: !prev.about };
              })
            }
          >
            About Port{" "}
            <span class="material-icons option-arrow">keyboard_arrow_down</span>
          </p>
          <div
            style={show.about ? { height: "17.5ch" } : { height: "0" }}
            className="about-text"
          >
            Once the user submits the form, his username and password are shown
            in the browser's URL textbox, something like this:
            http://localhost:53997/Main/Index?username=zm&password=123456789&commit=Enter
            I don't want his username and password to be on display.
          </div>
        </div>
      </div>
      <div
        className={
          showOptionsMenuWindow
            ? "dark-background"
            : "dark-background hide-dark-background"
        }
        onClick={showOptionsMenuWindow && toggleShowOptionsMenu}
      ></div>
    </div>
  );
}

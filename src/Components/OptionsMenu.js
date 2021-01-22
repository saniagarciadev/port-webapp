import React, { useState } from "react";
import { useChat } from "../Context/ChatContext";
import { useHistory } from "react-router-dom";
import { useSocket } from "../Context/SocketContext";

export default function OptionsMenu(props) {
  let history = useHistory();
  const { user, setUser } = useChat();
  const { socket } = useSocket();
  const [showOptionsMenuLabel, setShowOptionsMenuLabel] = useState(false);
  const [showOptionsMenuWindow, setShowOptionsMenuWindow] = useState(false);

  const toggleShowOptionsMenu = () => {
    setShowOptionsMenuWindow((prev) => !prev);
    setShowOptionsMenuLabel(false);
  };

  const handleLogout = async () => {
    history.push("/");
    fetch(process.env.REACT_APP_PORT_SERVER + "/logout", {
      credentials: "include",
      // "Access-Control-Allow-Origin": "http://port.contact/",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
      })
      .catch((err) => console.log(err));
    if (socket) {
      await socket.emit("log out");
      await setUser(null);

      // const asyncWrapper = async () => {
      //   history.push("/");
      // };
      // asyncWrapper();
    } else {
      await setUser(null);
      history.push("/");
    }
  };

  return (
    <div>
      <div className="menu-button">
        <span
          className={`menu-label ${
            showOptionsMenuLabel ? "show-menu-label" : "hide-menu-label"
          }`}
        >
          OptionsMenu
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
        <div className="menu-login-info">Logged in as {user.username}</div>
        <p href="#">OptionsMenu</p>
        <p href="#">About</p>
        <p onClick={handleLogout} href="#">
          Log out
        </p>
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

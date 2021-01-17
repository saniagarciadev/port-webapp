import React, { useState } from "react";
import { useSession } from "../Context/SessionContext";
import { useHistory } from "react-router-dom";
import { useSocket } from "../Context/SocketContext";

export default function Menu(props) {
  let history = useHistory();
  const { user, setUser } = useSession();
  const { socket } = useSocket();
  const [showMenuLabel, setShowMenuLabel] = useState(false);
  const [showMenuWindow, setShowMenuWindow] = useState(false);

  const toggleShowMenu = () => {
    setShowMenuWindow((prev) => !prev);
    setShowMenuLabel(false);
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
            showMenuLabel ? "show-menu-label" : "hide-menu-label"
          }`}
        >
          Menu
        </span>
        <span
          onMouseEnter={() => setShowMenuLabel(true)}
          onMouseLeave={() => setShowMenuLabel(false)}
          onClick={toggleShowMenu}
          className="material-icons menu-icon"
        >
          {showMenuWindow ? "close" : "menu"}
        </span>
      </div>
      <div
        className={
          showMenuWindow
            ? "menu-window show-menu-window"
            : "menu-window hide-menu-window"
        }
      >
        <p href="#">Options</p>
        <p href="#">About</p>
        <p onClick={handleLogout} href="#">
          Log out
        </p>
      </div>
      <div
        className={
          showMenuWindow
            ? "dark-background"
            : "dark-background hide-dark-background"
        }
        onClick={showMenuWindow && toggleShowMenu}
      ></div>
    </div>
  );
}

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSession } from "../Context/SessionContext";
import { useSocket } from "../Context/SocketContext";
import Contacts from "./Contacts";
const {
  PORT_CONTACT_SERVER = "https://port-contact-server.herokuapp.com",
} = process.env;

export default function NavBar() {
  let history = useHistory();
  const { user, setUser } = useSession();
  const { socket } = useSocket();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = async () => {
    history.push("/");
    fetch(PORT_CONTACT_SERVER + "/logout", {
      credentials: "include",
      "Access-Control-Allow-Origin": "http://port.contact/",
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

  // const toggleLogoutButton = () => {
  //   setShowLogout((prev) => !prev);
  // };

  return (
    <div className="app-nav">
      {user && <Contacts />}
      {!user && <h1 className="app-title">port</h1>}
      {user && (
        <div
          onMouseEnter={() => setShowLogout(true)}
          onMouseLeave={() => setShowLogout(false)}
          className="logout-button"
        >
          <span
            className={`logout-text ${
              showLogout ? "show-logout" : "hide-logout"
            }`}
          >
            Log out
          </span>
          <span onClick={handleLogout} className=" material-icons">
            highlight_off
          </span>
        </div>
      )}
    </div>
  );
}

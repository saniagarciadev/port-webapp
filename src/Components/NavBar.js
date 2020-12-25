import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useSession } from "../Context/SessionContext";
import { useSocket } from "../Context/SocketContext";
import Connections from "./Connections";
const { PORT_CONTACT_SERVER = "http://localhost:4000" } = process.env;

export default function NavBar() {
  let history = useHistory();
  const { user, setUser } = useSession();
  const { socket } = useSocket();

  const handleLogout = () => {
    fetch(PORT_CONTACT_SERVER + "/logout", {
      credentials: "include",
      // "Access-Control-Allow-Origin": "http://localhost:4000/",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          setUser(null);
          socket.disconnect(true);
          history.push("/");
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="app-nav">
      {user && <Connections />}
      <Link to="/">
        <h1 className="app-title">Private Alpha v0.01</h1>
      </Link>
      {user && (
        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
      )}
    </div>
  );
}

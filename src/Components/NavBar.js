import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useSession } from "../Context/SessionContext";
import Connections from "./Connections";
const {
  REACT_APP_API_URL = "https://port-contact-server.herokuapp.com",
} = process.env;

export default function NavBar() {
  let history = useHistory();
  const { user, setUser } = useSession();

  const handleLogout = () => {
    fetch(REACT_APP_API_URL + "/logout", {
      credentials: "include",
      "Access-Control-Allow-Origin":
        "https://port-contact-server.herokuapp.com",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          setUser(null);
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

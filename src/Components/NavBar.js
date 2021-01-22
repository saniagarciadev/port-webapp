import React from "react";
import { useAuth } from "../Context/AuthContext";
import AddConnection from "./AddConnection";
import Contacts from "./Contacts";
import OptionsMenu from "./OptionsMenu";

export default function NavBar() {
  const { user } = useAuth();

  return (
    <div className="app-nav">
      {user && <AddConnection />}
      {user && <Contacts />}
      {!user && (
        <h1 className="app-title" onClick={() => console.log(user)}>
          port
        </h1>
      )}
      {user && <OptionsMenu />}
    </div>
  );
}

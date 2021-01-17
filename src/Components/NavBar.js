import React, { useState } from "react";
import { useSession } from "../Context/SessionContext";
import AddConnection from "./AddConnection";
import Contacts from "./Contacts";
import Menu from "./Menu";

export default function NavBar() {
  const { user } = useSession();

  return (
    <div className="app-nav">
      {user && <AddConnection />}
      {user && <Contacts />}
      {!user && <h1 className="app-title">port</h1>}
      {user && <Menu />}
    </div>
  );
}

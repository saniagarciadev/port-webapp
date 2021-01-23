import React from "react";
import AddConnection from "./AddConnection";
import Contacts from "./Contacts";
import OptionsMenu from "./OptionsMenu";

export default function NavBar() {
  return (
    <div className="app-nav">
      <AddConnection />
      <Contacts />
      <OptionsMenu />
    </div>
  );
}

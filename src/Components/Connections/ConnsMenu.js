import React from "react";
import AddConnection from "./AddConnection";
import Contacts from "./Contacts";
import { useUI } from "../../Context/UIContext";

export default function ConnsMenu() {
  const { connsOpacity, connsEvents } = useUI();
  return (
    <div
      className="conns-menu"
      style={{ opacity: connsOpacity, pointerEvents: connsEvents }}
    >
      <h3 className="menu-title">My connections</h3>
      <Contacts />
      <AddConnection />
    </div>
  );
}

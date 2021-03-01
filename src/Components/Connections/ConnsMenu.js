import React from "react";
import Contacts from "./Contacts";
import { useUI } from "../../Context/UIContext";

export default function ConnsMenu() {
  const { connsOpacity, connsEvents, toggleConns } = useUI();

  return (
    <div
      className="conns-menu"
      style={{ opacity: connsOpacity, pointerEvents: connsEvents }}
    >
      <div className="menu-title" style={{ justifyContent: "flex-end" }}>
        <h3>My connections</h3>
        <button onClick={() => toggleConns()} class="material-icons">
          clear
        </button>
      </div>
      <Contacts />
    </div>
  );
}

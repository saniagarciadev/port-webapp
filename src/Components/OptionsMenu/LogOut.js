import React from "react";
import { useSocket } from "../../Context/SocketContext";

export default function LogOut({ values }) {
  const { setUser } = values;
  const { socket } = useSocket();

  const handleLogout = async () => {
    fetch(process.env.REACT_APP_PORT_SERVER + "/logout", {
      credentials: "include",
    })
      .then(() => {
        socket.emit("log out");
        setUser(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div onClick={() => handleLogout()} className="logout-label">
      Log out
    </div>
  );
}

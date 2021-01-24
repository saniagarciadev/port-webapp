import React from "react";
import { useSocket } from "../../Context/SocketContext";

export default function LogOut({ values }) {
  const { setUser } = values;
  const { socket } = useSocket();

  const handleLogout = async () => {
    fetch(process.env.REACT_APP_PORT_SERVER + "/logout", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          socket.emit("log out");
          setUser(null);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="option-div" style={{ height: "4ch" }}>
      <div onClick={() => handleLogout()} className="option-label logout-label">
        Log out
      </div>
    </div>
  );
}

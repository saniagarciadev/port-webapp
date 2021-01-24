import React from "react";
import { useSocket } from "../../Context/SocketContext";

export default function DeleteUser({ values }) {
  const { show, setShow, user, setUser, userIsTemp, setUserIsTemp } = values;
  const { socket } = useSocket();

  const handleDelete = async () => {
    fetch(process.env.REACT_APP_PORT_SERVER + "/logout", {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          socket.emit("user deleted");
          setUser(null);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="option-div">
      <div
        className="option-label"
        onClick={() =>
          setShow((prev) => {
            return { ...prev, delete: !prev.delete };
          })
        }
      >
        Delete user{" "}
        <span className="material-icons option-arrow">keyboard_arrow_down</span>
      </div>
      <div
        onClick={() => handleDelete()}
        style={show.delete ? { height: "7ch" } : { height: "0" }}
        className="option-form"
      >
        <div className="option-info">
          (Messages you sent to other users will still still be visible for
          them.)
        </div>
        <div className="delete-user">Close and delete user</div>
      </div>
    </div>
  );
}

import React from "react";
import { useSocket } from "../../Context/SocketContext";

export default function DeleteUser({ values }) {
  const {
    show,
    handleOpenClose,
    user,
    setUser,
    userIsTemp,
    setUserIsTemp,
  } = values;
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
      <div className="option-label" onClick={() => handleOpenClose("delete")}>
        Delete user{" "}
        <span className="material-icons option-arrow">keyboard_arrow_down</span>
      </div>
      <div className={show === "delete" ? "option-content" : "hidden-content"}>
        <div onClick={() => handleDelete()} className="option-form">
          <div className="option-info">
            (Messages you sent to other users will still still be visible for
            them.)
          </div>
          <div className="delete-user">Close and delete user</div>
        </div>
      </div>
    </div>
  );
}

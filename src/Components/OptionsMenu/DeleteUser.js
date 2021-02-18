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
        <div className="option-info">
          This will delete your user data from our database. Messages you sent
          to other users will still be visible to them. They'll see your account
          as "deleted" and without a username.
        </div>
        <div onClick={() => handleDelete()} className="option-form">
          <button type="submit" className="delete-user">
            Delete login credentials and user data
          </button>
        </div>
      </div>
    </div>
  );
}

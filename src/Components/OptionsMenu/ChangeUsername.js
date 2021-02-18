import React, { useRef, useState } from "react";

export default function ChangeUsername({ values }) {
  const { show, setShow, handleOpenClose, user, setUser } = values;
  const usernameRef = useRef();
  const [usernameSuccess, setUsernameSuccess] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    const newUsername = usernameRef.current["username"].value;

    fetch(`${process.env.REACT_APP_PORT_SERVER}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ newUsername: newUsername }),
    })
      .then((res) => {
        if (res.status === 200) {
          setUser((prev) => {
            return { ...prev, username: newUsername };
          });
          setShow((prev) => {
            return { ...prev, usernameSuccess: true };
          });
          setTimeout(() => {
            setShow((prev) => {
              return { ...prev, usernameSuccess: false };
            });
          }, 5000);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="option-div">
      <div className="option-label" onClick={() => handleOpenClose("username")}>
        Change username
        <span className="material-icons option-arrow">keyboard_arrow_down</span>
      </div>
      <div
        className={show === "username" ? "option-content" : "hidden-content"}
      >
        <form ref={usernameRef} className="option-form" onSubmit={handleChange}>
          <input
            className="option-input"
            type="text"
            name="username"
            defaultValue={user.username}
            required
          ></input>
          <button className="option-input" type="submit">
            Submit
          </button>
          <span
            style={
              usernameSuccess
                ? { display: "inline-block" }
                : { display: "none" }
            }
            className="material-icons success-check"
          >
            done
          </span>
        </form>
      </div>
    </div>
  );
}

import React, { useRef } from "react";

export default function ChangeUsername({ values }) {
  const { show, setShow, user, setUser } = values;
  const usernameRef = useRef();

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
      // .then((res) => res.json())
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
      <div
        className="option-label"
        onClick={() =>
          setShow((prev) => {
            return { ...prev, username: !prev.username };
          })
        }
      >
        Change username{" "}
        <span className="material-icons option-arrow">keyboard_arrow_down</span>
      </div>
      <form
        ref={usernameRef}
        style={show.username ? { height: "4.5ch" } : { height: "0ch" }}
        className="option-form"
        onSubmit={handleChange}
      >
        <input
          className="option-input"
          type="text"
          name="username"
          defaultValue={user.username}
          required
        ></input>
        <span
          style={
            show.usernameSuccess
              ? { display: "inline-block" }
              : { display: "none" }
          }
          className="material-icons success-check"
        >
          done
        </span>
      </form>
    </div>
  );
}

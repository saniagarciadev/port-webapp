import React, { useRef } from "react";
import { useAuth } from "../../Context/AuthContext";

export default function SaveAccount({ values }) {
  const { userIsTemp, show, handleOpenClose } = values;
  const { register } = useAuth();
  const registerRef = useRef();

  const handleRegister = (e) => {
    e.preventDefault();
    const data = {
      email: registerRef.current["email"].value,
      password: registerRef.current["password"].value,
    };
    register(data);
    // console.log(data);
  };

  return (
    <div className="option-div">
      <div
        className="option-label"
        onClick={() => {
          handleOpenClose("register");
        }}
      >
        {userIsTemp
          ? "Save user and conversations"
          : "Change e-mail or password"}
        <span className="material-icons option-arrow">keyboard_arrow_down</span>
      </div>
      <div
        className={show === "register" ? "option-content" : "hidden-content"}
      >
        {userIsTemp ? (
          <div className="option-info">
            Pick up where you left off and sync your conversations across
            devices. Your data is only used to log you in and you can delete it
            using this menu whenever you like.
          </div>
        ) : (
          <div className="option-info">
            Submit both fields with the changes you want to make.
          </div>
        )}
        <form
          ref={registerRef}
          className="option-form"
          onSubmit={handleRegister}
        >
          <input
            className="option-input"
            type="email"
            name="email"
            placeholder="Enter email"
            required
          ></input>
          <input
            className="option-input"
            type="password"
            name="password"
            placeholder="Set password"
            required
          ></input>
          <button className="option-input" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useRef } from "react";
import { useAuth } from "../../Context/AuthContext";

export default function SaveAccount({ values }) {
  const { show, handleOpenClose } = values;
  const { register } = useAuth();
  const registerRef = useRef();

  const handleRegister = () => {
    // const data = {
    //   email: registerRef.current["email"].value,
    //   password: registerRef.current["password"].value,
    // };
    // register(data);
    console.log("hello");
  };

  return (
    <div className="option-div">
      <div
        className="option-label"
        onClick={() => {
          handleOpenClose("register");
        }}
      >
        Save user and conversations{" "}
        <span className="material-icons option-arrow">keyboard_arrow_down</span>
      </div>
      <div
        className={show === "register" ? "option-content" : "hidden-content"}
      >
        <form
          ref={registerRef}
          className="option-form"
          onSubmit={() => handleRegister()}
        >
          <div className="option-info">
            Pick up where you left off and instantaneously sync your
            conversations accross devices.
          </div>
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
        </form>
      </div>
    </div>
  );
}

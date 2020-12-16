import React, { useRef, useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function LogIn() {
  const { user, setUser } = useContext(UserContext);
  const logInFormRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    //Check all fields are correctly filled out

    const loginData = {
      username: logInFormRef.current["username"].value,
      password: logInFormRef.current["password"].value,
    };
    // console.log(loginData);

    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));

    logInFormRef.current.reset();
  };

  return (
    <form className="login-form" ref={logInFormRef} onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="text" name="username" placeholder="Username"></input>
      <input type="password" name="password" placeholder="Password"></input>
      <button type="submit">Submit</button>
    </form>
  );
}

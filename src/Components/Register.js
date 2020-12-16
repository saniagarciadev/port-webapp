import React, { useRef, useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function Register() {
  const registerFormRef = useRef();
  const { user, setUser } = useContext(UserContext);

  const registerNewUser = (e) => {
    e.preventDefault();
    //Check all fields are correctly filled out

    const userData = {
      username: registerFormRef.current["username"].value,
      email: registerFormRef.current["email"].value,
      password: registerFormRef.current["password"].value,
      contacts: [],
      data: [],
    };
    // console.log(data);

    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));

    registerFormRef.current.reset();
  };

  return (
    <form
      className="register-form"
      ref={registerFormRef}
      onSubmit={registerNewUser}
    >
      <h2>New user</h2>
      <div>
        port.contact/
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
        ></input>
      </div>

      <input type="email" name="email" placeholder="E-mail:" required></input>
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
      ></input>
      <button type="submit">Create</button>
    </form>
  );
}

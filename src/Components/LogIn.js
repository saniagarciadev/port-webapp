import React from "react";

export default function LogIn() {
  return (
    <form className="login-form">
      <h2>Login</h2>
      <input
        type="text"
        name="username"
        placeholder="Username or E-mail"
      ></input>
      <input type="password" name="password" placeholder="Password"></input>
      <button type="submit">Submit</button>
    </form>
  );
}

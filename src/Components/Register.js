import React from "react";

export default function Register() {
  return (
    <form className="register-form">
      <h2>New user</h2>
      <div>
        port.contact/
        <input type="text" name="username" placeholder="Username"></input>
      </div>

      <input type="text" name="eMail" placeholder="E-mail:"></input>
      <input type="password" name="password" placeholder="Password"></input>
      <button type="submit">Create</button>
    </form>
  );
}

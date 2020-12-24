import React, { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useSession } from "../Context/SessionContext";

export default function Register() {
  let history = useHistory();
  const registerFormRef = useRef();
  const { setUser } = useSession();
  // const { auth, setAuth } = useContext(AuthContext);

  // HTML FORM SEND
  // <Form action="/subdomain" method="post">
  // <input type="text" name="username"/>

  const registerNewUser = (e) => {
    e.preventDefault();
    //Check all fields are correctly filled out

    const userData = {
      username: registerFormRef.current["username"].value,
      email: registerFormRef.current["email"].value,
      password: registerFormRef.current["password"].value,
    };

    console.log(userData);

    fetch("https://port-contact-server.herokuapp.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "https://port.contact/",
      credentials: "include",
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          setUser(res.user);
          history.push("/chat");
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => console.log(err));

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

      <input type="email" name="email" placeholder="E-mail" required></input>
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

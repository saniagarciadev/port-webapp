import React, { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import { useSession } from "../Context/SessionContext";

export default function LogIn() {
  const { setUser } = useSession();
  // const { auth, setAuth } = useContext(AuthContext);
  const logInFormRef = useRef();
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    //Check all fields are correctly filled out

    const loginData = {
      username: logInFormRef.current["username"].value,
      password: logInFormRef.current["password"].value,
    };
    console.log(loginData);

    fetch("https://port-contact-server.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin":
        "https://port-contact-server.herokuapp.com",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          console.log(res.user);
          // console.log(`Logged in user: ${res.user}`);
          setUser(res.user);
          history.push("/chat");
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => console.log(err));

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

// import React, { useRef, useContext } from "react";
// import { useHistory } from "react-router-dom";
// import { useSession } from "../Context/SessionContext";
// import { useSocket } from "../Context/SocketContext";

// export default function LogIn() {
//   const { user, setUser, createContactsList } = useSession();
//   // const { auth, setAuth } = useContext(AuthContext);
//   const logInFormRef = useRef();
//   const history = useHistory();
//   const { startSocketConnection } = useSocket();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     //Check all fields are correctly filled out

//     const loginData = {
//       username: logInFormRef.current["username"].value,
//       password: logInFormRef.current["password"].value,
//     };
//     // console.log(loginData);

//     fetch("http://localhost:4000/login", {
//       method: "POST",
//       body: JSON.stringify(loginData),
//       headers: {
//         "Content-Type": "application/json",
//       },
//       "Access-Control-Allow-Origin": "http://localhost:4000/",
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         if (res.success === true) {
//           // console.log(res.user);
//           // console.log(`Logged in user: ${res.user.username}`);
//           setUser(res.user);
//           createContactsList(res.user.connections);
//           startSocketConnection(res.user);
//           return true;
//         } else {
//           console.log(res.message);
//           return false;
//         }
//       })
//       .then((res) => {
//         if (res) {
//           return history.push("/chat");
//         }
//       })
//       .catch((err) => console.log(err));

//     logInFormRef.current.reset();
//   };

//   return (
//     <form className="login-form" ref={logInFormRef} onSubmit={handleLogin}>
//       <h2>Login</h2>
//       <input type="text" name="username" placeholder="Username"></input>
//       <input type="password" name="password" placeholder="Password"></input>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

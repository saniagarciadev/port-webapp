import React, { useState, useEffect, useRef, useMemo } from "react";
import { Redirect, Route, Link, useParams } from "react-router-dom";
import "./App.css";
import Chat from "./Components/Chat";
import Register from "./Components/Register";
import LogIn from "./Components/LogIn";
import { UserContext } from "./Context/UserContext";

function App() {
  // const [usersList, setUsersList] = useState([]);
  const [user, setUser] = useState("");
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    fetch("http://localhost:4000/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);

  // useEffect(() => {
  //   console.log(usersList);
  // }, [usersList]);

  const setPath = (rp) => {
    // if () {
    //   return <Chat userId={user._id} usersList={usersList} />;
    // } else {
    //   return <Redirect to="/" />;
    // }
  };

  return (
    <div className="App">
      <UserContext.Provider value={userValue}>
        <div className="app-nav">
          <Link to="/">
            <h1 className="app-title">Port</h1>
          </Link>
        </div>
        <Route exact path="/">
          <div className="user-selection">
            <LogIn />
            <Register />
          </div>
        </Route>
        <Route
          exact
          path="/:username"
          render={(routeProps) => setPath(routeProps)}
        />
      </UserContext.Provider>
    </div>
  );
}

export default App;

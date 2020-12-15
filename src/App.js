import React, { useState, useEffect, useRef, useMemo } from "react";
import { Redirect, Route, Link, useParams } from "react-router-dom";
import "./App.css";
import Chat from "./Components/Chat";
import Register from "./Components/Register";
import LogIn from "./Components/LogIn";
import { UserContext } from "./Context/UserContext";

function App() {
  const [usersList, setUsersList] = useState([]);
  const newUserName = useRef();
  const [user, setUser] = useState("");
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  // const params = useParams();

  useEffect(() => {
    fetch("http://localhost:4000/users/")
      .then((res) => res.json())
      .then((res) => setUsersList(res));
  }, []);

  // useEffect(() => {
  //   console.log(usersList);
  // }, [usersList]);

  const createNewUser = () => {
    const newUser = {
      name: newUserName.current["name-input"].value,
      contacts: [],
      data: [],
    };
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((res) => setUsersList((prev) => [...prev, res]))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLogIn = (u) => {
    setUser(u);
    // history.push(u.name);
  };

  const deleteUser = (user) => {
    fetch("http://localhost:4000/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => setUsersList(res))
      .catch((error) => {
        console.error("Error:", error);
      });
    // const index = usersList.indexOf(user);
    // setUsersList((prev) => prev.slice(index, 1));
  };

  const setPath = (rp) => {
    const pathName = rp.match.params.userName;
    const userExists = usersList.find((user) => user.name === pathName);
    // const idx = usersList[userExists].name;
    // console.log(usersList[userExists].name);

    if (userExists) {
      setUser(userExists);
      return <Chat userId={user._id} usersList={usersList} />;
    } else {
      return <Redirect to="/" />;
    }
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
            <Register />
            <LogIn />
            <h2>Debug</h2>
            <form ref={newUserName} onSubmit={createNewUser}>
              <input
                name="name-input"
                type="text"
                placeholder="Auto create"
              ></input>
              <button>Submit</button>
            </form>
            {usersList.map((u) => (
              <p>
                <Link to={u.name}>
                  <button
                    className="user-button"
                    onClick={() => handleLogIn(u)}
                  >
                    {u.name}
                  </button>
                </Link>
                <button
                  className="delete-user-button"
                  onClick={() => deleteUser(u)}
                >
                  x
                </button>
              </p>
            ))}
          </div>
        </Route>
        <Route
          exact
          path="/:userName"
          render={(routeProps) => setPath(routeProps)}
        />
      </UserContext.Provider>
    </div>
  );
}

export default App;

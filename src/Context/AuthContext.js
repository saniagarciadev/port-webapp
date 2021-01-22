import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    // if (document.cookie) {
    fetch(process.env.REACT_APP_PORT_SERVER + "/auth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.statusCode === 204) {
          return;
        } else {
          res.json();
        }
      })
      .then((res) => {
        setUser(res.user);
      })
      .catch((err) => console.log(err));
    // }
  }, []);

  const login = (data) => {
    fetch(`${process.env.REACT_APP_PORT_SERVER}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      // "Access-Control-Allow-Origin": "http://port.contact/",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setUser(res.user);
        } else {
        }
      })
      .catch((err) => console.log(err));
  };

  const signUp = (data) => {
    fetch(`${process.env.REACT_APP_PORT_SERVER}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // "Access-Control-Allow-Origin": "http://port.contact/",
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setUser(res.user);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
        debugger;
      });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, signUp }} {...props} />
  );
}

const useAuth = () => React.useContext(AuthContext);
export { AuthProvider, useAuth };

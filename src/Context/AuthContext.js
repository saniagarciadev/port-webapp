import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    // if (document.cookie) {
    fetch(process.env.REACT_APP_PORT_SERVER + "/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      //   .then((res) => res.json())
      //   .then((data) => console.log(data))
      .then((res) => {
        if (res.status === 204) {
          return false;
        } else if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        if (res) {
          console.log(res);
          setUser(res);
        }
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
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log(res);
          return false;
        }
      })
      .then((res) => {
        if (res) {
          return setUser(res);
        } else {
          return;
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

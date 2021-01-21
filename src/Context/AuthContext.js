import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

function AuthProvider(props) {
  useEffect(() => {
    fetch("process.env.REACT_APP_PORT_SERVER/", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          // console.log(res.user);
          setUser(res.user);
          createContactsList(res.user.connections);
          return history.push("/chat");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const login = () => {}; // make a login request
  const register = () => {}; // register the user
  const logout = () => {}; // clear the token in localStorage and the user data

  return (
    <AuthContext.Provider
      value={{ data, login, logout, register }}
      {...props}
    />
  );
}

const useAuth = () => React.useContext(AuthContext);
export { AuthProvider, useAuth };

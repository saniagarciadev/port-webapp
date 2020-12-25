import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const SessionContext = React.createContext();

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState({
    connection: {},
    messages: [],
  });
  let history = useHistory();

  useEffect(() => {
    if (!user) {
      fetch("http://localhost:4000/", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        "Access-Control-Allow-Origin": "http://localhost:4000/",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === true) {
            console.log(res.user);
            setUser(res.user);
            history.push("/chat");
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const values = { user, setUser, conversation, setConversation };

  return (
    <SessionContext.Provider value={values}>{children}</SessionContext.Provider>
  );
}

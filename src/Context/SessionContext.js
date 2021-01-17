import React, { useContext, useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

const SessionContext = React.createContext();

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [contactsList, setContactsList] = useState(null);
  const [currConversation, setCurrConversation] = useState("");
  const [theirLiveText, setTheirLiveText] = useState("");
  // let history = useHistory();

  const createContactsList = (contactsArray) => {
    const startingList = contactsArray.map((contact) => {
      const contObj = {
        _id: contact._id,
        username: contact.username,
        isLive: false,
        isOnline: false,
        roomId: "",
      };
      return contObj;
    });
    setContactsList(startingList);
  };

  const updateOnlineStatus = (userData) => {
    console.log(
      `Online status for user ${userData.userId}: ${userData.isOnline}`
    );
    if (contactsList) {
      const updatedList = contactsList.map((contact) => {
        if (contact._id === userData.userId) {
          const isOnline = userData.isOnline;
          const updatedContact = {
            ...contact,
            isOnline,
          };
          return updatedContact;
        }
        return contact;
      });

      setContactsList(updatedList);
    }
  };

  const updateLiveStatus = (userData, live) => {
    // console.log(`Live status for user ${userData.id}: ${userData.isLive}`);
    const updatedList = contactsList.map((contact) => {
      if (contact._id === userData.userId) {
        const liveStatus = live ? true : false;
        const updatedContact = {
          ...contact,
          isLive: liveStatus,
          isOnline: true,
          roomId: userData.roomId,
        };
        console.log(`contact live status ${liveStatus}`);
        return updatedContact;
      }
      return contact;
    });
    setContactsList(updatedList);
  };

  // useEffect(() => {
  //   if (!user) {
  //     fetch(process.env.REACT_APP_PORT_SERVER, {
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       "Access-Control-Allow-Origin": process.env.REACT_APP_PORT_SERVER,
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         if (res.authenticated === false) {
  //           console.log("Start session to enter chat.");
  //           history.push("/");
  //         } else {
  //           setUser(res.user);
  //           createContactsList(res.user.connections);
  //           console.log(
  //             `User ${res.user.username} has been correctly authenticated.`
  //           );
  //           history.push("/chat");
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!user) {
  //     fetch("process.env.REACT_APP_PORT_SERVER/", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: { "Content-Type": "application/json" },
  //       "Access-Control-Allow-Origin": "process.env.REACT_APP_PORT_SERVER/",
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         if (res.success === true) {
  //           // console.log(res.user);
  //           setUser(res.user);
  //           createContactsList(res.user.connections);
  //           return history.push("/chat");
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, []);

  const values = {
    user,
    setUser,
    conversation,
    setConversation,
    contactsList,
    createContactsList,
    updateOnlineStatus,
    updateLiveStatus,
    currConversation,
    setCurrConversation,
    theirLiveText,
    setTheirLiveText,
  };

  return (
    <SessionContext.Provider value={values}>{children}</SessionContext.Provider>
  );
}

import React, { useState, useEffect } from "react";

const UIContext = React.createContext();

function UIProvider({ children }) {
  const [connsOpacity, setConnsOpacity] = useState(0);
  const [connsEvents, setConnsEvents] = useState("none");
  const [optsOpacity, setOptsOpacity] = useState(0);
  const [optsEvents, setOptsEvents] = useState("none");
  const [chatOpacity, setChatOpacity] = useState(1);
  const [appPosition, setAppPosition] = useState(0);
  const [chatOpen, setChatOpen] = useState(true);
  const [showAddConn, setShowAddConn] = useState(false);

  const toggleConns = () => {
    setAppPosition((prev) => {
      return prev === 0 ? 25 : 0;
    });
    setConnsOpacity((prev) => {
      return prev === 0 ? 1 : 0;
    });
    setConnsEvents((prev) => {
      return prev === "none" ? "auto" : "none";
    });
    setChatOpacity((prev) => {
      return prev === 0.2 ? 1 : 0.2;
    });
    setChatOpen((prev) => {
      return !prev;
    });
    showAddConn && setShowAddConn(false);
  };

  const toggleOpts = () => {
    setAppPosition((prev) => {
      return prev === 0 ? -25 : 0;
    });
    setOptsOpacity((prev) => {
      return prev === 0 ? 1 : 0;
    });
    setOptsEvents((prev) => {
      return prev === "none" ? "auto" : "none";
    });
    setChatOpacity((prev) => {
      return prev === 0.2 ? 1 : 0.2;
    });
    setChatOpen((prev) => {
      return !prev;
    });
  };

  return (
    <UIContext.Provider
      value={{
        appPosition,
        setAppPosition,
        connsOpacity,
        setConnsOpacity,
        connsEvents,
        setConnsEvents,
        optsOpacity,
        setOptsOpacity,
        optsEvents,
        setOptsEvents,
        chatOpacity,
        setChatOpacity,
        chatOpen,
        setChatOpen,
        toggleConns,
        toggleOpts,
        showAddConn,
        setShowAddConn,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

const useUI = () => React.useContext(UIContext);
export { UIProvider, useUI };

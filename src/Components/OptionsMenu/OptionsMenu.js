import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import ChangeUsername from "./ChangeUsername";
import SaveAccount from "./SaveAccount";
import LogOut from "./LogOut";
import DeleteUser from "./DeleteUser";

export default function OptionsMenu(props) {
  const { user, setUser, userIsTemp, setUserIsTemp } = useAuth();
  const [show, setShow] = useState(null);
  const [showOptionsMenuLabel, setShowOptionsMenuLabel] = useState(false);
  const [showOptionsMenuWindow, setShowOptionsMenuWindow] = useState(false);

  const toggleShowOptionsMenu = () => {
    show && setShow(null);
    setShowOptionsMenuWindow((prev) => !prev);
    setShowOptionsMenuLabel(false);
  };

  const handleOpenClose = (option) => {
    setShow((prev) => (prev === option ? null : option));
    console.log(show);
  };

  return (
    <div>
      <div className="options-button">
        <span
          className={`options-label ${
            showOptionsMenuLabel ? "show-options-label" : "hide-options-label"
          }`}
        >
          Options
        </span>
        <span
          onMouseEnter={() => setShowOptionsMenuLabel(true)}
          onMouseLeave={() => setShowOptionsMenuLabel(false)}
          onClick={toggleShowOptionsMenu}
          className="material-icons options-icon"
        >
          {showOptionsMenuWindow ? "close" : "menu"}
        </span>
      </div>
      <div
        className={
          showOptionsMenuWindow
            ? "options-window show-options-window"
            : "options-window hide-options-window"
        }
      >
        <div className="options-login-info">
          {userIsTemp ? "Temporary user:" : "Logged in:"} {user.username}
        </div>

        <ChangeUsername values={{ user, setUser, show, handleOpenClose }} />

        {userIsTemp && (
          <SaveAccount values={{ user, setUser, show, handleOpenClose }} />
        )}

        {!userIsTemp && (
          <LogOut
            values={{
              user,
              setUser,
              show,
              handleOpenClose,
              userIsTemp,
              setUserIsTemp,
            }}
          />
        )}

        <DeleteUser values={{ user, setUser, show, handleOpenClose }} />

        <div className="option-div">
          <div
            className="option-label"
            onClick={() => handleOpenClose("about")}
          >
            About{" "}
            <span className="material-icons option-arrow">
              keyboard_arrow_down
            </span>
          </div>
          <div
            className={show === "about" ? "option-content" : "hidden-content"}
          >
            <div className="about-text">
              Port is a communication system currently in development.
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          showOptionsMenuWindow
            ? "dark-background"
            : "dark-background hide-dark-background"
        }
        onClick={showOptionsMenuWindow && toggleShowOptionsMenu}
      ></div>
    </div>
  );
}

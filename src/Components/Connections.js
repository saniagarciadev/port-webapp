import React from "react";
import { useSession } from "../Context/SessionContext";
import AddConnection from "./AddConnection";
const { PORT_CONTACT_SERVER = "http://localhost:4000" } = process.env;

export default function Connections(props) {
  const { user, setUser, setConversation } = useSession();

  // const { messages, setMessages } = useContext(ChatContext.messages);
  // const { recipientId, setPartnerId } = useContext(ChatContext.recipientId);
  // const [contacts, setContacts] = useState([]);

  const openConnection = (connection) => {
    console.log(connection);

    const connectionId = connection._id;

    fetch(PORT_CONTACT_SERVER + "/messages/" + connectionId, {
      method: "GET",
      credentials: "include",
      // "Access-Control-Allow-Origin": "http://localhost:4000/",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === false) {
          console.log("Error fetching messages.");
        } else {
          setConversation({
            connection: connection,
            messages: res.messages,
          });
        }
      });
  };

  const deleteConnection = (c) => {
    fetch("http://localhost:4000/connections/" + c._id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          setUser((prev) => (prev.connections.contacts = res.updatedContacts));
        } else {
          console.log(res.message);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
    // console.log(c);
    // const index = usersList.indexOf(user);
    // setUsersList((prev) => prev.slice(index, 1));
  };

  return (
    <div className="connections">
      {user.connections &&
        user.connections.map((contact, index) => (
          <div key={index} className="contact">
            <button onClick={() => openConnection(contact)}>
              {contact.username}
            </button>
            <button
              className="delete-user-button"
              onClick={() => deleteConnection(contact)}
            >
              x
            </button>
          </div>
        ))}
      <AddConnection />
    </div>
  );
}

import "./all-users.css";
import { ChatPerson, SwitchChat, personLogo } from "../../../utils/import";
import { getUser } from "../../../utils/localStorage";
import { ConversationContext } from "../../context/ConversationConext";
import { useContext } from "react";
import "../chat-person/chat-person.css";

export const AllUsers = ({ allUsers }) => {
  const { conversation, setConversation } = useContext(ConversationContext);

  return (
    <div className="users__container">
      {allUsers &&
        allUsers.map((user) => <ChatPerson key={user._id} chatUser={user} />)}
    </div>
  );
};

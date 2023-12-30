import { useContext } from "react";
import { personLogo } from "../../../utils/import";
import "./chat-person.css";
import { ConversationContext } from "../../context/ConversationConext";
import { fetchChatConversation } from "../../api/api";

export const ChatPerson = ({ chatUser }) => {
  const { setConversation } = useContext(ConversationContext);

  const startConveration = async () => {
    try {
      const response = await fetchChatConversation(chatUser._id);
      // set convesation data
      setConversation(response);
      console.log("response to set conversation", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat__person" onClick={startConveration}>
      <img src={personLogo} alt="person" className="img" />
      <div className="img_left">
        <h2 className="person__name">{chatUser.name}</h2>
        <p className="person__text">name: some text</p>
      </div>
    </div>
  );
};

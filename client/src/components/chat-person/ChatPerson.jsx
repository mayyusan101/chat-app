import { personLogo } from "../../../utils/import";
import { fetchChatConversationFromDB } from "../../api/api";
import { setConversation } from "../../store/features/conversationSlice";
import { setMessages } from "../../store/features/messageSlice";
import { useDispatch } from "react-redux";
import "./chat-person.css";


export const ChatPerson = ({ chatUser }) => {
  const dispatch = useDispatch();

  const startConveration = async () => {
    try {
      const response = await fetchChatConversationFromDB(chatUser._id);
      dispatch(setConversation(response.data)); // set conversation data to store
      dispatch(setMessages(response.messages)); // set messages to store
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

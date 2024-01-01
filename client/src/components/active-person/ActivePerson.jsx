import { useDispatch } from "react-redux";
import { personLogo } from "../../../utils/import";
import { fetchChatConversationFromDB } from "../../api/api";
import { setConversation } from "../../store/features/conversationSlice";
import { setMessages } from "../../store/features/messageSlice";
import "./active-person.css";


export const ActivePerson = ({chatUser}) => {
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
    <div className="active__person" onClick={startConveration}>
      <div className="active__img">
        <img src={personLogo} alt="person" />
        <div className="active__light"></div>
      </div>
      <div className="active__name">
        <h2 className="person__name">{chatUser?.name}</h2>
      </div>
      
    </div>
  );
};

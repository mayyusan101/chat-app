import { ChatPerson } from "../../../utils/import"
import { useSelector } from "react-redux";
import "./all-users.css";


export const AllUsers = () => {
  const allUsers = useSelector(state => state.chatUsers.allUsers); // reterive all users from store

  return (
    <div className="users__container">
      {allUsers  &&
        allUsers.map((user) => <ChatPerson key={user._id} chatUser={user} />)}
    </div>
  );
};

import { useSelector } from "react-redux";
import { ActivePerson } from "../../../utils/import";
import "./chat.css";


export const ActiveUsers = () => {
  const onlineUsers = useSelector(state => state.chatUsers.onlineUsers);

  return (
    <div className="chat__active">
      <h3 className="active__title">Actives</h3>
      <hr className="active__line" />
      <div className="active__container">
       {onlineUsers.length > 0 && onlineUsers.map(user => ( <ActivePerson key={user._id} chatUser={user}/>))}
      </div>
    </div>
  );
};

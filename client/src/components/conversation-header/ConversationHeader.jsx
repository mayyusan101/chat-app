import { useEffect, useState, useContext } from "react";
import { personLogo } from "../../../utils/import";
import { useDispatch, useSelector } from "react-redux";
import { clearConversation } from "../../store/features/conversationSlice";
import { leaveRoomToDB, removeRoomToDB } from "../../api/api";
import { leaveRoom } from "../../store/features/chatUsersSlice";
import { AuthContext } from "../../context/AuthContext";
import "./conversation.css";


export const ConversationHeader = () => {
  const conversation = useSelector(state => state.conversation);
  const onlineUsers = useSelector(state => state.chatUsers.onlineUsers);

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [online, setOnline] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

 const currentUser = useContext(AuthContext);

  useEffect(() => {
    if(conversation.isRoom === true){
      const roomName = conversation.name;
      setName(roomName); // display room name
      setOnline(false);
      if(conversation.roomAdmin._id === currentUser._id){
        setIsAdmin(true); // admin user
      }else{
        setIsAdmin(false); // member user
      }
    }else{
      const userName = conversation?.users[0].name; // display chat user name
      setName(userName);
      // check user is online or not
      const userId = conversation?.users[0]._id;
      const isExist = onlineUsers?.find(user => user._id == userId);
      isExist? setOnline(true) : setOnline(false);
    }
  }, [conversation,onlineUsers]);

  // leave room
  const handleLeaveRoom = async() => {
    if(conversation.isRoom === true){
      const roomId = conversation._id;
      dispatch(clearConversation()); // clear conversation
      dispatch(leaveRoom(roomId));
      await leaveRoomToDB({
        roomId: roomId
      });
    }
  }
  // delete room if user is admin
  const handleRemoveRoom = async() => {
    if(conversation.isRoom === true && isAdmin){
      const roomId = conversation._id;
      dispatch(clearConversation()); // clear conversation
      dispatch(leaveRoom(roomId));
      await removeRoomToDB({
        roomId: roomId
      });
    }
  }


  return (
    <div className="conversation__header">
      <div className="conversation__person">
        <div className="img_left">
          <img src={personLogo} alt="person" className="img" />
          <div className="">
            <h2 className="person__name">{name}</h2>
            {!conversation.isRoom && <p className="person__text">{online ? "online" : "offline"}</p>}
          </div>
        </div>
        {
          conversation.isRoom && (
          <div className="leave__room__btn">
            {isAdmin ? <button onClick={handleRemoveRoom}>Remove</button> : <button onClick={handleLeaveRoom}>Leave</button>}
          </div>)
        }
      </div>
    </div>
  );
};

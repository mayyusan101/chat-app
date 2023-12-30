import { useContext, useEffect, useState } from "react";
import { personLogo } from "../../../utils/import";
import "./conversation.css";
import { ConversationContext } from "../../context/ConversationConext";
import { fetchAllRooms, leaveRoom } from "../../api/api";
import { getUser } from "../../../utils/localStorage";

export const ConversationHeader = ({activeUsers, setAllRooms}) => {
  const { conversation, setConversation } = useContext(ConversationContext);
  const [ online, setOnline ] = useState(false);
  const [ name, setName ] = useState("");

  const currentUser = getUser();
  useEffect(() => {
    if(conversation.data?.isRoom === true){
      const roomName = conversation.data.name;
      setName(roomName);
      setOnline(false);
    }else{
      const userName = conversation.data?.users[0].name;
      setName(userName);
      // check online or not
      const usersId = conversation.data?.users[0]._id;
      const isExist = activeUsers?.find(user => user._id === usersId);
      console.log({isExist, userName});
      if(isExist) setOnline(true);
    }
  }, [conversation,activeUsers]);

  const fetchRoom = async() => {
    const rooms = await fetchAllRooms(); // fetch rooms
    setAllRooms(rooms);
    return rooms;
  }
  
  const handleLeaveRoom = async() => {
    if(conversation.data?.isRoom===true){
      setConversation(null); // clear conversation
      await leaveRoom({
        roomId: conversation.data._id
      });
      await fetchRoom();
    }
  }


  return (
    <div className="conversation__header">
      <div className="conversation__person">
        <div className="img_left">
          <img src={personLogo} alt="person" className="img" />
          <div className="">
            <h2 className="person__name">{name}</h2>
            {!conversation.data.isRoom && <p className="person__text">{online ? "online" : "offline"}</p>}
          </div>
        </div>
        <div className="leave__room__btn" onClick={handleLeaveRoom}>
          <button>Leave</button>
        </div>
      </div>
    </div>
  );
};

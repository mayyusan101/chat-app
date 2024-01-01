import { useContext, useEffect } from "react";
import { personLogo } from "../../../utils/import";
import { fetchRoomConversationFromDB } from "../../api/api";
import socket from "../../services/socketService";
import { useDispatch } from "react-redux";
import { setConversation } from "../../store/features/conversationSlice";
import { setMessages } from "../../store/features/messageSlice";
import { AuthContext } from "../../context/AuthContext";
import "./room-chat.css";


export const RoomChat = ({room}) => {
  const currentUser = useContext(AuthContext);
  const dispatch = useDispatch();

  const fetchConversation = async () => {
    try {
      const response = await fetchRoomConversationFromDB(room._id);
      dispatch(setConversation(response.data)); // set conversation data to store
      dispatch(setMessages(response.messages)); // set messages to store
    } catch (error) {
      console.log(error);
    }
  };
  // socket
  useEffect(() => {
    socket.emit("roomChat",{
      roomName: room.name,
      userId: currentUser._id,
      roomId: room._id
    });
  },[]);
  
  return (
    <div className="room__person" onClick={fetchConversation}>
      <img src={personLogo} alt="person" className="img" />
      <div className="img_left">
        <h2 className="person__name">{room.name}</h2>
        <p className="person__text">latest: some text</p>
      </div>
    </div>
  );
};

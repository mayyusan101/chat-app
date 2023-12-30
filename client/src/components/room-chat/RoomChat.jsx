import { useContext, useEffect } from "react";
import { personLogo } from "../../../utils/import";
import { fetchRoomConversation } from "../../api/api";
import "./room-chat.css";
import { ConversationContext } from "../../context/ConversationConext";
import socket from "../../services/socketService";
import { getUser } from "../../../utils/localStorage";

export const RoomChat = ({room}) => {
  const { setConversation } = useContext(ConversationContext);
  const currentUser = getUser();
  const fetchConversation = async () => {
    try {
      const response = await fetchRoomConversation(room._id);
      // set convesation data
      console.log('fetchRoomConversation response', response);
      setConversation({ ...response });
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
  },[])
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

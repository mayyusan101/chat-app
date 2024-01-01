import {
  AllUsers,
  Conversation,
  ActiveUsers,
  SwitchChat,
  AllRooms,
  CreateRoom,
} from "../../../utils/import";
import { useContext, useEffect, useState } from "react";
import {
  fetchAllRoomsFromDB,
  fetchAllUsersFromDB,
} from "../../api/api";
import socket from "../../services/socketService";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers, setAllRooms, setOnlineUsers } from "../../store/features/chatUsersSlice";
import { AuthContext } from "../../context/AuthContext";
import "./chat.css";

const CHAT_TYPE = {
  chat: "chat",
  room: "room"
}


export const Chat = () => {

  const [chatType, setChatType] = useState(CHAT_TYPE.chat);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = useContext(AuthContext);
  const conversationId = useSelector(state => state.conversation._id);
  const dispatch = useDispatch();

  // fetch all users
  useEffect(() => {
    const fetchUsers = async() => {
      const users = await fetchAllUsersFromDB(); // fetch users
      dispatch(setAllUsers(users)); // set all users to store
      return users;
    }
    const fetchRooms = async() => {
      const rooms = await fetchAllRoomsFromDB(); // fetch rooms
      dispatch(setAllRooms(rooms)); // set all rooms to store
      return rooms;
    }
    fetchUsers(); // initial fetch users
    fetchRooms(); // initial fetch rooms
  
    socket.emit("userConnected", currentUser._id);
    socket.on("connectedUsers", async(connectedUsersArray) => {
      await fetchUsers(); // refetch users
      dispatch(setOnlineUsers(connectedUsersArray)); // set online users to store
    });  
    socket.on("roomChat", async() => {
      await fetchRooms(); // refetch rooms
    });
  }, []);

  const handleChatType = () => {
    setChatType((prev) => (prev === "chat" ? "room" : "chat"));
  };

  // z-index for conversation box when model is open
  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div>
        <div className="chat__container">
          <div className="chat__side">
            <SwitchChat chatType={chatType} onSwitchChatType={handleChatType} />
            {chatType === CHAT_TYPE.chat && (<AllUsers/>)}
            {chatType === CHAT_TYPE.room && (
              <>
              <CreateRoom onModalOpen={handleModalOpen}/>
              <AllRooms/>
              </>
            )}
          </div>
          <div className="chat__conversation">
            {conversationId ? (
              <Conversation isModalOpen={isModalOpen}/>
            ) : (
              <div className="open__chat">
                <h1>Open chat!</h1>
              </div>
            )}
          </div>
          <ActiveUsers/>
        </div>
    </div>
  );
};

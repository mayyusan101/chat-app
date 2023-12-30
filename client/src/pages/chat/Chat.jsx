import {
  AllUsers,
  Conversation,
  ActiveUsers,
  SwitchChat,
  AllRooms,
  CreateRoom,
} from "../../../utils/import";
import "./chat.css";
import { useEffect, useState } from "react";
import {
  fetchAllRooms,
  fetchAllUsers,
} from "../../api/api";
import socket from "../../services/socketService";
import { getUser } from "../../../utils/localStorage";
import { ConversationContextProvider } from "../../context/ConversationConext";

const CHAT_TYPE = {
  chat: "chat",
  room: "room"
}

export const Chat = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allRooms, setAllRooms] = useState(null);
  const [conversation, setConversation] = useState(null); // chat details
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatType, setChatType] = useState(CHAT_TYPE.chat);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = getUser();

  // fetch all users
  useEffect(() => {
    const fetchUsers = async() => {
      const users = await fetchAllUsers(); // fetch users
      setAllUsers(users);
      return users;
    }
    const fetchRooms = async() => {
      const rooms = await fetchAllRooms(); // fetch rooms
      setAllRooms(rooms);
      return rooms;
    }
    fetchUsers(); // initial fetch users
    fetchRooms(); // initial fetch rooms

    socket.emit("userConnected", currentUser._id);
    socket.on("connectedUsers", async(connectedUsers) => {
      const fetchedUsers = await fetchUsers(); // refetch users
      const connectedUserIds = {};
      const users = [];
      fetchedUsers.map((user) => {
        const isExist = connectedUsers.includes(user._id) && !connectedUserIds.hasOwnProperty(user._id);
        if (isExist) {
          users.push(user);
          connectedUserIds[user._id] = user.name;
        }
      });
      setOnlineUsers(users); // refresh onlineUsers
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
      <ConversationContextProvider value={{ conversation, setConversation }}>
        <div className="chat__container">
          <div className="chat__side">
            <SwitchChat chatType={chatType} onSwitchChatType={handleChatType} />
            {chatType === CHAT_TYPE.chat && (<AllUsers allUsers={allUsers} />)}
            {chatType === CHAT_TYPE.room && (
              <>
              <CreateRoom allUsers={allUsers} onModalOpen={handleModalOpen} />
              <AllRooms allUsers={allUsers} allRooms={allRooms} />
              </>
            )}
          </div>
          <div className="chat__conversation">
            {conversation ? (
              <Conversation activeUsers={onlineUsers} setAllRooms={setAllRooms} isModalOpen={isModalOpen} />
            ) : (
              <div className="open__chat">
                <h1>Open chat!</h1>
              </div>
            )}
          </div>
          <ActiveUsers activeUsers={onlineUsers}/>
        </div>
      </ConversationContextProvider>
    </div>
  );
};

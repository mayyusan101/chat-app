import api from "../services/apiService";

const fetchAllUsers = async () => {
  try {
    const response = await api('/users');
      return response.data.data.users;
  } catch (error) {
    console.error("Error fetching users data:", error);
    throw error;
  }
};

const fetchAllRooms = async () => {
  try {
    const response = await api.get('/rooms');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching rooms data:", error);
    throw error;
  }
};

// send message
const postMessage = async ({ message, conversationId }) => {
  try {
    const response = await api.post(
      '/messages',
      {
        message,
        conversationId,
      }
    );
    const res = response.data;
    return response.data;
  } catch (error) {
    console.error("Error fetching message data:", error);
    throw error;
  }
};

// room one
const fetchRoomConversation = async (roomId) => {
  try {
    const response = await api.get(`/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching room chat data:", error);
    throw error;
  }
};

// chat one
const fetchChatConversation = async (receiverId) => {
  try {
    const response = await api.post(
      '/chat',
      {
        userId: receiverId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching chat data:", error);
    throw error;
  }
};

const createRoom = async ({ roomName, users }) => {
  try {
    const response = await api.post(
      '/rooms',
      {
        roomName,
        users,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching create room data:", error);
    throw error;
  }
};

const leaveRoom = async ({ roomId, userId }) => {
  try {
    const response = await api.post(
      '/rooms/leave',
      {
        roomId
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching leave room data:", error);
    throw error;
  }
};


export { fetchAllUsers, fetchChatConversation, postMessage, fetchAllRooms, createRoom, fetchRoomConversation, leaveRoom };

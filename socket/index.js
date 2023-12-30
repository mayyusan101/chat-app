const { createServer } = require("http");
const { Server } = require("socket.io")
const httpServer = createServer();
const io = new Server(httpServer,{ 
    cors: {
        origin: "*", //"http://localhost:5173
        // methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        // credentials: true
      }
 });

// Store connected users
const connectedUsers = {};
const roomUsers = {};


const getUsers = () => {
  let users = [];
  for (const [socketId, userId] of Object.entries(connectedUsers)) {
    users.push(userId); // One Account can have Multiple Socket Connection
  };
  return users;
}

// remove connection
const removeUser = () => {};

io.on("connection", (socket) => {
  

  // Event handler for the "userConnected" event
  socket.on('userConnected', (userId) => {
    connectedUsers[socket.id] = userId; // Store the user in the connectedUsers object
  
  // Emit Online Users
  io.emit("connectedUsers", Object.values(connectedUsers));   
  });

  // listen for room
  socket.on("roomChat", ({roomName, roomId, userId}) => {
    console.log({roomName, userId});
    socket.join(roomId); // join room
    console.log(`User ${userId} joined room ${roomName} roomId - ${roomId}`);
    roomUsers[socket.id] = {
      userId,
      roomId
    };
    io.to(roomId).emit("roomChat");
  });

  socket.on("roomMessage", ({roomId, senderId, text}) => {
    const details = {
      senderId,
      text,
    }
    console.log(`Emit roomMessage Event with the text of ${text}`);
    io.to(roomId).emit("roomMessage", details); // emit message
  })



  // Event for "sendMessage" event
  socket.on("sendMessage", ({senderId, receiverId, text}) => {
    for (const [socketId, userId] of Object.entries(connectedUsers)) {
      if(userId==receiverId){
        const details = {
          senderId,
          text,
        };
        socket.to(socketId).emit("sendMessage", details); // emit message // One Account can have Multiple Socket Connection
      }
    };
    
  })
  

 // Disconnect event
 socket.on('disconnect', () => {
  console.log(`User disconnected: ${socket.id}`);
  // Remove the user from the connectedUsers object
  delete connectedUsers[socket.id];
  delete roomUsers[socket.id];
  io.emit("connectedUsers", Object.values(connectedUsers));   
});
  
});

httpServer.listen(4000, () => {
    console.log('web socket server is listening on port - 4000');
});
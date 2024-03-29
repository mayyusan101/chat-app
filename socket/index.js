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

  // listen for room chat
  socket.on("roomChat", ({membersIds, roomId, userId}) => {
    socket.join(roomId); // join room
    membersIds?.map(member => {
      for (const [socketId, userId] of Object.entries(connectedUsers)) {
        if(member.id === userId){
          io.to(socketId).emit("roomChat");
        }
      };
    });
    io.to(roomId).emit("roomChat");
  });
  // listen for room chat message
  socket.on("roomMessage", ({roomId, senderId, text}) => {
    const details = {
      senderId,
      text,
    }
    io.to(roomId).emit("roomMessage", details); // emit message
  });
  // listen for room chat message
  socket.on("roomRemove", ({roomId, senderId}) => {
    const details = {
      roomId,
      senderId
    }
    io.to(roomId).emit("roomRemove", details); // emit message
  });


  // listen for one to one chat message
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
  // Remove the user from the connectedUsers object
  delete connectedUsers[socket.id];
  delete roomUsers[socket.id];
  io.emit("connectedUsers", Object.values(connectedUsers));   
});
  
});

httpServer.listen(4000, () => {
    console.log('web socket server is listening on port - 4000');
});
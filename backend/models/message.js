const mongoose = require("mongoose");
const { Schema } = mongoose;


const messageSchema = new Schema({
  text:{
    type: String,
    required: true,
  },  
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true,
  }
  // receivers: {
  //   type: Schema.Types.Mixed, // Mixed type for flexibility,
  //   required: true,
  //   ref: 'User'
  // },
  // chatId:{
  //   type: Schema.Types.ObjectId,
  //   required: false,  // can be obmit when it was room
  //   ref: 'Chat'
  // },
  // roomId:{
  //   type: Schema.Types.ObjectId,
  //   required: false,  // can be obmit when it was chat
  //   ref: 'Room'
  // }
},{
    timestamps: true
});


module.exports = mongoose.model("Message", messageSchema);
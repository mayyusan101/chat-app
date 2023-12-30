const mongoose = require("mongoose");
const { Schema } = mongoose;


const chatShema = new Schema({
  name:{
    type: String,
  },  
  roomAdmin:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  users:{
    type: Array,
    ref: 'User',
    required: true
  },
  isRoom:{
    type: Boolean,
    required: true
  }
},{
    timestamps: true
});


module.exports = mongoose.model("Chat", chatShema);
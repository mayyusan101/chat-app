const mongoose = require("mongoose");
const { Schema } = mongoose;


const roomSchema = new Schema({
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
},{
    timestamps: true
});



module.exports = mongoose.model("Room", roomSchema);
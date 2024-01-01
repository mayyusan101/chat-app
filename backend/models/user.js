const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new Schema({
  name:{
    type: String,
    required: true,
  },  
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String
  }
});

// hide password & token to json
// userSchema.set('toJSON', {
//   transform: function(doc, ret, opt) {
//       delete ret['password']
//       delete ret['token']
//       return ret;
//   }
// });

// hide password field
userSchema.set('toJSON', {
  transform: (doc, { __v, password, token, ...rest }, options) => rest
});

module.exports = mongoose.model("User", userSchema);

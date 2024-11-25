const mongoose = require("mongoose");
const Joi = require('joi').extend(require('@joi/date'));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 50
  },
  surname:{
    type: String,
    required: true,
    min: 3,
    max: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 255
},dob:{
  type: Date,
  required: true,
 
}
},{
  timestamps: true,
});
function validateUser(user) {
  const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      surname: Joi.string().min(3).max(50).required(),
      dob:Joi.date().format('YYYY-MM-DD'),
  })
  return schema.validate(user)
}

const User = mongoose.model("User", userSchema);
module.exports.validate = validateUser
module.exports.User = User;

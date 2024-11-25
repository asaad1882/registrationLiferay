const mongoose = require("mongoose");

const User = require("../models/User.model");
mongoose.set("strictQuery", false);
const connection = "mongodb://mongo:27017/mongo-test";

const connectDb = () => {
  return mongoose.connect(connection,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex:true,
  });
};

module.exports = connectDb;

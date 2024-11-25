require('dotenv').config()
const { User, validate } = require('../models/User.model');
const express = require('express');
const router = express.Router();
var moment = require('moment');
const axios = require('axios');
const SITE_SECRET = process.env.SITE_SECRET;
const listUsers = (async (req, res) => {
  const users = await User.find();
  res.json({
    resultCode: "S", resultMessage: "Success",
    errorMessage: "",
    response: users
  });
});
const verifyCaptacha = (async (req, res) => {
  const { captchaValue } = req.body
  const { data } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${captchaValue}`,
  )
  res.send(data);

});

const createUser = (async (req, res) => {

  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send({
      resultCode: "E", resultMessage: "Fail",
      errorMessage: [error.details[0].message]
    }
    );
  }
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).send(
      {
        resultCode: "E", resultMessage: "Fail",
        errorMessage: 'User already exisits.'
      })
  } else {
    try {
      const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        dob: moment(req.body.dob).format('YYYY-MM-DD'),
      });

      await user.save().then(() => console.log('User created'));

      return res.status(201).json({
        resultCode: "S", resultMessage: "Success",
        errorMessage: "",
        response: user
      });
    } catch (err) {
      return res.status(500).json({
        resultCode: "E", resultMessage: "Fail",
        errorMessage: [err.message]
      })
    }
  }
});
module.exports = {
  createUser,
  listUsers,
  verifyCaptacha
}
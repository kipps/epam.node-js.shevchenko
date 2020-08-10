const Joi = require('@hapi/joi');
const validator = require('express-joi-validation').createValidator({})

const express = require("express"),
  bodyParser = require("body-parser"),
  server = express();

const users = require('./Users');

const querySchema = Joi.object({
  id: Joi.string().required()
});

//body parser for parsing request body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

//temperary store for `user` in memory


//GET all users
server.get('/user', (req, res) => {
  console.log('get');
  res.json(users);
});

//GET the user with specified id
server.get('/user/:id', function (req, res) {
  res.json(users[req.params.id]);
});

//GET sort by login
server.get('/users-sorted', function (req, res) {
  console.log('sorted');
  res.json(users.sort((a, b) => {
    if (a.login > b.login) {
      return 1;
    }
    if (a.login < b.login) {
      return -1;
    }
    return 0;
  }));
});

//POST new user
server.post('/user', (req, res) => {
  let result = {
    id: `f${(~~(Math.random()*1e8)).toString(16)}`,
    login: req.body.login,
    password: req.body.password,
    age: req.body.age,
    isDeleted: false,
  };
  users.push(result); res.json(result);
});

//PUT edited user in-place of item with specified id
server.put('/user/:id', (req, res) => {
  users[req.params.id] = req.body;
  res.json(req.body);
});

//DELETE user with specified id
server.delete('/user/:id', (req, res) => {
  users[req.params.id].isDeleted = true;
  res.json(req.body);
});

//START SERVER
server.listen(3000, () => {
  console.log("Server running");
});

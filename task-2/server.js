const express = require("express"),
  bodyParser = require("body-parser"),
  server = express();

const users = require('./Users');

//body parser for parsing request body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

//temperary store for `user` in memory


//GET all users
server.get('/user', function (req, res) {
  res.json(users);
});

//GET the user with specified id
server.get('/user/:id', function (req, res) {
  res.json(users[req.params.id]);
});

//POST new user
server.post('/user', function (req, res) {
  let result = {
    id: `f${(~~(Math.random()*1e8)).toString(16)}`,
    login: req.body.login,
    password: req.body.password,
    age: req.body.age,
    isDeleted: true,
  };
  users.push(result); res.json(result);
});

//PUT edited user in-place of item with specified id
server.put('/user/:id', function (req, res) {
  users[req.params.id] = req.body;
  res.json(req.body);
});

//DELETE user with specified id
server.delete('/user/:id', function (req, res) {
  users[req.params.id].isDeleted = true;
  res.json(req.body);
});

//START SERVER
server.listen(3000, function () {
  console.log("Server running");
});

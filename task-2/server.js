const Joi = require('@hapi/joi');
const validator = require('express-joi-validation').createValidator();

const express = require("express"),
  server = express();

const users = require('./Users');

const userValidator = validator.body(Joi.object({
  // id: Joi.string().optional(),
  // isDeleted: Joi.bool().optional(),
  login: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().regex(/^[\w]{8,30}$/),
  age: Joi.number()
    .integer()
    .min(4)
    .max(130),
}));

//body parser for parsing request body
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//temperary store for `user` in memory


//GET all users
server.get('/users', (req, res) => {
  let result = users;
  if(req.query.sortBy === 'login') {
    result.sort((a, b) => {
      if (a.login > b.login) {
        return 1;
      }
      if (a.login < b.login) {
        return -1;
      }
      return 0;
    });
  }
  res.json(result);
});

//GET the user with specified id
server.get('/user/:id', function (req, res) {
  const user = users.find(item => item.id === req.params.id);
  res.json(user);
});

//POST new user
server.post('/user', userValidator, (req, res) => {
  let result = {
    id: `f${(~~(Math.random() * 1e8)).toString(16)}`,
    login: req.body.login,
    password: req.body.password,
    age: req.body.age,
    isDeleted: false,
  };
  users.push(result); res.json(result);
});

//PUT edited user in-place of item with specified id
server.put('/user/:id', userValidator, (req, res) => {
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

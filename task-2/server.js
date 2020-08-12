import Joi  from '@hapi/joi';
import express from 'express';
import { createValidator } from 'express-joi-validation';

const server = express();
const users = require('./Users');

const validator = createValidator();

const userValidator = validator.body(Joi.object({
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

// body parser for parsing request body
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// temperary store for `user` in memory

// GET all users
server.get('/users', (req, res) => {
  let result = users;
  if (req.query.sortBy === 'login') {
    result.sort((a, b) => {
      if (a.login > b.login) {
        return 1;
      }
      if (a.login < b.login) {
        return -1;
      }
      return 0;
    });
  } else if (req.query.filterBy) {
    result = users.filter((user) => user.login.includes(req.query.filterBy));
    if (req.query.limit) {
      result = result.slice(0, req.query.limit);
    }
  }
  res.json(result);
});

// GET the user with specified id
server.get('/user/:id', (req, res) => {
  const user = users.find((item) => item.id === req.params.id);
  res.json(user);
});

// POST new user
server.post('/user', userValidator, (req, res) => {
  const result = {
    id: `f${(+new Date).toString(16)}`,
    login: req.body.login,
    password: req.body.password,
    age: req.body.age,
    isDeleted: false,
  };
  users.push(result); res.json(result);
});

// PUT edited user in-place of item with specified id
server.put('/user/:id', userValidator, (req, res) => {
  users[req.params.id] = req.body;
  res.json(req.body);
});

// DELETE user with specified id
server.delete('/user/:id', (req, res) => {
  users[req.params.id].isDeleted = true;
  res.json(req.body);
});

// START SERVER
server.listen(3000, () => {
  console.log('Server running');
});

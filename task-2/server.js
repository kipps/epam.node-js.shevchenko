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
  result.sort((a, b) => {
    if (a.login > b.login) {
      return 1;
    }
    if (a.login < b.login) {
      return -1;
    }
    return 0;
  });
  
   if (req.query.login) {
    result = users.filter((user) => user.login.includes(req.query.login));
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
  // let result = users.findIndex(value => value[req.params.id]);
  // console.log(result);

  for (let i=0; i<users.length; i++) {
      if(users[i].id == req.params.id) {
          users[i].login = req.body.login ? req.body.login :  users[i].login;
          users[i].password = req.body.password ? req.body.password :  users[i].password;
          users[i].age = req.body.age ? req.body.age :  users[i].age;
      }
  }
  res.json(req.body);
});

// DELETE user with specified id
server.delete('/user/:id', (req, res) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == req.params.id) {
      users[i].isDeleted = true;
      res.json(users[i]);
    }
  }
  res.json(req.body);
});

// START SERVER
server.listen(3000, () => {
  console.log('Server running');
});

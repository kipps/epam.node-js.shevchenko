import Joi  from '@hapi/joi';
import express from 'express';
import { createValidator } from 'express-joi-validation';
import {UserService} from '../services/UserService';
import {UserModel} from '../models/UserModel';
import initSequelize from "../models";

const server = express();
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
        .max(130)
}));

// body parser for parsing request body
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


// GET all users
server.get('/users',  async (req, res) => {
    let result = await initSequelize.findAll();
    // getAllUsers(req.query.login, req.query.limit);
    if (req.query.login) {
        result = result.filter((user) => user.login.includes(req.query.login));
    }
    if (req.query.limit) {
        result = result.slice(0, req.query.limit);
    }
    result.sort((a, b) => {
        if (a.login > b.login) {
            return 1;
        }
        if (a.login < b.login) {
            return -1;
        }
        return 0;
    });
    res.json(result);
});

// GET the user with specified id
server.get('/user/:id', async (req, res) => {
    const user = await UserModel.findAll(
        {
            where: {
                id:req.params.id
            }
        }
    );
    res.json(user);
});

// POST new user
server.post('/user', userValidator, async (req, res) => {
    // const user = await UserModel.create({
    //     ...req.body
    // });

    const userServiceInstance = new UserService(UserModel);
    const user = await userServiceInstance.creatUser(req.body);

    res.json(user);
});

// PUT edited user in-place of item with specified id
server.put('/user/:id', userValidator, async (req, res) => {
    const user = await UserModel.update(
        {
            ...req.body
        },
        {
            where: {
                id:req.params.id
            }
        }
    );
    res.json(user);
});

// DELETE user with specified id
server.delete('/user/:id', async (req, res) => {
    const user = await UserModel.update(
        {
            isdeleted: true
        },
        {
            where: {
                id:req.params.id
            }
        }
    );
    res.json(user);
});

// START SERVER
server.listen(3000, () => {
    console.log('Server running');
});

import express from 'express';
import {Sequelize, DataTypes, QueryTypes, Model} from 'sequelize';
import {initUserModel, UserModel} from './models/UserModel';
import UserService from './services/UserService';
import UserController from "./api/UserController";

import Joi from '@hapi/joi';
import {createValidator} from 'express-joi-validation';

const app = express();
const router = express.Router();

const userService = new UserService(UserModel);

const sequelize = new Sequelize('postgres', 'postgres', 'kipps87', {
    dialect: "postgres"
});

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

app.use(express.json());
app.use(express.urlencoded({extended: true}));


initUserModel(sequelize);

sequelize.sync();

// const userRouter = UserController(router);

router
    .get('/users', async (req, res) => {
        let result = await userService.getUsers(req.query.login, req.query.limit);
        res.json(result);
    })
    .post('/users', userValidator, async (req, res) => {
        let result = await userService.creatUser(req.body);
        res.json(result);
    })
    .get('/users/:id', async (req, res) => {
        console.log('test');
        let result = await userService.getUser(req.params.id);
        res.json(result);
    })
    .put('/users/:id', userValidator, async (req, res) => {
        let result = await userService.updateUser(req.body, req.params.id);
        res.json(result);
    })
    .delete('/users/:id', async (req, res) => {
        let result = await userService.deleteUser(req.params.id);
        res.json(result);
    });

// START SERVER
app.listen(3000, () => {
    console.log('Server running');
});

app.use('/', router);

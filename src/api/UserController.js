import express from 'express';
import Joi from '@hapi/joi';
import {createValidator} from 'express-joi-validation';
import UserService from '../services/UserService';
import {UserModel} from "../models/UserModel";

const router = express.Router();
const userService = new UserService(UserModel);

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

router.get('/users', async (req, res) => {
    let result = await userService.getUsers();
    res.json(result);
});

router.post('/users', userValidator, async (req, res) => {
    let result = await userService.creatUser(req.body);
    res.json(result);
});

router.get('/user/:id', async (req, res) => {
    let result = await userService.getUser(req.params.id);
    res.json(result);
});

router.put('/user/:id', userValidator, async (req, res) => {
    let result = await userService.updateUser(req.body, req.params.id);
    res.json(result);
});

router.put('/user/:id', userValidator, async (req, res) => {
    let result = await userService.updateUser(req.body, req.params.id);
    res.json(result);
});

router.delete('/user/:id', async (req, res) => {
    let result = await userService.deleteUser(req.params.id);
    res.json(result);
});

export default router;

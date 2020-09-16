import express from 'express';
import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

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

const userRouter = (service) => {
    const router = express.Router();

    router.get('/users', async (req, res) => {
        const result = await service.getUsers();
        res.json(result);
    });

    router.post('/users', userValidator, async (req, res) => {
        const result = await service.creatUser(req.body);
        res.json(result);
    });

    router.get('/user/:id', async (req, res) => {
        const result = await service.getUser(req.params.id);
        res.json(result);
    });

    router.put('/user/:id', userValidator, async (req, res) => {
        const result = await service.updateUser(req.body, req.params.id);
        res.json(result);
    });

    router.delete('/user/:id', async (req, res) => {
        const result = await service.deleteUser(req.params.id);
        res.json(result);
    });

    return router;
};

export default userRouter;

import express from 'express';
import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';
import checkToken from '../middlewares/checkToken';

const validator = createValidator();
const groupValidator = validator.body(Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    premissions: Joi.array().required()
}));

const groupRouter = (service) => {
    const router = express.Router();

    router.get('/groups', checkToken, async (req, res, next) => {
        try {
            const result = await service.getGroups();
            res.json(result);
        } catch (err) {
            return next(err);
        }
    });

    router.post('/groups', checkToken, groupValidator, async (req, res, next) => {
        try {
            const result = await service.creatGroup(req.body);
            res.json(result);
        } catch (err) {
            return next(err);
        }
    });

    router.get('/group/:id', checkToken, async (req, res, next) => {
        try {
            const result = await service.getGroup(req.params.id);
            if (result.length === 0) {
                return res.status(404).send('Not found');
            }
            res.json(result);
        } catch (err) {
            return next(err);
        }
    });

    router.put('/group/:id', checkToken, groupValidator, async (req, res, next) => {
        try {
            const result = await service.updateGroup(req.body, req.params.id);
            if (result.length === 0) {
                return res.status(404).send('Not found');
            }
            res.json(result);
        } catch (err) {
            return next(err);
        }
    });

    router.delete('/group/:id', checkToken, async (req, res, next) => {
        try {
            const result = await service.deleteGroup(req.params.id);
            if (result.length === 0) {
                return res.status(404).send('Not found');
            }
            res.json(result);
        } catch (err) {
            return next(err);
        }
    });

    router.post('/group/:id/users/add', checkToken, async (req, res, next) => {
        const id = req.params.id;
        const usersIds = req.body.users;
        console.log(req.body);
        try {
            const allUsers = await service.addUsers(id, usersIds);
            return res.json(allUsers);
        } catch (error) {
            return next(error);
        }
    });
    return router;
};

export default groupRouter;

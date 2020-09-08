import express from 'express';
import Joi from '@hapi/joi';
import {createValidator} from 'express-joi-validation';

const validator = createValidator();
const groupValidator = validator.body(Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
}));

const groupRouter = (service) => {
    const router = express.Router();

    router.get('/groups', async (req, res) => {
        let result = await service.getGroups();
        res.json(result);
    });

    router.post('/groups', async (req, res) => {
        let result = await service.creatGroup(req.body);
        res.json(result);
    });

    router.get('/group/:id', async (req, res) => {
        let result = await service.getGroup(req.params.id);
        res.json(result);
    });

    router.put('/group/:id', groupValidator, async (req, res) => {
        let result = await service.updateGroup(req.body, req.params.id);
        res.json(result);
    });

    router.delete('/group/:id', async (req, res) => {
        let result = await service.deleteGroup(req.params.id);
        res.json(result);
    });

    return router;
}

export default groupRouter;

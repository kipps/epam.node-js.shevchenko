import express from 'express';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import {createValidator} from 'express-joi-validation';

const validator = createValidator();
const authValidator = validator.body(Joi.object({
  login: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().regex(/^[\w]{8,30}$/)
}));


const authRouter = (service) => {
  const router = express.Router();

  router.post('/login', async (req, res, next) => {
    try {
      const user = await service.getUserByLogin(req.body.login);
      if (user.length === 0) {
        return res.status(404).send(`Don't see this one user!`);
      }
      const payload = {sub: user.id, login: user.login};
      const token = jwt.sign(payload, 'secret_token', {expiresIn: 400});
      res.send(token);
    } catch (err) {
      return next(err);
    }
  });

  return router;
};

export default authRouter;

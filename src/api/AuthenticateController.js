import express from 'express';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import {createValidator} from 'express-joi-validation';
import config from 'config';

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

      if (!user) {
        return res.status(403).send(`Don't see this one user!`);
      }
      if(user.password !== req.body.password) {
        return res.status(403).send(`Wrong password!`);
      }
      const payload = {sub: user.id, login: user.login};
      const token = jwt.sign(payload, config.get('Config.Token.secret_token'), {expiresIn: config.get('Config.Token.duration')});
      res.send(token);
    } catch (err) {
      return next(err);
    }
  });

  return router;
};

export default authRouter;

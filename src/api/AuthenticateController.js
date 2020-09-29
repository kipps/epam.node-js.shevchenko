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
      const result = await service.getUserByLogin(req.body.login);
      const user = JSON.parse(JSON.stringify(result));
      if (user.length === 0) {
        return res.status(404).send(`Don't see this one user!`);
      }
      if(user[0].password !== req.body.password) {
        return res.status(404).send(`Wrong password!`);
      }
      const payload = {sub: user[0].id, login: user[0].login};
      const token = jwt.sign(payload, 'secret_token', {expiresIn: 400});
      res.send(token);
    } catch (err) {
      return next(err);
    }
  });

  return router;
};

export default authRouter;

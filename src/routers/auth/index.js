import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import login from './login';
import signup from './singup';

const authRouter = Router();

authRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);

authRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  signup
);

export default authRouter;

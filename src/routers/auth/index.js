import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import login from './login';
import signup from './signup';
import newPasswordRequest from './newPasswordRequest';
import resetPassword from './resetPassword';

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

authRouter.post(
  '/reset-password',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
    }),
  }),
  newPasswordRequest
);

authRouter.put(
  '/reset-password',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().required(),
      token: Joi.string().required(),
    }),
  }),
  resetPassword
);

export default authRouter;

import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import getContact from './getContact';
import getContacts from './getContacts';
import saveContact from './saveContact';
import deleteContact from './deleteContact';

const contactRouter = Router();

contactRouter.get('/contacts', getContacts);
contactRouter.get(
  '/contacts/:contactId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      contactId: Joi.number().integer(),
    }),
  }),
  getContact
);
contactRouter.post(
  '/contacts',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string().required(),
    }),
  }),
  saveContact
);
contactRouter.delete(
  '/contacts/:contactId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      contactId: Joi.number().integer(),
    }),
  }),
  deleteContact
);

export default contactRouter;

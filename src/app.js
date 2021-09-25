import { errors as celebrateErrors } from 'celebrate';
import express from 'express';
import jwt from 'express-jwt';
import sequelize from './database/connection';
import { authRouter, contactRouter } from './routers';

sequelize
  .authenticate()
  .catch((err) => console.error('Unable to connect to the database:', err));

const app = express();

app.use(express.json());

const secret = process.env.CONN_KEY || 'secret',
  algorithm = process.env.CONN_ALGORITHM || 'RS256';
app.use(
  jwt({ credentialsRequired: false, secret, algorithms: [algorithm] }).unless({
    path: ['/login', '/signup'],
  })
);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError')
    res.status(401).send({ success: false, message: 'Unauthorized.' });
  next();
});

app.use(authRouter);
app.use(contactRouter);
app.use(celebrateErrors());

export default app;

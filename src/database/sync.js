import sequelize from './connection';
import '../models';

if (process.env.NODE_ENV !== 'PROD') {
  sequelize
    .sync({ alter: true, force: true })
    .then(() => console.log('All models were synchronized.'))
    .then(() => sequelize.close())
    .catch((err) => console.error('Unable to connect to the database:', err));
}

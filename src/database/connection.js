import { Sequelize } from 'sequelize';

const sequelize = () => {
  try {
    if (!process.env.DB_URI) throw new Error();
    const options = process.env.ENV === 'TEST' ? { logging: false } : {};
    return new Sequelize(process.env.DB_URI, options);
  } catch (error) {
    throw new Error('Invalid database URI');
  }
};

export default sequelize();

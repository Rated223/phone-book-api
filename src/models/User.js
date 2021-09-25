import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import sequelize from '../database/connection';

const User = sequelize.define(
  'User',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(pass) {
        this.setDataValue('password', bcrypt.hashSync(pass, 8));
      },
    },
  },
  {
    tableName: 'users',
  }
);

export default User;

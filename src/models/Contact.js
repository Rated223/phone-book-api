import { DataTypes } from 'sequelize';
import sequelize from '../database/connection';

const Contact = sequelize.define(
  'Contact',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'contacts',
  }
);

export default Contact;

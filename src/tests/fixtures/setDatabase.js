import { Contact, User } from '../../models';
import sequelize from '../../database/connection';
import {
  user1Data,
  user2Data,
  user3Data,
  contact1Data,
  contact2Data,
  contact3Data,
} from '../data';

const setDatabase = async () => {
  try {
    await sequelize.query('SET GLOBAL FOREIGN_KEY_CHECKS = 0;', { raw: true });
    await sequelize.truncate();

    const [user1, user2, user3] = await User.bulkCreate([
      user1Data,
      user2Data,
      user3Data,
    ]);

    const [contact1, contact2, contact3] = await Contact.bulkCreate([
      contact1Data,
      contact2Data,
      contact3Data,
    ]);

    return {
      users: {
        user1,
        user2,
        user3,
      },
      contacts: {
        contact1,
        contact2,
        contact3,
      },
    };
  } catch (error) {
    throw new Error(`Setting mock data error: ${error}`);
  }
};

export default setDatabase;

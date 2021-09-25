import { manageErrors } from '../helpers';
import { Contact } from '../../models';

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      where: { UserId: req.user.userId },
    });
    res.status(200).send({ success: true, data: { contacts } });
  } catch (error) {
    manageErrors(error, res);
  }
};

export default getContacts;

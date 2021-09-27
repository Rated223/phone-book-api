import { manageErrors } from '../helpers';
import { Contact } from '../../models';

const saveContact = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    const contact = await Contact.create({
      firstName,
      lastName,
      phone,
      UserId: req.user.userId,
    });

    res.status(202).send({
      success: true,
      data: { contact },
    });
  } catch (error) {
    manageErrors(error, res);
  }
};

export default saveContact;

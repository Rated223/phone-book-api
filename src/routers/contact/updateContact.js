import { manageErrors } from '../helpers';
import findContact from './helpers/findContact';

const updateContact = async (req, res) => {
  try {
    const contact = await findContact({
      contactId: req.params.contactId,
      userId: req.user.userId,
      res,
    });

    contact.firstName = req.body.firstName;
    contact.lastName = req.body.lastName;
    contact.phone = req.body.phone;

    contact.save();

    res.status(200).send({
      success: true,
      data: { contact },
    });
  } catch (error) {
    manageErrors(error, res);
  }
};

export default updateContact;

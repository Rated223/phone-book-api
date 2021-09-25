import { manageErrors } from '../helpers';
import findContact from './helpers/findContact';

const deleteContact = async (req, res) => {
  try {
    const contact = await findContact({
      contactId: req.params.contactId,
      userId: req.user.userId,
      res,
    });

    contact.destroy();
    res.status(204).send({ success: true });
  } catch (error) {
    manageErrors(error, res);
  }
};

export default deleteContact;

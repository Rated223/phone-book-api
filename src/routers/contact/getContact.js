import { manageErrors } from '../helpers';
import findContact from './helpers/findContact';

const getContact = async (req, res) => {
  try {
    const contact = await findContact({
      contactId: req.params.contactId,
      userId: req.user.userId,
      res,
    });

    res.status(200).send({ success: true, data: { contact } });
  } catch (error) {
    manageErrors(error, res);
  }
};

export default getContact;

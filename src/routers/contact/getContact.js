import { manageErrors } from '../helpers';
import { Contact } from '../../models';

const getContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    console.log('contactId', contactId);
    const contact = await Contact.findByPk(contactId);

    if (!contact || contact.UserId !== req.user.userId) {
      res.status(404).send({ success: false, message: 'Contact not found.' });
      return;
    }

    res.status(200).send({ success: true, data: { contact } });
  } catch (error) {
    manageErrors(error, res);
  }
};

export default getContact;

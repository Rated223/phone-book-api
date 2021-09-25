import { Contact } from '../../../models';

const findContact = async ({ contactId, userId, res }) => {
  const contact = await Contact.findByPk(contactId);

  if (!contact || contact.UserId !== userId)
    res.status(404).send({ success: false, message: 'Contact not found.' });

  return contact;
};

export default findContact;

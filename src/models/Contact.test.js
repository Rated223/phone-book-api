import Contact from './Contact';
import faker from 'faker';
import setDatabase from '../tests/fixtures/setDatabase';

let user1;

beforeEach(async () => {
  const { users } = await setDatabase();
  user1 = users.user1;
});

test('Should create 2 new contacts', async () => {
  const newContact1Data = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    UserId: user1.id,
  };
  const newContact2Data = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    UserId: user1.id,
  };

  Contact.bulkCreate([newContact1Data, newContact2Data]);

  const contacts = await Contact.findAll();

  const newContact2 = contacts.pop();
  const newContact1 = contacts.pop();

  expect(newContact1).toMatchObject(newContact1Data);
  expect(newContact2).toMatchObject(newContact2Data);
});

test('should delete a contact', async () => {
  const contact = await Contact.findOne();
  if (!contact) throw new Error('No register for contact.');

  await Contact.destroy({ where: { id: contact.id } });

  const contactNotfound = await Contact.findByPk(contact.id);
  expect(contactNotfound).toBeNull();
});

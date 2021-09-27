import faker from 'faker';
import request from 'supertest';
import app from '../../app';
import setDatabase from '../../tests/fixtures/setDatabase';
import { user2Data } from '../../tests/data';

let auth, contact1, contact3;

beforeAll(async () => {
  const body = {
    username: user2Data.username,
    password: user2Data.password,
  };
  const response = await request(app).post('/login').send(body).expect(200);
  auth = `Bearer ${response.body.data.token}`;
});

beforeEach(async () => {
  const { contacts } = await setDatabase();
  contact1 = contacts.contact1;
  contact3 = contacts.contact3;
});

test('Should update a contact of the current user', async () => {
  const body = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
  };

  const response = await request(app)
    .put(`/contacts/${contact1.id}`)
    .set('Authorization', auth)
    .send(body)
    .expect(200);

  expect(response.body.success).toBe(true);
  expect(response.body.data.contact).toMatchObject(body);
});

test('Should not allow to update a contact of other user', async () => {
  const body = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
  };

  const response = await request(app)
    .put(`/contacts/${contact3.id}`)
    .set('Authorization', auth)
    .send(body)
    .expect(404);

  expect(response.body.success).toBe(false);
});

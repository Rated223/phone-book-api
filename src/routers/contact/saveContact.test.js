import faker from 'faker';
import request from 'supertest';
import app from '../../app';
import setDatabase from '../../tests/fixtures/setDatabase';
import { user2Data } from '../../tests/data';

let auth;

beforeAll(async () => {
  const body = {
    username: user2Data.username,
    password: user2Data.password,
  };
  const response = await request(app).post('/login').send(body).expect(200);
  auth = `Bearer ${response.body.data.token}`;
});

beforeEach(async () => {
  await setDatabase();
});

test('Should save a new contact for the current user', async () => {
  const body = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
  };

  const response = await request(app)
    .post(`/contacts`)
    .set('Authorization', auth)
    .send(body)
    .expect(202);

  expect(response.body.success).toBe(true);
  expect(response.body.data.contact).toMatchObject(body);
});

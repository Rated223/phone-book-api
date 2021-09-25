import faker from 'faker';
import request from 'supertest';
import app from '../../app';
import setDatabase from '../../tests/fixtures/setDatabase';
import { user1Data } from '../../tests/data';

beforeEach(async () => {
  await setDatabase();
});

test('Should register a new user', async () => {
  const body = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  const response = await request(app).post('/signup').send(body).expect(202);
  expect(response.body.success).toBe(true);
});

test('Should response an error for an email that already exist', async () => {
  const body = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    email: user1Data.email,
    password: faker.internet.password(),
  };

  const response = await request(app).post('/signup').send(body).expect(500);
  expect(response.body.success).toBe(false);
});

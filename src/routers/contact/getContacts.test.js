import request from 'supertest';
import app from '../../app';
import setDatabase from '../../tests/fixtures/setDatabase';
import { user2Data, contact1Data, contact2Data } from '../../tests/data';

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

test('Should get all the contacts for the current user', async () => {
  const response = await request(app)
    .get(`/contacts`)
    .set('Authorization', auth)
    .expect(200);

  expect(response.body.success).toBe(true);
  expect(response.body.data.contacts[0]).toMatchObject(contact1Data);
  expect(response.body.data.contacts[1]).toMatchObject(contact2Data);
});

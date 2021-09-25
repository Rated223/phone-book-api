import User from './User';
import bcrypt from 'bcrypt';
import faker from 'faker';
import setDatabase from '../tests/fixtures/setDatabase';
import { Contact } from '.';

beforeEach(async () => {
  await setDatabase();
});

test('Should create 2 new users', async () => {
  const newUser1Data = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const newUser2Data = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  User.bulkCreate([newUser1Data, newUser2Data]);

  const users = await User.findAll();

  const newUser2 = users.pop();
  const newUser1 = users.pop();

  const { password: user1Password, ...user1DataToCheck } = newUser1Data;
  const { password: user2Password, ...user2DataToCheck } = newUser2Data;

  expect(newUser1).toMatchObject(user1DataToCheck);
  expect(await bcrypt.compare(user1Password, newUser1.password)).toBe(true);
  expect(newUser2).toMatchObject(user2DataToCheck);
  expect(await bcrypt.compare(user2Password, newUser2.password)).toBe(true);
});

test('Should delete an user', async () => {
  const user = await User.findOne();
  if (!user) throw new Error('No register for user.');

  await User.destroy({ where: { id: user.id } });

  const userNotFound = await User.findByPk(user.id);
  expect(userNotFound).toBeNull();
});

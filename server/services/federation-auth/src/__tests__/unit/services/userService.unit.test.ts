import {
  getAllUsers,
  getUserById,
  getUserByEmailAndPassword,
  createUser,
} from '@services/userService';

describe('userService tests', () => {
  it('should get all users', async () => {
    const users = await getAllUsers({});

    expect(users.length).toBeGreaterThan(0);
  });

  it('should get a user', async () => {
    const userId = 2;
    const users = await getUserById(userId);

    expect(users?.userId).toEqual(userId);
  });

  it('should get a user by email and password', async () => {
    const email = 'admin@federation.com';
    const password = 'Admin!20';
    const user = await getUserByEmailAndPassword(email, password);

    expect(user.email).toEqual(email);
    expect(user.password).toEqual('');
  });

  it('should create a user', async () => {
    const email = 'jestuser@test.com';
    const password = 'Jestu!120';

    const user = await createUser({
      email,
      password,
    });

    expect(user.email).toEqual(email);
    expect(user.password).toEqual('');
  });
});

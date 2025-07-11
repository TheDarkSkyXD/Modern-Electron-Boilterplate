jest.mock('electron', () => ({
  app: {
    getPath: jest.fn(() => 'test/'),
  },
}));

import { createUser, getUser } from './User';
import db from '../connection';

describe('User model', () => {
  beforeEach(() => {
    db.exec('DELETE FROM users');
    db.exec("DELETE FROM sqlite_sequence WHERE name='users'");
  });

  it('should create a new user', () => {
    const user = createUser('John Doe', 'john.doe@example.com');
    expect(user.id).toBe(1);
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john.doe@example.com');
  });

  it('should get a user by id', () => {
    const createdUser = createUser('Jane Doe', 'jane.doe@example.com');
    const user = getUser(createdUser.id);
    expect(user.id).toBe(createdUser.id);
    expect(user.name).toBe('Jane Doe');
    expect(user.email).toBe('jane.doe@example.com');
  });
});

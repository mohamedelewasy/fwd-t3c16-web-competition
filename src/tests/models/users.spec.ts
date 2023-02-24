import Users from '../../models/users.model';

describe('user model', () => {
  it('create a valid user with id=1', async () => {
    const res = await Users.create('email1', 'password');
    expect(res).toEqual({ id: 1, email: 'email1', password: 'password' });
  });
  it('create a valid user with id=2', async () => {
    const res = await Users.create('email2', 'password');
    expect(res).toEqual({ id: 2, email: 'email2', password: 'password' });
  });
  it('get user by id', async () => {
    const res = await Users.show(1);
    expect(res).toEqual({ id: 1, email: 'email1', password: 'password' });
  });

  it('get user by email', async () => {
    const res = await Users.getByEmail('email1');
    expect(res).toEqual({ id: 1, email: 'email1', password: 'password' });
  });

  it('update email to email@email.com', async () => {
    const res = await Users.updateEmail(1, 'email@email.com');
    expect(res).toEqual({ id: 1, email: 'email@email.com', password: 'password' });
  });

  it('update password to newPassword', async () => {
    const res = await Users.updatePassword(1, 'newPassword');
    expect(res).toEqual({ id: 1, email: 'email@email.com', password: 'newPassword' });
  });
});

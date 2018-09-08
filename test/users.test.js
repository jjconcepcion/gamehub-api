const { User } = require('../models/users');

describe('Users', () => {
  const data = {
    name: 'aaaa',
    email: 'aaaa',
    password: 'aaaa',
  };

  describe('schema validation', () => {

    it('should be invalid if name is not provided', async () => {
      delete data.name;

      const user = new User(data);

      expect.assertions(1);
      await user.validate()
        .catch((err) => { expect(err.errors.name).toBeDefined(); });
    });

    it('should be invalid if email is not provided', async () => {
      delete data.email;

      const user = new User(data);

      expect.assertions(1);
      await user.validate()
        .catch((err) => { expect(err.errors.email).toBeDefined(); });
    });

    it('should be invalid if password is not provided', async () => {
      delete data.password;

      const user = new User(data);

      expect.assertions(1);
      await user.validate()
        .catch((err) => { expect(err.errors.password).toBeDefined(); });
    });

  });
});

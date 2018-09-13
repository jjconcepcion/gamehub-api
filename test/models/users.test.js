const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../../models/users');

describe('Users', () => {
  describe('schema validation', () => {
    let data;

    beforeEach(() => {
      data = {
        name: 'aaaa',
        email: 'a@mail.com',
        password: '12345678',
      };
    });

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

    it('should be invalid if name is shorter than 3 characters', async () => {
      data.name = 'aa';

      const user = new User(data);

      expect.assertions(1);
      await user.validate()
        .catch((err) => { expect(err.errors.name).toBeDefined(); });
    });

    it('should be invalid if email is shorter than 3 characters', async () => {
      data.email = 'aa';

      const user = new User(data);

      expect.assertions(1);
      await user.validate()
        .catch((err) => { expect(err.errors.email).toBeDefined(); });
    });

    it('should be invalid if password is shorter than 8 characters', async () => {
      data.password = '1234567';

      const user = new User(data);

      expect.assertions(1);
      await user.validate()
        .catch((err) => { expect(err.errors.password).toBeDefined(); });
    });

    it('should not allow an invalid email address', async () => {
      const invalidEmails = [
        'plainaddress',
        'abc..123@example.com',
        '.email@example.com',
        'email@example@example.com',
        'email.example.com',
      ]; // a small sample set

      for (let i = 0; i < invalidEmails.length; i += 1) {
        data.email = invalidEmails[i];
        data.name = `name${i}`;
        const user = new User(data);

        // eslint-disable-next-line
        await user.validate()
          .catch((err) => { expect(err.errors.email).toBeDefined(); });
      }

      expect.assertions(invalidEmails.length);
    });
  });

  describe('generateAuthToken() instance method', () => {
    it('should encode the user id in the token payload', async () => {
      const data = {
        name: 'aaaa',
        email: 'a@mail.com',
        password: '12345678',
      };
      const user = new User(data);
      const token = await user.generateAuthToken();

      expect.assertions(1);
      jwt.verify(token, config.get('jwtPrivateKey'), (err, decode) => {
        expect(decode).toHaveProperty('_id');
      });
    });
  });
});

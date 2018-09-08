const { User } = require('../models/users');

describe('Users', () => {
  describe('schema validation', () => {
    it('should be invalid if name is not provided', async () => {
      const user = new User();

      expect.assertions(1);
      await user.validate()
        .catch((err) => { expect(err.errors.name).toBeDefined(); });
    });
  });
});

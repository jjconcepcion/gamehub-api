const { Game } = require('../../models/games');

describe('Games', async () => {
  describe('schema validation', async () => {
    let data;

    beforeEach(() => {
      data = {
        name: 'aaa',
        description: 'aaa',
        minPlayers: 2,
        maxPlayers: 4,
      };
    });

    it('should be invalid if name is not provided', async () => {
      delete data.name;

      const game = new Game(data);

      expect.assertions(1);
      await game.validate()
        .catch((err) => { expect(err.errors.name).toBeDefined(); });
    });

    it('should be invalid if description is not provided', async () => {
      delete data.description;

      const game = new Game(data);

      expect.assertions(1);
      await game.validate()
        .catch((err) => { expect(err.errors.description).toBeDefined(); });
    });

    it('should be invalid if minPlayers is not provided', async () => {
      delete data.minPlayers;

      const game = new Game(data);

      expect.assertions(1);
      await game.validate()
        .catch((err) => { expect(err.errors.minPlayers).toBeDefined(); });
    });

    it('should be invalid if maxPlayers is not provided', async () => {
      delete data.maxPlayers;

      const game = new Game(data);

      expect.assertions(1);
      await game.validate()
        .catch((err) => { expect(err.errors.maxPlayers).toBeDefined(); });
    });

    it('should be invalid if name is shorter than 3 characters', async () => {
      data.name = 'aa';

      const game = new Game(data);

      expect.assertions(1);
      await game.validate()
        .catch((err) => { expect(err.errors.name).toBeDefined(); });
    });

    it('should be invalid if description is shorter than 3 characters', async () => {
      data.description = 'aa';

      const game = new Game(data);

      expect.assertions(1);
      await game.validate()
        .catch((err) => { expect(err.errors.description).toBeDefined(); });
    });

    it('should be invalid if minPlayers is less than 1', async () => {
      data.minPlayers = 0;

      const game = new Game(data);

      expect.assertions(1);
      await game.validate()
        .catch((err) => { expect(err.errors.minPlayers).toBeDefined(); });
    });

    it('should be invalid if maxPlayers is less than 1', async () => {
      data.maxPlayers = 0;

      const game = new Game(data);

      expect.assertions(1);
      await game.validate()
        .catch((err) => { expect(err.errors.maxPlayers).toBeDefined(); });
    });

    it('should be invalid if maxPlayers is less than minPlayers', async () => {
      data.minPlayers = 2;
      data.maxPlayers = 1;

      const game = new Game(data);

      expect.assertions(1);
      await game.validate()
        .catch((err) => { expect(err.errors.maxPlayers).toBeDefined(); });
    });
  });
});

const mongoose = require('mongoose');
const { Room } = require('../../models/rooms');

describe('Rooms', async () => {
  let data;

  beforeEach(() => {
    data = {
      name: 'Room name',
      owner: new mongoose.Types.ObjectId(),
      game: new mongoose.Types.ObjectId(),
    };
  });

  it('should be invalid if name is not provided', async () => {
    delete data.name;

    const room = new Room(data);

    expect.assertions(1);
    await room.validate()
      .catch((err) => { expect(err.errors.name).toBeDefined(); });
  });

  it('should be invalid if owner is not provided', async () => {
    delete data.owner;

    const room = new Room(data);

    expect.assertions(1);
    await room.validate()
      .catch((err) => { expect(err.errors.owner).toBeDefined(); });
  });

  it('should be invalid if game is not provided', async () => {
    delete data.game;

    const room = new Room(data);

    expect.assertions(1);
    await room.validate()
      .catch((err) => { expect(err.errors.game).toBeDefined(); });
  });

  it('should be invalid if name shorter than 3 characters', async () => {
    data.name = 'aa';

    const room = new Room(data);

    expect.assertions(1);
    await room.validate()
      .catch((err) => { expect(err.errors.name).toBeDefined(); });
  });
});

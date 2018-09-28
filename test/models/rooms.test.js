const { Room } = require('../../models/rooms');

describe('Rooms', async () => {
  let data;

  beforeEach(() => {
    data = {
      name: 'Room name',
    };
  });

  it('should be invalid if name is not provided', async () => {
    delete data.name;

    const room = new Room(data);

    expect.assertions(1);
    await room.validate()
      .catch((err) => { expect(err.errors.name).toBeDefined(); });
  });
});

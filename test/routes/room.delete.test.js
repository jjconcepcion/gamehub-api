const request = require('supertest');
const api = require('../../index');

describe('DELETE /api/rooms/:id', async () => {
  let id;

  const deleteRequest = () => request(api)
    .delete(`/api/rooms/${id}`);

  it('should return 200 if valid', async () => {
    const res = await deleteRequest();

    expect(res.status).toBe(200);
  });
});

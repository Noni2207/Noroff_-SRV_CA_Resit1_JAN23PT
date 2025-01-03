// users.test.js

const request = require('supertest');
const app = require('./app'); // Your Express app

describe('PUT /users', () => {
  it('should activate a user', async () => {
    const email = 'test@example.com'; // Ensure this user exists in your global data
    const response = await request(app).put('/users').send({ email });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.active).toBe(true); // Check user is activated
  });
});

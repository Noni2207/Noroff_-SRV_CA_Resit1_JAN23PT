// register.test.js


const request = require('supertest');
const app = require('./app'); 

describe('POST /users/register', () => {
  it('should register a new user with valid data', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({ email: 'test@example.com', firstname: 'Test', lastname: 'User' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toHaveProperty('email', 'test@example.com');
  });

  it('should return an error for duplicate email', async () => {
    // Register the same user again
    const response = await request(app)
      .post('/users/register')
      .send({ email: 'test@example.com', firstname: 'Test', lastname: 'User' });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Email is already registered');
  });
});

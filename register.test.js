// register.test.js
const request = require('supertest');
const app = require('./app');  // Adjust the path as needed

describe('POST /users/register', () => {
  it('should register a new user with valid data', async () => {
    const response = await request(app)
      .post('/users/register')  // Ensure it's hitting /users/register
      .send({
        email: 'test@example.com',
        firstname: 'John',
        lastname: 'Doe'
      });

    expect(response.status).toBe(200);  // Expect status 200 for successful registration
    expect(response.body.status).toBe('success');
    expect(response.body.data).toHaveProperty('email', 'test@example.com');
  });

  it('should return an error for duplicate email', async () => {
    // First, register a user
    await request(app)
      .post('/users/register')
      .send({
        email: 'test@example.com',
        firstname: 'John',
        lastname: 'Doe'
      });

    // Then, try to register the same email again
    const response = await request(app)
      .post('/users/register')  // Hitting the same route
      .send({
        email: 'test@example.com',
        firstname: 'Jane',
        lastname: 'Smith'
      });

    expect(response.status).toBe(400);  // Expect status 400 for duplicate email
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Email is already registered');
  });
});

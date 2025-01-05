// tests/register.test.js
const request = require('supertest');
const app = require('../app');

describe('POST /users/register', () => {
  it('should register a new user with valid data', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({ email: 'test@example.com', firstname: 'Test', lastname: 'User' });
  
    expect(response.status).toBe(200);  
    expect(response.body.status).toBe('success');
    expect(response.body.data).toHaveProperty('email', 'test@example.com');
  });

  it('should return an error for missing fields', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({ email: 'test@example.com', firstname: 'Test'}); 

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Missing required fields: lastname');
  });

  it('should return an error for invalid email format', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({ email: 'invalid-email', firstname: 'Test', lastname: 'User' });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Invalid email format');
  });

  it('should return an error for duplicate email', async () => {
    await request(app) 
      .post('/users/register')
      .send({ email: 'test@example.com', firstname: 'Test', lastname: 'User' });

    const response = await request(app) 
      .post('/users/register')
      .send({ email: 'test@example.com', firstname: 'Test', lastname: 'User' });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Email is already registered');
  });
});


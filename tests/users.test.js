// tests/users.test.js
const request = require('supertest');
const app = require('../app');

// Simulate a global users object
let users = {}; 

beforeAll(() => {
  users['test@example.com'] = {
    email: 'test@example.com',
    firstname: 'Test',
    lastname: 'User',
    active: false 
  };
});

describe('PUT /users', () => {
  it('should activate a user', async () => {
    const email = 'test@example.com'; 

    // Check initial state is deactivated
    const initialResponse = await request(app).get(`/users/${email}`);
    expect(initialResponse.status).toBe(200);
    expect(initialResponse.body.data.active).toBe(false);

    // Activate the user
    const response = await request(app).put('/users').send({ email, action: 'activate' });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.active).toBe(true); 
  });

  it('should deactivate a user', async () => {
    const email = 'test@example.com'; 

    // Deactivate the user
    const response = await request(app).put('/users').send({ email, action: 'deactivate' });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.active).toBe(false); 
  });

  it('should return error for non-existent user', async () => {
    const response = await request(app).put('/users').send({ email: 'nonexistent@example.com' });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('User not found');
  });
});


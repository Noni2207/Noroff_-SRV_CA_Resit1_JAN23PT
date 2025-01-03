// pictures.test.js

const request = require('supertest');
const app = require('./app');
const path = require('path');
const fs = require('fs');
// Define filePath to point to a valid image in your project
const filePath = path.join(__dirname, 'assets', 'test-image.jpg'); 
console.log('Resolved file path:', filePath);
console.log('File exists:', fs.existsSync(filePath));

if (!fs.existsSync(filePath)) {
  throw new Error(`Test file not found at path: ${filePath}`);
}


describe('POST /pictures/:email', () => {
  it('should upload a picture for a valid user', async () => {
    const email = 'test@example.com'; // Ensure this user exists in your global data

    const response = await request(app)
      .post(`/pictures/${email}`)
      .attach('file', filePath); // Ensure "file" matches your API's expected key

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toContain('Picture uploaded');
  });
});

describe('GET /pictures/:email', () => {
  it('should fetch all pictures for a user', async () => {
    const email = 'test@example.com'; // Ensure this user exists in your global data

    const response = await request(app).get(`/pictures/${email}`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(Array.isArray(response.body.data)).toBe(true); // Check that pictures is an array
  });
});

describe('GET /pictures/visible/:email', () => {
  it('should fetch visible pictures for a user', async () => {
    const email = 'test@example.com'; // Ensure this user exists in your global data

    const response = await request(app).get(`/pictures/visible/${email}`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(Array.isArray(response.body.data)).toBe(true); // Check visible pictures is an array
  });
});

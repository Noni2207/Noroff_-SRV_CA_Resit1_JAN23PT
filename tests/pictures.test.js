// tests/pictures.test.js
const request = require('supertest');
const app = require('../app');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'assets', 'test-image.jpg');

if (!fs.existsSync(filePath)) {
  throw new Error(`Test file not found at path: ${filePath}`);
}

describe('POST /pictures/:email', () => {
  it('should upload a picture for a valid user', async () => {
    const email = 'test@example.com';

    const response = await request(app)
      .post(`/pictures/${email}`)
      .attach('picture', filePath); 

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toContain('Picture uploaded');
  });
});

describe('GET /pictures/:email', () => {
  it('should fetch all pictures for a user', async () => {
    const email = 'test@example.com';

    const response = await request(app).get(`/pictures/${email}`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe('GET /pictures/visible/:email', () => {
  it('should fetch visible pictures for a user', async () => {
    const email = 'test@example.com';

    const response = await request(app).get(`/pictures/visible/${email}`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe('PUT /pictures/visibility', () => {
  it('should update the visibility of a picture', async () => {
    const email = 'test@example.com';
    const picId = 1; 
    const visible = true;

    const response = await request(app)
      .put('/pictures/visibility')
      .send({ email, picId, visible });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Picture visibility updated');
  });
});

describe('PUT /pictures/description', () => {
  it('should update the description of a picture', async () => {
    const email = 'test@example.com';
    const picId = 1; // Adjust picId based on your test data
    const description = 'Updated description';

    const response = await request(app)
      .put('/pictures/description')
      .send({ email, picId, description });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Picture description updated');
  });
});


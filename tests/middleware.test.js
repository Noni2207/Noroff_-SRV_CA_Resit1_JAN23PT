// tests/middleware.test.js
const { validEmailFormat, validUserEmail } = require('../middleware/validations');

describe('Middleware tests', () => {
  it('should pass validEmailFormat with a valid email in params', () => {
    const req = { params: { email: 'test@example.com' } };
    const res = {};
    const next = jest.fn();
    validEmailFormat(req, res, next);
    expect(next).toHaveBeenCalled(); 
  });

  it('should pass validEmailFormat with a valid email in body', () => {
    const req = { body: { email: 'test@example.com' } };
    const res = {};
    const next = jest.fn();
    validEmailFormat(req, res, next);
    expect(next).toHaveBeenCalled(); // Middleware passes
  });

  it('should fail validEmailFormat with an invalid email', () => {
    const req = { body: { email: 'invalid-email' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    validEmailFormat(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Invalid email format',
    });
  });

  it('should fail validUserEmail if user email is not registered or inactive', () => {
    const req = { body: { email: 'nonexistent@example.com' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    
    validUserEmail(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Email is not registered or not active',
    });
  });
});


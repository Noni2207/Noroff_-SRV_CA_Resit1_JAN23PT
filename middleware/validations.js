// middleware/validations.js

const validateBodyFields = (requiredFields) => (req, res, next) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
    }
    next();
  };
  
  const validEmailFormat = (req, res, next) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = req.body.email || req.params.email;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    next();
  };
  
  const emailAlreadyRegistered = (req, res, next) => {
    const { email } = req.body;
    const userExists = global.users.some(u => u.email === email);
    if (userExists) {
      return res.status(400).json({ error: 'Email is already registered' });
    }
    next();
  };
  
  module.exports = { validateBodyFields, validEmailFormat, emailAlreadyRegistered };
  
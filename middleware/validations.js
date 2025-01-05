// middleware/validations.js

// Validate the presence of required fields in request body
function validateBodyFields(fields) {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        status: 'error',
        message: 'Request body is required',
      });
    }

    const missingFields = fields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }
    next();
  };
}

// Validate email format (should be in the format ddddd@dddd.com)
function validEmailFormat(req, res, next) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const email = req.body?.email || req.params?.email; // Email in either body or params

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid email format',
    });
  }
  next();
}

// Check if the email is already registered in the global users object
const { users } = require('../data/global');
function emailAlreadyRegistered(req, res, next) {
  const { email } = req.body;

  // Check for user existence by email in the global.users object
  if (users[email]) {
    return res.status(400).json({
      status: 'error',
      message: 'Email is already registered',
    });
  }
  next();
}

// Check if user exists and is active
function validUserEmail(req, res, next) {
  const { email } = req.body;

  // Check if the user exists and is active
  const user = users[email];
  if (!user || !user.active) {
    return res.status(400).json({
      status: 'error',
      message: 'Email is not registered or not active',
    });
  }
  next();
}

module.exports = { validateBodyFields, validEmailFormat, emailAlreadyRegistered, validUserEmail };

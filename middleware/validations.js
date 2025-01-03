// middleware/validations.js

function validateBodyFields(fields) {
  return (req, res, next) => {
    const missingFields = fields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }
    next();
  };
}


// Example of the validEmailFormat middleware function
function validEmailFormat(req, res, next) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid email format'
    });
  }
  next();
}

// Check if the email is already registered in the global object
const { users } = require('../data/global');

function emailAlreadyRegistered(req, res, next) {
  const { email } = req.body;
  if (users[email]) {
    return res.status(400).json({
      status: 'error',
      message: 'Email is already registered',
    });
  }
  next();
}


// Check if user is registered and active
function validUserEmail(req, res, next) {
  const { email } = req.body;
  const globalData = require('../data/global');
  const user = globalData.users[email];
  if (!user || !user.active) {
    return res.status(400).json({
      status: 'error',
      message: 'Email is not registered or not active'
    });
  }
  next();
}

module.exports = { validateBodyFields, validEmailFormat, emailAlreadyRegistered, validUserEmail };

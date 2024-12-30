// routes/users.js


const express = require('express');
const { registerUser, getUser } = require('../controllers/userController');
const { 
  validateBodyFields, 
  emailAlreadyRegistered, 
  validEmailFormat 
} = require('../middleware/validations');

const router = express.Router();

// User registration
router.post(
  '/register',
  validateBodyFields(['email', 'firstname', 'lastname']),
  validEmailFormat,
  emailAlreadyRegistered,
  registerUser
);

// Get user by email
router.get('/:email', validEmailFormat, getUser);

module.exports = router;

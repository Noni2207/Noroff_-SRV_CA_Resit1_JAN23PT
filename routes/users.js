// routes/users.js
const express = require('express');
const { registerUser, getAllUsers, setUserActive, deleteUser } = require('../controllers/userController');
const { validateBodyFields, emailAlreadyRegistered, validEmailFormat, validUserEmail } = require('../middleware/validations');
const { jsendSuccess } = require('../middleware/errorHandler');

const router = express.Router();

console.log('setUserActive:', setUserActive);
console.log('validEmailFormat:', validEmailFormat);
console.log('validUserEmail:', validUserEmail);

router.post(
  '/register',
  validateBodyFields(['email', 'firstname', 'lastname']),
  validEmailFormat,
  emailAlreadyRegistered,
  registerUser
);


router.get('/', getAllUsers);

router.put(
  '/',
  validateBodyFields(['email']),
  validEmailFormat,
  validUserEmail,
  setUserActive
);

router.delete(
  '/',
  validateBodyFields(['email']),
  validEmailFormat,
  validUserEmail,
  deleteUser
);

module.exports = router;

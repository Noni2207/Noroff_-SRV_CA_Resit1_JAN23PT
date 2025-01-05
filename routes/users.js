// routes/users.js

const express = require('express');
const { registerUser, getAllUsers, setUserActive, deleteUser, activateUser, deactivateUser } = require('../controllers/userController');
const { validateBodyFields, emailAlreadyRegistered, validEmailFormat, validUserEmail } = require('../middleware/validations');
const { jsendSuccess } = require('../middleware/errorHandler');

const router = express.Router();

router.post(
  '/register',
  validateBodyFields(['email', 'firstname', 'lastname']),
  validEmailFormat,
  emailAlreadyRegistered, 
  registerUser
);

router.get('/', getAllUsers);
router.put('/', activateUser);
router.put('/deactivate', deactivateUser);
router.delete('/', validateBodyFields(['email']), validEmailFormat, validUserEmail, deleteUser);

module.exports = router;


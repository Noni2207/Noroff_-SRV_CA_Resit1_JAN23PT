// controllers/userController.js

const { jsendError, jsendSuccess } = require('../middleware/errorHandler');
const { users } = require('../data/global');

// Register a new user
const registerUser = (req, res) => {
  const { email, firstname, lastname } = req.body;

  // Check if user is already registered
  if (users[email]) {
    return res.status(400).json({
      status: 'error',
      message: 'Email is already registered',
    });
  }

  // Register the new user
  users[email] = {
    email,
    firstname,
    lastname,
    active: true,
    pic_count: 0,
    pictures: [],
  };

  return res.status(200).json({
    status: 'success',
    data: users[email],
    message: 'User registered successfully',
  });
};

// Activate a user
const activateUser = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ status: 'error', message: 'Email is required' });
  }

  const user = users[email];
  if (!user) {
    return res.status(400).json({ status: 'error', message: 'User not found' });
  }

  user.active = true;

  return res.status(200).json({
    status: 'success',
    data: user,
  });
};

// Get all users
const getAllUsers = (req, res) => {
  return jsendSuccess(res, Object.values(users), 'All users retrieved');
};

// Deactivate a user (Renamed from `deleteUser`)
const deactivateUser = (req, res) => {
  const { email } = req.body;
  const user = users[email];

  if (!user) {
    return jsendError(res, 'User not found', 400);
  }

  user.active = false;
  return jsendSuccess(res, user, 'User deactivated successfully');
};

const deleteUser = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: 'error',
      message: 'Email is required',
      data: null,
    });
  }

  const userIndex = users.findIndex(user => user.email === email);

  if (userIndex === -1) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
      data: null,
    });
  }

  users.splice(userIndex, 1);

  return res.status(200).json({
    status: 'success',
    message: 'User deleted',
    data: null,
  });
};

module.exports = { registerUser, getAllUsers, activateUser, deactivateUser, deleteUser};

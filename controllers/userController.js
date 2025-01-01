// controllers/userController.js

const { jsendError, jsendSuccess } = require('../middleware/errorHandler');

const registerUser = (req, res) => {
  const { email, firstname, lastname } = req.body;

  const newUser = {
    email,
    firstname,
    lastname,
    active: true,
    pic_count: 0,
    pictures: [],
  };

  global.users.push(newUser);
  return jsendSuccess(res, newUser, 'User registered successfully');
};

const getAllUsers = (req, res) => {
  return jsendSuccess(res, global.users, 'All users retrieved');
};

const setUserActive = (req, res) => {
  const { email } = req.body;
  const user = global.users.find((u) => u.email === email);

  if (user.active) {
    return jsendError(res, 'User is already active');
  }

  user.active = true;
  return jsendSuccess(res, user, 'User is now active');
};

const deleteUser = (req, res) => {
  const { email } = req.body;
  const user = global.users.find((u) => u.email === email);

  user.active = false;
  return jsendSuccess(res, user, 'User is now inactive');
};

module.exports = { registerUser, getAllUsers, setUserActive, deleteUser };


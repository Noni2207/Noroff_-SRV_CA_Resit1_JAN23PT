// controllers/userController.js

const { jsendError, jsendSuccess } = require('../middleware/errorHandler');
const { users } = require('../data/global');

const registerUser = (req, res) => {
  const { email, firstname, lastname } = req.body;

  if (!users[email]) {
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
  }

  return res.status(400).json({
    status: 'error',
    message: 'Email is already registered',
  });
};


const activateUser = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ status: 'error', message: 'Email is required' });
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ status: 'error', message: 'User not found' });
  }

  user.active = true;

  return res.status(200).json({
    status: 'success',
    data: user,
  });
};

const getAllUsers = (req, res) => {
  if (!Array.isArray(global.users)) {
    global.users = []; 
  }
  return jsendSuccess(res, global.users, 'All users retrieved');
};


const setUserActive = (req, res) => {
  const { email } = req.body;
  const user = global.users.find(user => user.email === email);

  if (!user) {
    return jsendError(res, 'User not found', 400);
  }

  user.active = true;
  return jsendSuccess(res, user, 'User activated successfully');
};


const deleteUser = (req, res) => {
  const { email } = req.body;
  const user = global.users.find(user => user.email === email);

  if (!user) {
    return jsendError(res, 'User not found', 400);
  }

  user.active = false;
  return jsendSuccess(res, user, 'User deactivated successfully');
};


module.exports = { registerUser, getAllUsers, setUserActive, deleteUser, activateUser };


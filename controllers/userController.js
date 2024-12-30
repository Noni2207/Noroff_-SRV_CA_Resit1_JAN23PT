// controllers/userController.js


const registerUser = (req, res) => {
    const { email, firstname, lastname } = req.body;
  
    const newUser = {
      email,
      firstname,
      lastname,
      active: true,
      pic_count: 0,
      pictures: []
    };
  
    global.users.push(newUser);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  };
  
  const getUser = (req, res) => {
    const user = global.users.find(u => u.email === req.params.email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  };
  
  module.exports = { registerUser, getUser };
  
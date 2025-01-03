// controllers/pictureController.js

const { jsendError, jsendSuccess } = require('../middleware/errorHandler');
const { users, pictures } = require('../data/global'); 

const uploadPicture = (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ status: 'error', message: 'Email is required' });
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ status: 'error', message: 'User not found' });
  }

  if (!req.file) {
    return res.status(400).json({ status: 'error', message: 'No file uploaded' });
  }

  const picture = {
    filename: req.file.filename,
    visible: true, // Default visibility
  };

  user.pictures.push(picture);

  return res.status(200).json({
    status: 'success',
    data: picture,
  });
};


const getAllPictures = (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ status: 'error', message: 'Email is required' });
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ status: 'error', message: 'User not found' });
  }

  return res.status(200).json({
    status: 'success',
    data: user.pictures,
  });
};
// Get all pictures for a user
const getPictures = (req, res) => {
  const { email } = req.params;
  const userPictures = pictures.filter(p => p.email === email);

  if (userPictures.length === 0) {
    return jsendError(res, 'No pictures found for this user', 404);
  }

  return jsendSuccess(res, userPictures, 'Pictures retrieved');
};

// Get only visible pictures for a user
const getVisiblePictures = (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ status: 'error', message: 'Email is required' });
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ status: 'error', message: 'User not found' });
  }

  const visiblePictures = user.pictures.filter(pic => pic.visible);

  return res.status(200).json({
    status: 'success',
    data: visiblePictures,
  });
};

// Set visibility of a picture
const setVisibility = (req, res) => {
  const { visible } = req.params;
  const { email, picId } = req.body;
  const picture = pictures.find(p => p.picId === picId && p.email === email);

  if (!picture) {
    return jsendError(res, 'Picture not found', 404);
  }

  picture.visible = visible === 'true'; // assuming visible is passed as "true"/"false"
  return jsendSuccess(res, picture, 'Picture visibility updated');
};

// Set description for a specific picture
const setDescription = (req, res) => {
  const { email, picId, description } = req.body;
  const picture = pictures.find(p => p.picId === picId && p.email === email);

  if (!picture) {
    return jsendError(res, 'Picture not found', 404);
  }

  picture.description = description;
  return jsendSuccess(res, picture, 'Picture description updated');
};

module.exports = { 
  uploadPicture,
  getAllPictures, 
  getPictures, 
  getVisiblePictures, 
  setVisibility, 
  setDescription 
};

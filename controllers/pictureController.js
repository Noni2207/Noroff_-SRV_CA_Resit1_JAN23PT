// controllers/pictureController.js

const { jsendError, jsendSuccess } = require('../middleware/errorHandler');
const { users } = require('../data/global');
const crypto = require('crypto'); // To generate random 10-digit filenames

// Helper function to generate a random filename
function generateRandomFilename(extension) {
  const randomString = crypto.randomBytes(5).toString('hex'); 
  return `${randomString}.${extension}`;
}

// Upload a picture
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

  const fileExtension = req.file.mimetype.split('/')[1]; 
  const filename = generateRandomFilename(fileExtension);

  const picture = {
    picId: user.pic_count++, 
    filename,
    description: '', 
    visible: true, 
  };

  user.pictures.push(picture); 

  return res.status(200).json({
    status: 'success',
    message: 'Picture uploaded',
    data: picture,
  });
};

// Get all pictures of a user
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

// Get visible pictures of a user
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

// Set visibility of a specific picture
const setVisibility = (req, res) => {
  const { email, picId, visible } = req.body;

  if (!email || !picId || visible === undefined) {
    return jsendError(res, 'Missing required fields', 400);
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    return jsendError(res, 'User not found', 400);
  }

  const picture = user.pictures.find(p => p.picId === picId);

  if (!picture) {
    return jsendError(res, 'Picture not found', 404);
  }

  picture.visible = visible === 'true'; 
  return jsendSuccess(res, picture, 'Picture visibility updated');
};

// Set description for a specific picture
const setDescription = (req, res) => {
  const { email, picId, description } = req.body;

  if (!email || !picId || !description) {
    return jsendError(res, 'Missing required fields', 400);
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    return jsendError(res, 'User not found', 400);
  }

  const picture = user.pictures.find(p => p.picId === picId);

  if (!picture) {
    return jsendError(res, 'Picture not found', 404);
  }

  picture.description = description;
  return jsendSuccess(res, picture, 'Picture description updated');
};

module.exports = {
  uploadPicture,
  getAllPictures,
  getVisiblePictures,
  setVisibility,
  setDescription,
};

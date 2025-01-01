// controllers/pictureController.js

const { jsendError, jsendSuccess } = require('../middleware/errorHandler');

const uploadPicture = (req, res) => {
  const { email } = req.params; // Email is part of the URL params
  const user = global.users.find(u => u.email === email);

  if (!user || !user.active) {
    return jsendError(res, 'Invalid or inactive user');
  }

  if (!req.file) {
    return jsendError(res, 'No file uploaded', 400);
  }

  const { originalname, size, mimetype } = req.file;

  // Validate file size (example: limit to 5MB)
  if (size > 5 * 1024 * 1024) { 
    return jsendError(res, 'File size exceeds the 5MB limit', 400);
  }

  // Validate file type (allow only images)
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedMimeTypes.includes(mimetype)) {
    return jsendError(res, 'Invalid file type. Only JPG, PNG, and GIF are allowed.', 400);
  }

  // Generate a unique filename with 10 random characters + original extension
  const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 12)}.${originalname.split('.').pop()}`;

  const newPicture = {
    filename,
    description: req.body.description || '', // Optional description
    file_extension: originalname.split('.').pop(),
    visible: true,  // Default to visible
    size
  };

  user.pictures.push(newPicture);
  user.pic_count += 1;

  return jsendSuccess(res, newPicture, 'Picture uploaded successfully');
};
// controllers/pictureController.js

// Get all pictures for a user
const getPictures = (req, res) => {
  const { email } = req.params;
  const user = global.users.find(u => u.email === email);

  if (!user) {
    return jsendError(res, 'User not found', 404);
  }

  return jsendSuccess(res, user.pictures, 'Pictures retrieved');
};

// Get only visible pictures for a user
const getVisiblePictures = (req, res) => {
  const { email } = req.params;
  const user = global.users.find(u => u.email === email);

  if (!user) {
    return jsendError(res, 'User not found', 404);
  }

  const visiblePictures = user.pictures.filter(pic => pic.visible);
  return jsendSuccess(res, visiblePictures, 'Visible pictures retrieved');
};

// Set visibility of a picture (e.g., true/false based on param)
const setVisibility = (req, res) => {
  const { visible } = req.params;
  const { email, picId } = req.body;
  const user = global.users.find(u => u.email === email);

  if (!user) {
    return jsendError(res, 'User not found', 404);
  }

  const picture = user.pictures[picId];
  if (!picture) {
    return jsendError(res, 'Picture not found', 404);
  }

  picture.visible = visible === 'true'; // assuming visible is passed as "true"/"false"
  return jsendSuccess(res, picture, 'Picture visibility updated');
};

// Set description for a specific picture
const setDescription = (req, res) => {
  const { email, picId, description } = req.body;
  const user = global.users.find(u => u.email === email);

  if (!user) {
    return jsendError(res, 'User not found', 404);
  }

  const picture = user.pictures[picId];
  if (!picture) {
    return jsendError(res, 'Picture not found', 404);
  }

  picture.description = description;
  return jsendSuccess(res, picture, 'Picture description updated');
};

module.exports = { uploadPicture };

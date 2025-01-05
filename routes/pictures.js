// routes/pictures.js

const express = require('express');
const multer = require('multer');

const { 
  uploadPicture, 
  getPictures, 
  getVisiblePictures, 
  setVisibility, 
  setDescription 
} = require('../controllers/pictureController');
const { 
  validEmailFormat, 
  validUserEmail, 
  validateBodyFields 
} = require('../middleware/validations');
const { jsendError, jsendSuccess } = require('../middleware/errorHandler');

const router = express.Router();

// Utility for async route handlers
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Set up multer for file uploads (mock without saving the file)
const upload = multer({ dest: 'uploads/' });

// POST /pictures/:email
router.post('/:email', upload.single('picture'), uploadPicture);

// GET /pictures/:email
router.get(
  '/:email',
  validEmailFormat,
  validUserEmail,
  asyncHandler(getPictures)
);

// GET /pictures/visible/:email
router.get(
  '/visible/:email',
  validEmailFormat,
  validUserEmail,
  asyncHandler(getVisiblePictures)
);

// PUT /pictures/visible
router.put(
  '/visible',
  validateBodyFields(['email', 'picId', 'visible']), 
  validEmailFormat,
  validUserEmail,
  asyncHandler(setVisibility)
);

// PUT /pictures
router.put(
  '/',
  validateBodyFields(['email', 'picId', 'description']),
  validEmailFormat,
  validUserEmail,
  asyncHandler(setDescription)
);

module.exports = router;
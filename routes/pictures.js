// routes/pictures.js

const express = require('express');
const multer = require('multer');
const { uploadPicture } = require('../controllers/pictureController');
const { validEmailFormat } = require('../middleware/validations');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Save files to "uploads/" directory

// Upload picture
router.post(
  '/upload',
  upload.single('picture'),
  validEmailFormat,
  uploadPicture
);

module.exports = router;

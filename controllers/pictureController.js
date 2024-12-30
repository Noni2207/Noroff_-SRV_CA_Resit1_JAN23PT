// controllers/pictureController.js

const uploadPicture = (req, res) => {
    const { email } = req.body;
    const user = global.users.find(u => u.email === email);
  
    if (!user || !user.active) {
      return res.status(400).json({ error: 'Invalid or inactive user' });
    }
  
    const { originalname, filename, size } = req.file;
  
    const newPicture = {
      filename,
      description: req.body.description || '',
      file_extension: originalname.split('.').pop(),
      visible: true,
      size
    };
  
    user.pictures.push(newPicture);
    user.pic_count += 1;
  
    res.status(201).json({ message: 'Picture uploaded successfully', picture: newPicture });
  };
  
  module.exports = { uploadPicture };
  
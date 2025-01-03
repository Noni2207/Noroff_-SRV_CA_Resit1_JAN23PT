// app.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/users');
const pictureRoutes = require('./routes/pictures');

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoutes);
app.use('/pictures', pictureRoutes);

// Global error handler (Jsend format)
app.use((err, req, res, next) => {
  
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    data: null
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// Export the app for testing
module.exports = app;

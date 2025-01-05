// app.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/users');
const pictureRoutes = require('./routes/pictures');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/users', userRoutes);
app.use('/pictures', pictureRoutes);

// 404 Error handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route '${req.originalUrl}' not found`,
    data: null,
  });
  
});

// Global error handler (Jsend format)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Something went wrong!';
  
  res.status(statusCode).json({
    status: 'error',
    message: errorMessage,
    data: null,
  });
});


// Validate environment variables
if (!process.env.PORT) {
  console.error('Error: PORT is not defined in the environment variables.');
  process.exit(1);
}

// Start the server
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  console.log(`Running in ${process.env.NODE_ENV || 'development'} mode.`);
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}


module.exports = app;

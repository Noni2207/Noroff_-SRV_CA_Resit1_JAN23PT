// middleware/errorHandler.js

function jsendError(res, message, statusCode = 400) {
  return res.status(statusCode).json({
    status: 'error',
    message,
    data: null
  });
}

function jsendSuccess(res, data, message) {
  return res.status(200).json({
    status: 'success',
    message,
    data
  });
}

module.exports = { jsendError, jsendSuccess };




  
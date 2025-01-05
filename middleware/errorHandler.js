// middleware/errorHandler.js

function jsendSuccess(res, data, message = '') {
  return res.status(200).json({
    status: 'success',
    message,
    data,
  });
}

function jsendError(res, message, code = 400) {
  return res.status(code).json({
    status: 'error',
    message,
    data: null,
  });
}

module.exports = { jsendSuccess, jsendError };





  
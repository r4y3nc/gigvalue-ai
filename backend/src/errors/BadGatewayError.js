const AppError = require('./AppError');

class BadGatewayError extends AppError {
  constructor(message = 'Bad Gateway') {
    super(message, 502);
  }
}

module.exports = BadGatewayError;

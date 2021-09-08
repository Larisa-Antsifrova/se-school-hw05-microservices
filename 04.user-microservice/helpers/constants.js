const HttpCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

const Ports = {
  default: 5555,
};

const Messages = {
  loginSuccess: 'You have successfully logged in.',
  registrationSuccess: 'You have successfully registered.',
  emailConflict: 'This email is already in use.',
  invalidCreds: 'Invalid credentials.',
  noJWT: 'JWT token is not provided.',
  tooManyRequests: 'Too many requrests made. Please try again later.',
  notFound: 'Not found.',
};

const TokenLife = {
  access: '4h',
};

module.exports = { HttpCodes, Ports, Messages, TokenLife };

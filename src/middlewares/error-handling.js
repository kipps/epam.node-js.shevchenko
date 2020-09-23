import logger from '../logging/logger';

const errorHandling = (error, { method, url }, response, _next) => {
  const errorMessage = error?.message;
  logger.error(errorMessage, { method, url });
  return response.status(500).end(errorMessage);
};

export default errorHandling;


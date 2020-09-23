import logger from '../logging/logger';

// const invocationLogging = ({ method, url, body }, _response, next) => {
const invocationLogging = (err, req, res, next) => {
  // logger.info('API Method Invokation', { method, url, body });
  // next();
  console.error(err.stack);
  next(err);
};

export default invocationLogging;

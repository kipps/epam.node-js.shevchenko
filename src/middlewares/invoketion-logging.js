import logger from '../logging/logger';

const invocationLogging = (err, req, res, next) => {
    logger.info('API Method Invokation',  { method, url, body });
    next(err);
};

export default invocationLogging;

import logger from '../logging/logger';

const invocationLogging = (err, req, res, next) => {
    logger.info('API Method Invokation', {});
    next(err);
};

export default invocationLogging;

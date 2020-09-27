import express from 'express';
import logger from './logging/logger';
import { dbInit } from './database/db-init';
import runServer from './server/server';

const app = express();
const db = dbInit();

process.on('uncaughtException', async (error) => {
    try {
        await new Promise((resolve) => {
            logger.error('uncaughtException', error);
            logger.on('end', resolve);
        });

        if (app) {
            await new Promise(app.close.bind(app));
            console.log('App closed!');
        }

        if (db) {
            await db.closeConnection();
            console.log('Database connection is closed!');
        }
    } finally {
        process.exit(1);
    }
});

process.on('unhandledRejection', (error) => {
    if (error) {
        logger.error('unhandledRejection', error);
    }
});

runServer(app, db.sequelize);


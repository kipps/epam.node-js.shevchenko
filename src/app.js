import express from 'express';
import {Sequelize} from 'sequelize';

import UserService from './services/UserService';
import {UserModel} from './models/UserModel';
import userRouter from './api/UserController';

import GroupService from './services/GroupService';
import {GroupModel} from './models/GroupModel';
import groupRouter from './api/GroupController';

import {dbInit} from "./database/db-init";

import logger from './logging/logger';
import errorHandling from "./middlewares/error-handling";
import invocationLogging from "./middlewares/invoketion-logging";

const app = express();
const sequelize = new Sequelize('postgres', 'postgres', 'kipps87', {
  dialect: 'postgres'
});

const userService = new UserService(UserModel);
const groupService = new GroupService(GroupModel);


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
  '/',
  invocationLogging
);

// app.use(function(err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

app.use(userRouter(userService));
app.use(groupRouter(groupService));

app.use(errorHandling);

const db = dbInit(sequelize);

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

sequelize.sync();

// START SERVER
app.listen(3000, () => {
  console.log('Server running');
});


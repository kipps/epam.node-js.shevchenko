import express from 'express';
import morgan from 'morgan';
import {Sequelize} from 'sequelize';
import {initUserModel} from './models/UserModel';
import {initGroupModel} from './models/GroupModel';
import {initUserGroupModel} from './models/UserGroup';

import UserService from './services/UserService';
import {UserModel} from './models/UserModel';
import userRouter from './api/UserController';

import GroupService from './services/GroupService';
import {GroupModel} from './models/GroupModel';
import groupRouter from './api/GroupController';
import uniteModels from './models/UniteModels';

import logger from './logging/logger';

const app = express();
const sequelize = new Sequelize('postgres', 'postgres', 'kipps87', {
  dialect: 'postgres'
});

const userService = new UserService(UserModel);
const groupService = new GroupService(GroupModel);


app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


initUserModel(sequelize);
initGroupModel(sequelize);
initUserGroupModel(sequelize);
uniteModels(sequelize);

sequelize.sync();

// START SERVER
app.listen(3000, () => {
  console.log('Server running');
});

app.use(userRouter(userService));
app.use(groupRouter(groupService));


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
  } finally {
    process.exit(1);
  }
});

process.on('unhandledRejection', (error) => {
  if (error) {
    logger.error('unhandledRejection', error);
  }
});

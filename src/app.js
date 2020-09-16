import express from 'express';
import { Sequelize } from 'sequelize';
import { initUserModel } from './models/UserModel';
import { initGroupModel } from './models/GroupModel';
import { initUserGroupModel } from './models/UserGroup';

import UserService from './services/UserService';
import { UserModel } from './models/UserModel';
import userRouter from './api/UserController';

import GroupService from './services/GroupService';
import { GroupModel } from './models/GroupModel';
import groupRouter from './api/GroupController';
import uniteModels from './models/UniteModels';

const app = express();
const sequelize = new Sequelize('postgres', 'postgres', 'kipps87', {
    dialect: 'postgres'
});

const userService = new UserService(UserModel);
const groupService = new GroupService(GroupModel);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

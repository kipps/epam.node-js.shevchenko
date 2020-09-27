import UserService from '../services/UserService';
import { UserModel } from '../models/UserModel';
import GroupService from '../services/GroupService';
import { GroupModel } from '../models/GroupModel';
import express from 'express';
import invocationLogging from '../middlewares/invoketion-logging';
import userRouter from '../api/UserController';
import groupRouter from '../api/GroupController';
import errorHandling from '../middlewares/error-handling';


const runServer = (app, sequelize) => {
    const userService = new UserService(UserModel);
    const groupService = new GroupService(GroupModel);


    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
        '/',
        invocationLogging
    );


    app.use(userRouter(userService));
    app.use(groupRouter(groupService));


    app.use(errorHandling);

    sequelize.sync();

    // START SERVER
    app.listen(3000, () => {
        console.log('Server running');
    });
};


export default runServer;

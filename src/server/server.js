import UserService from '../services/UserService';
import { UserModel } from '../models/UserModel';
import GroupService from '../services/GroupService';
import { GroupModel } from '../models/GroupModel';
import express from 'express';
import userRouter from '../api/UserController';
import groupRouter from '../api/GroupController';
import authRouter from '../api/AuthenticateController';
import expressWinston from 'express-winston';
import winston from 'winston';
import cors from 'cors';

const runServer = (app) => {
    const userService = new UserService(UserModel);
    const groupService = new GroupService(GroupModel);

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(expressWinston.logger({
        transports: [
            new winston.transports.File({ filename: 'response-errors.log' })
        ],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        ),
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
    }));

    app.use(authRouter(userService));
    app.use(userRouter(userService));
    app.use(groupRouter(groupService));

    app.use(expressWinston.errorLogger({
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error' })
        ],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        )
    }));

    // START SERVER
    app.listen(3000, () => {
        console.log('Server running');
    });
};


export default runServer;

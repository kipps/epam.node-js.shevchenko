import express from 'express';
import {Sequelize} from 'sequelize';
import {initUserModel} from './models/UserModel';
import router from "./api/UserController";

const app = express();
const sequelize = new Sequelize('postgres', 'postgres', 'kipps87', {
    dialect: "postgres"
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));


initUserModel(sequelize);

sequelize.sync();

// START SERVER
app.listen(3000, () => {
    console.log('Server running');
});

app.use('/', router);

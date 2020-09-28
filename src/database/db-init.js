import { initUserModel } from '../models/UserModel';
import { initGroupModel } from '../models/GroupModel';
import { initUserGroupModel } from '../models/UserGroup';
import uniteModels from '../models/UniteModels';
import { Sequelize } from 'sequelize';

export function dbInit() {
    const sequelize = new Sequelize('postgres', 'postgres', 'kipps87', {
        dialect: 'postgres'
    });

    sequelize.authenticate()
        .then(() => console.log('Connection to Database is established!'))
        .catch(() => {
            throw new Error('Database connection error!');
        });

    initUserModel(sequelize);
    initGroupModel(sequelize);
    initUserGroupModel(sequelize);
    uniteModels(sequelize);

    sequelize.sync();

    return {
        closeConnection: sequelize.close.bind(sequelize),
        sequelize
    };
}

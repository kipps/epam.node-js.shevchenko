import {Sequelize} from "sequelize";

import {initUserModel} from "../models/UserModel";
import {initGroupModel} from "../models/GroupModel";
import {initUserGroupModel} from "../models/UserGroup";
import uniteModels from "../models/UniteModels";

export function dbInit(sequelize) {

  sequelize.authenticate()
    .then(() => console.log('Connection to Database is established!'))
    .catch(() => {
      throw new Error('Database connection error!');
    });

  initUserModel(sequelize);
  initGroupModel(sequelize);
  initUserGroupModel(sequelize);
  uniteModels(sequelize);

  return {
    closeConnection: sequelize.close.bind(sequelize)
  };

}

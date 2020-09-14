import {GroupModel} from './GroupModel';
import {UserModel} from './UserModel';
import {UserGroupModel} from './UserGroup';

const uniteModels = () => {
  UserModel.belongsToMany(GroupModel, { through: UserGroupModel, foreignKey: 'user_id' });
  GroupModel.belongsToMany(UserModel, { through: UserGroupModel, foreignKey: 'group_id' });
};

export default uniteModels;

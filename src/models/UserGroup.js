import { Model } from 'sequelize';
export class UserGroupModel extends Model {}
export const initUserGroupModel = (sequelize) => {
  UserGroupModel.init({}, {
    sequelize,
    tableName: 'user_group',
    timestamps: false
  });
}

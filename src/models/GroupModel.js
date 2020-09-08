import { DataTypes, Model, Sequelize } from 'sequelize';
export class GroupModel extends Model {}
export const initGroupModel = (sequelize) => {
    GroupModel.init({
        name: DataTypes.STRING,
        premissions: Sequelize.ARRAY(Sequelize.TEXT),
    }, {
        sequelize,
        tableName: 'groups',
        timestamps: false
    });
}

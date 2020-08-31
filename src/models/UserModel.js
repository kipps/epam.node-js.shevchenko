import { DataTypes, Model } from 'sequelize';
export class UserModel extends Model {}
export const initUserModel = (sequelize) => {
    UserModel.init({
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        age: DataTypes.INTEGER,
        isdeleted: DataTypes.BOOLEAN
    }, {
        sequelize,
        tableName: 'users',
        timestamps: false
    });
}
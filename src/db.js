const { Sequelize, DataTypes, QueryTypes, Model } = require('sequelize');
const sequelize = new Sequelize('users', 'root', 'admin', {
    dialect: "postgres"
});

class User extends Model {}
User.init({
    pk: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    id: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    isdeleted: DataTypes.BOOLEAN
}, {
    sequelize,
    modelName: 'users '
});

sequelize.sync();

module.exports = {
    User
};
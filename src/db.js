const { Sequelize, DataTypes, QueryTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'kipps87', {
    dialect: "postgres"
});

class User extends Model {}
User.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    isdeleted: DataTypes.BOOLEAN
}, {
    sequelize,
    tableName: 'users',
    timestamps: false
});

sequelize.sync();

module.exports = {
    User
};
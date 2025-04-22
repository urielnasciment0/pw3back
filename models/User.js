const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true // Cria campos createdAt e updatedAt automaticamente
});

// Sincronizar o modelo com o banco de dados
// Sincronizar o modelo com o banco de dados
(async () => {
    await User.sync();
    console.log('Modelo User sincronizado com o banco de dados.');
})();

module.exports = User;


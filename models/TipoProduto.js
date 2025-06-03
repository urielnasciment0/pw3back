const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoProduto = sequelize.define('TipoProduto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
}, {
    timestamps: true // Cria campos createdAt e updatedAt automaticamente
});

// Sincronizar o modelo com o banco de dados
// Sincronizar o modelo com o banco de dados
(async () => {
    await TipoProduto.sync();
    console.log('Modelo TipoProduto sincronizado com o banco de dados.');
})();

module.exports = TipoProduto;


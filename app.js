const express = require('express');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rotas
app.use('/', userRoutes);



// Sincronizar modelos e iniciar servidor
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`Banco de dados SQLite sincronizado`);
    });
}).catch(err => {
    console.error('Erro ao sincronizar banco de dados:', err);
});
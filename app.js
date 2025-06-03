const express = require('express');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');
const tipoProdutoRoutes = require('./routes/tipoProdutoRoutes')

const app = express();
const cors = require('cors');
//configurar cors
app.use(cors({
    origin: '*', // Permitir todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));


// Middleware para parsear JSON
app.use(express.json());

// Rotas
app.use('/api/', userRoutes);
app.use('/api/', tipoProdutoRoutes);



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
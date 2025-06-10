const express = require('express');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');
const tipoProdutoRoutes = require('./routes/tipoProdutoRoutes')
const controllerUser = require('./controllers/UserController')
const app = express();
const cors = require('cors');
const jwt = require("jsonwebtoken")
require('dotenv').config()
const SECRET = process.env.SECRET; 

//configurar cors
app.use(cors({
    origin: '*', // Permitir todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));

function verifyJwt(req, res, next){

    const header = req.headers['authorization'];
   
    var token = ""
    if (header){
        token = header.split(" ")[1];
    }
    if (token==""){
        return res.status(401).json({msg:"precisa do token"})
    }

    //console.log(SECRET);

    jwt.verify(token,SECRET, (err,decode)=>{
        if (err){
            return res.status(500).json({msg:err.message})
        }
        //console.log(decode);
        req.userId = decode.id
    });

    next();
}


// Middleware para parsear JSON
app.use(express.json());
app.post("/v1/login",controllerUser.login)

app.use('/v1/',verifyJwt, tipoProdutoRoutes);
// Rotas
app.use('/v1/',verifyJwt, userRoutes);




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
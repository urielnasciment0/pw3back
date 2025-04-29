const express = require('express');
const User = require('./models/User');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
//app.unsubscribe(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('olá mundo, nov dsadso');
});

app.post('/',(req,res)=>{
    res.send('olá mundo, post');
});



app.post('/login',(req,res)=>{

    const {user, password} = req.body;
    
    if (!user || !password){
        return res.status(401).json({error:'usuário e senha são obrigatorios!!'})
    }

    if(user === 'admin' && password === '123'){
        return res.status(200).json({msg:'usuario logado com sucesso!!'})
    }else{
        return res.status(401).json({error:'usuário e senha invalido!!'})
    }

});

app.post('/user/save',(req,res)=>{
    const {name, email} = req.body;
    const user = {name, email};
    return res.status(200).json(user)
})

app.post("/user/add", async(req,res)=>{
    const {name, email} = req.body;

    if (!name || !email){
        return res.status(401).json({error:'name e password são obrigatorios!!'})
    }
    const usuario = new User({name,email});
    const user = await User.findOne({
        where:{
            email:email
        }
    });
    if (user)
    {
        return res.status(402).json({msg:"usuário já existe"})
    } else {
        const salvar = await usuario.save();
        return res.status(200).json(salvar)
    }
   }
)

app.get("/user/all", async (req,res)=>{
    const users = await User.findAll();
    return res.status(200).json(users)
});


app.listen(port,()=>{
    console.log(`servidor rodando na porta ${port}`)
})
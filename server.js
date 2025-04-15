const express = require('express');
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

app.listen(port,()=>{
    console.log(`servidor rodando na porta ${port}`)
})
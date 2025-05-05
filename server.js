const express = require('express');
const User = require('./models/User');
const Product = require('./models/Produtos');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
//app.unsubscribe(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('olá de novo, mundo!');
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
//#region  Usuário
app.put('/user/save/:id',async (req,res)=>{
    const {name, email} = req.body;
    const userBD = await User.findByPk(req.params.id);
    if (userBD){
        if (name){
            userBD.name = name;
        }

        if (email){
            userBD.email = email;
        }
        await userBD.save();
       return res.status(200).json(userBD);
    } else{

        return res.status(404).json({msg:"Usuário nao encontrado"})
    }
});

app.delete("/user/delete/:id",async(req,res)=>{
     const user = await User.findByPk(req.params.id);
     if (user){
        user.destroy();
        return res.status(202).json({msg:"Usuário excluido com sucesso!!"}); 
     }else{
        return res.status(404).json({msg:"Usuário não encontrado"});   
     }
});

app.get("/user/get/:id", async(req,res)=>{

    const user = await User.findByPk(req.params.id);

    if (user){
        return res.status(200).json(user);
    }else{
        return res.status(404).json({msg:"Usuário não encontrado"});   
    }

})

app.post("/user/add", async(req,res)=>{
    const {name, email, password} = req.body;

    if (!name || !email || !password){
        return res.status(401).json({error:'name, email, e password são obrigatorios!!'})
    }
    const usuario = new User({name,email, password});
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

//#endregion

//#region Produtos
app.get("/product/all", async (req,res)=>{
    const users = await Product.findAll();
    return res.status(200).json(users)
});

app.post("/product/add", async(req,res)=>{
    const {name, price, barCode} = req.body;

    if (!name || !price || !barCode ){
        return res.status(401).json({error:'name, barCode e price são obrigatorios!!'})
    }
    const usuario = new Product({barCode,name,price});
    const user = await Product.findOne({
        where:{
            barCode:barCode
        }
    });
    if (user)
    {
        return res.status(402).json({msg:"Produto já existe"})
    } else {
        const salvar = await usuario.save();
        return res.status(200).json(salvar)
    }
   }
)

//#endregion
app.listen(port,()=>{
    console.log(`servidor rodando na porta ${port}`)
})
const { where } = require('sequelize')
const User = require('../models/User')
const Sequelize = require('sequelize')
const jwt = require("jsonwebtoken")
require('dotenv').config()
const SECRET = process.env.SECRET; 

module.exports = class UserController {

    static async login(req, res){
        const {user, password}  = req.body;

        const userBD = await User.findOne({where:{email:user}})
        if (!userBD){
            return res.status(404).json({msg:"usuário não encontrado"})    
        }

        if (userBD.password != password){
            return res.status(401).json({msg:"senha inválda"})    
        }
        //console.log(SECRET);
        jwt.sign({id:userBD.id},SECRET,{expiresIn:300}, (err,token)=>{
            if (err){
                return res.status(500).json({error:err.message})
            }
            return res.status(200).json({msg:"logado com suceso!",token:token})
        })

        
        
    }

     static async List(req, res, next) {

        const users = await User.findAll();
        res.status(200).json({ users: users })
    }

    static  async create(req,res, next){
        const { name, email, password } = req.body
        if (!name) {
            res.status(422).json({ message: 'o nome é obrigatório' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'o Email é obrigatório' })
            return
        }

        const userExist = await User.findOne({ where: { email: email } })

        if (userExist) {
            res.status(422).json({ message: 'email já cadastrado' })
            return
        }

        const user = new User({
            name,
            email,
            password,
        })
        try {
            const save = await user.save()
            res.status(201).json({ user: user, message: "Usuário salvo com sucesso!" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }

    static async delete(req,res,next) {
        const { id } = req.params
        if (!id) {
            res.status(422).json({ message: 'o id é obrigatório' })
            return
        }

        const user = await User.findByPk(id)
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' })
            return
        }

        try {
            await user.destroy()
            res.status(200).json({ message: 'Usuário deletado com sucesso!' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }

    static async getById(req, res,next){
         const { id } = req.params
        if (!id) {
            res.status(422).json({ message: 'o id é obrigatório' })
            return
        }

        const user = await User.findByPk(id)
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' })
            return
        }

        res.status(200).json({ user: user })
    }
    
    static  async update(req,res, next){
        const { name, email, password } = req.body
        const { id } = req.params
        if (!id) {
            res.status(422).json({ message: 'o id é obrigatório' })
            return
        }
        
        if (!name) {
            res.status(422).json({ message: 'o nome é obrigatório' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'o Email é obrigatório' })
            return
        }

        const userExist = await User.findByPk(id)
        if (!userExist) {
            res.status(404).json({ message: 'Usuário não encontrado' })
            return
        }
        
       userExist.name = name
       userExist.email = email
       userExist.password = password

        try {
            const save = await userExist.save()
            res.status(200).json({ user: userExist, message: "Usuário salvo com sucesso!" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }




}
const { where } = require('sequelize')
const User = require('../models/User')
const Sequelize = require('sequelize')

module.exports = class UserController {

     static async List(req, res, next) {

        const users = await User.findAll();
        res.status(200).json({ users: users })
    }

    static  async create(req,res, next){
        const { name, email, age } = req.body
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
            age,
        })
        try {
            const save = await user.save()
            res.status(201).json({ user: user, message: "Usuário salvo com sucesso!" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }


}
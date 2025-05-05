const { where } = require('sequelize')
const User = require('../models/User')
const Sequelize = require('sequelize')

module.exports = class UserController {

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

    static async delete(req, res, next){
        const userExist = await User.findByPk(req.params.id);
        if (!userExist) {
            res.status(422).json({ message: 'usuário não existe'})
            return
        }
        const apagar = await userExist.destroy();
        res.status(200).json({ message: 'usuário excluído com sucesso'})
        return
    }

    static async update(req, res, next){
        const {name, email, password, id} = req.body;

        const userExist = await User.findByPk(id);
        if (!userExist) {
            res.status(422).json({ message: 'usuário não existe'})
            return
        }

        userExist.name = name;
        userExist.email = email;
        userExist.password = password;
        await userExist.save();

        res.status(200).json({ userExist})
        return
    }


}
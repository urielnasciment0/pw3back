const { where } = require('sequelize')
const TipoProduto = require('../models/TipoProduto')
const Sequelize = require('sequelize')

module.exports = class TipoProdutoController {

    static async List(req, res, next) {

        const tipos = await TipoProduto.findAll();
        res.status(200).json({ tipos: tipos })
    }

    static  async create(req,res, next){
        const { descricao } = req.body
        if (!descricao) {
            res.status(422).json({ message: 'a descrição é obrigatória' })
            return
        }

        const tipoExist = await TipoProduto.findOne({ where: { descricao:descricao } })

        if (tipoExist) {
            res.status(422).json({ message: 'tipo já cadastrado' })
            return
        }
        
        // const user = new TipoProduto({
        const tipo = new TipoProduto({
            descricao,
        })
        try {
            const save = await tipo.save()
            res.status(201).json({ tipo: tipo, message: "Tipo salvo com sucesso!" })
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

        const tipoProduto = await TipoProduto.findByPk(id)
        if (!tipoProduto) {
            res.status(404).json({ message: 'Tipo não encontrado' })
            return
        }

        try {
            await tipoProduto.destroy()
            res.status(200).json({ message: 'Tipo deletado com sucesso!' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }

    // static async getById(req, res,next){
    //      const { id } = req.params
    //     if (!id) {
    //         res.status(422).json({ message: 'o id é obrigatório' })
    //         return
    //     }

    //     const user = await User.findByPk(id)
    //     if (!user) {
    //         res.status(404).json({ message: 'Usuário não encontrado' })
    //         return
    //     }

    //     res.status(200).json({ user: user })
    // }
    
    static  async update(req,res, next){
        const { descricao } = req.body
        const { id } = req.params
        if (!id) {
            res.status(422).json({ message: 'o id é obrigatório' })
            return
        }
       //user
        if (!descricao) {
            res.status(422).json({ message: 'o tipo é obrigatório' })
            return
        }
    

        const tipoExist = await TipoProduto.findByPk(id)
        if (!tipoExist) {
            res.status(404).json({ message: 'Tipo não encontrado' })
            return
        }
        
       tipoExist.descricao = descricao
    

        try {
            const save = await tipoExist.save()
            res.status(200).json({ tipo: tipoExist, message: "Tipo salvo com sucesso!" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }




}
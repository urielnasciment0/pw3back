const { where } = require('sequelize')
const Cliente = require('../modelsCliente')
const Sequelize = require('sequelize')
const jwt = require("jsonwebtoken")
require('dotenv').config()
const SECRET = process.env.SECRET; 

module.exports = class ClienteController {

     static async List(req, res, next) {

        const clientes = await Cliente.findAll();
        res.status(200).json({ clientes: clientes })
    }

    static  async create(req,res, next){
        const { name, adress, cpf } = req.body
        if (!name) {
            res.status(422).json({ message: 'o nome é obrigatório' })
            return
        }
        if (!adress) {
            res.status(422).json({ message: 'o Endereço é obrigatório' })
            return
        }
        if (!cpf) {
            res.status(422).json({ message: 'o Cpf é obrigatório' })
            return
        }

        const clienteExist = await Cliente.findOne({ where: { cpf: cpf } })

        if (clienteExist) {
            res.status(422).json({ message: 'cpf já cadastrado' })
            return
        }

        const cliente = new Cliente({
            name,
            adress,
            cpf,
        })
        try {
            const save = await cliente.save()
            res.status(201).json({ cliente: cliente, message: "Cliente salvo com sucesso!" })
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

        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            res.status(404).json({ message: 'Cliente não encontrado' })
            return
        }

        try {
            await cliente.destroy()
            res.status(200).json({ message: 'Cliente deletado com sucesso!' })
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

        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            res.status(404).json({ message: 'cliente não encontrado' })
            return
        }

        res.status(200).json({ cliente: cliente })
    }
    
    static  async update(req,res, next){
        const { name, adress, cpf } = req.body
        const { id } = req.params
        if (!id) {
            res.status(422).json({ message: 'o id é obrigatório' })
            return
        }
        
        if (!name) {
            res.status(422).json({ message: 'o nome é obrigatório' })
            return
        }
        if (!adress) {
            res.status(422).json({ message: 'o endereço é obrigatório' })
            return
        }
        if (!cpf) {
            res.status(422).json({ message: 'o cpf é obrigatório' })
            return
        }

        const clienteExist = await Cliente.findByPk(id)
        if (!clienteExist) {
            res.status(404).json({ message: 'Cliente não encontrado' })
            return
        }
        
       clienteExist.name = name
       clienteExist.adress = adress
       clienteExist.cpf = cpf

        try {
            const save = await clienteExist.save()
            res.status(200).json({ cliente: clienteExist, message: "Cliente salvo com sucesso!" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }
}
const express = require('express');
const router = express.Router();
const TipoProdutoController = require('../controllers/TipoProdutoController');



// Rotas CRUD
router.get('/tipoProduto', TipoProdutoController.List);
router.post('/tipoProduto', TipoProdutoController.create);
router.delete('/tipoProduto/delete/:id', TipoProdutoController.delete);
// router.get('/tipoProduto/:id', TipoProdutoController.getById);
router.put('/tipoProduto/:id', TipoProdutoController.update);

module.exports = router
//router.get('/tipoProduto', TipoProdutoController.list);
//router.get('/tipoProduto/:id', TipoProdutoController.show);
//router.put('/tipoProduto/:id', TipoProdutoController.update);
//router.delete('/tipoProduto/:id', TipoProdutoController.delete);

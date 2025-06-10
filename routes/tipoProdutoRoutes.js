const express = require('express');
const router = express.Router();
const TipoProdutoController = require('../controllers/TipoProdutoController');



// Rotas CRUD
router.get('/tipoproduto', TipoProdutoController.List);
router.post('/tipoproduto', TipoProdutoController.create);
router.delete('/tipoproduto/delete/:id', TipoProdutoController.delete);
// router.get('/tipoProduto/:id', TipoProdutoController.getById);
router.put('/tipoproduto/:id', TipoProdutoController.update);

module.exports = router
//router.get('/tipoProduto', TipoProdutoController.list);
//router.get('/tipoProduto/:id', TipoProdutoController.show);
//router.put('/tipoProduto/:id', TipoProdutoController.update);
//router.delete('/tipoProduto/:id', TipoProdutoController.delete);

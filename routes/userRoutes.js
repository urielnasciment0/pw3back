const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');



// Rotas CRUD
router.get('/users', userController.List);
router.post('/users', userController.create);

module.exports = router
//router.get('/users', UserController.list);
//router.get('/users/:id', UserController.show);
//router.put('/users/:id', UserController.update);
//router.delete('/users/:id', UserController.delete);

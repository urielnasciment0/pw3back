const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');



// Rotas CRUD
router.get('/users', userController.List);
router.post('/users', userController.create);
router.delete('/users/delete/:id', userController.delete);
router.get('/users/:id', userController.getById);
router.put('/users/:id', userController.update);


module.exports = router
//router.get('/users', UserController.list);
//router.get('/users/:id', UserController.show);
//router.put('/users/:id', UserController.update);
//router.delete('/users/:id', UserController.delete);

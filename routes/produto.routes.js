const express = require('express');
let router = express.Router();
const ProdutoController = require('../controllers/produto.controller');
const {
    body,
    param
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, ProdutoController.get)
    .post(AuthController.checkAuth, [body('designacao').isString(),
        body('referencia').isString(),
        body('resumo').isString(),
        body('precosiva').isString(),
        body('iva').isString(),
        body('precociva').isString(),
        body('stock').isString(),
        body('unidade').isString()
    ], ProdutoController.create);

router.route("/deactivate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], ProdutoController.deactivate);

router.route("/activate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], ProdutoController.activate);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], ProdutoController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], ProdutoController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], ProdutoController.delete);

module.exports = router;
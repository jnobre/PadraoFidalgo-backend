const express = require('express');
let router = express.Router();
const EncomendaController = require('../controllers/encomenda.controller');
const {
    body,
    param
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, EncomendaController.get)
    .post(AuthController.checkAuth, [body('referencia').isString(),
        body('quantidade').isString(),
        body('cliente').isString(),
        body('data_entrega').isISO8601(),
        body('estado').isString(),
        body('comentarios.*.comentario').isString(),
        body('comentarios.*.user').isString(),
        body('comentarios.*.date').isString()
    ], EncomendaController.create);

router.route("/deactivate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], EncomendaController.deactivate);

router.route("/activate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], EncomendaController.activate);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], EncomendaController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], EncomendaController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], EncomendaController.delete);

module.exports = router;
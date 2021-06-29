const express = require('express');
let router = express.Router();
const UserController = require('../controllers/user.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post([body('name').isString(),
        body('type').isAlpha(),
        body('nif').isString(),
        body('mobile').isString(),
        body('location.city').isString(),
        body('location.address').isString(),
        body('location.country').isString(),
        body('auth.username').isAlphanumeric(),
        body('auth.password').isString(),
        body('auth.email').isString(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet),
        sanitizeBody('nif').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('mobile').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('auth.email').whitelist(CONFIG.sanitize.alphabet),
        sanitizeBody('description').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('location.city').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('location.address').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('location.country').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], UserController.create)
    .get(AuthController.checkAuth, UserController.get);

router.route("/deactivate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], UserController.deactivate);

router.route("/activate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], UserController.activate);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], UserController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], UserController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], UserController.delete);

module.exports = router;
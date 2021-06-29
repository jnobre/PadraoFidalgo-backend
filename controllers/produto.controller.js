const Produto = require('../models/produto.model');
const {
    validationResult
} = require('express-validator');
const ProdutoMessages = require("../messages/produto.messages");

exports.get = (req, res) => {

    Produto.find(req.query).populate("produtos").exec((error, produtos) => {
        if (error) throw error;
        let message = ProdutoMessages.success.s2;

        if (produtos.length < 0)
            message = ProdutoMessages.success.s5;

        message.body = produtos;
        return res.status(message.http).send(message);
    });

}
/**
    designacao: String,
    referencia: Number,
    resumo: String,
    precosiva: Number,
    iva: Number,
    precociva: Number,
    stock: Number,
    unidade: String,
 */
exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Produto({
        designacao: req.body.designacao,
        referencia: req.body.referencia,
        resumo: req.body.resumo,
        precosiva: req.body.precosiva,
        iva: req.body.iva,
        precociva: req.body.precociva,
        stock: req.body.stock,
        unidade: req.body.unidade,
    }).save((error, produto) => {
        if (error) throw error;
        produto.populate("produtos", (error) => {
            if (error) throw error;
            let message = ProdutoMessages.success.s0;
            message.body = produto;
            return res.header("location", "/produtos/" + produto._id).status(message.http).send(message);
        });

    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Produto.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, produto) => {
        if (error) throw error;
        if (!produto) return res.status(ProdutoMessages.error.e0.http).send(ProdutoMessages.error.e0);
        produto.populate("produtos", (error) => {
            if (error) throw error;
            let message = ProdutoMessages.success.s1;
            message.body = produto;
            return res.status(message.http).send(message);
        });
    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Produto.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(ProdutoMessages.error.e0.http).send(ProdutoMessages.error.e0);
        return res.status(ProdutoMessages.success.s3.http).send(ProdutoMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Produto.findOne({
        _id: req.params.id
    }).populate("produtos").exec((error, produto) => {
        if (error) throw error;
        if (!produto) return res.status(ProdutoMessages.error.e0.http).send(ProdutoMessages.error.e0);
        let message = ProdutoMessages.success.s2;
        message.body = produto;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Produto.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;
        
        if (result.n <= 0) return res.status(ProdutoMessages.error.e0.http).send(ProdutoMessages.error.e0);
        return res.status(ProdutoMessages.success.s6.http).send(ProdutoMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Produto.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;
        
        if (result.n <= 0) return res.status(ProdutoMessages.error.e0.http).send(ProdutoMessages.error.e0);
        return res.status(ProdutoMessages.success.s4.http).send(ProdutoMessages.success.s4);

    });
}
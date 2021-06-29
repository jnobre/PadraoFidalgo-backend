const Encomenda = require('../models/encomenda.model');
const {
    validationResult
} = require('express-validator');
const EncomendaMessages = require("../messages/encomenda.messages");

exports.get = (req, res) => {

    Encomenda.find(req.query).populate("comments.user", "name").exec((error, encomendas) => {
        if (error) throw error;

        let message = EncomendaMessages.success.s2;

        if (encomendas.length < 0)
            message = EncomendaMessages.success.s5;

        message.body = encomendas;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Encomenda({
        referencia: req.body.referencia,
        quantidade: req.body.quantidade,
        estado: req.body.estado,
        data_entrega: req.body.data_entrega,
        cliente: req.body.cliente,
        comentarios: req.body.comentarios
    }).save((error, encomenda) => {
        if (error) throw error;
        let message = EncomendaMessages.success.s0;
        message.body = encomenda;
        return res.header("location", "/encomendas/" + encomenda._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Encomenda.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, encomenda) => {
        if (error) throw error;
        if (!encomenda) return res.status(EncomendaMessages.error.e0.http).send(EncomendaMessages.error.e0);

        let message = EncomendaMessages.success.s1;
        message.body = encomenda;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Encomenda.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(EncomendaMessages.error.e0.http).send(EncomendaMessages.error.e0);
        return res.status(EncomendaMessages.success.s3.http).send(EncomendaMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Encomenda.findOne({
        _id: req.params.id
    }).populate("comments.user", "name").exec((error, encomenda) => {
        if (error) throw error;
        if (!encomenda) return res.status(EncomendaMessages.error.e0.http).send(EncomendaMessages.error.e0);
        let message = EncomendaMessages.success.s2;
        message.body = encomenda;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Encomenda.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(EncomendaMessages.error.e0.http).send(EncomendaMessages.error.e0);
        return res.status(EncomendaMessages.success.s6.http).send(EncomendaMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Encomenda.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(EncomendaMessages.error.e0.http).send(EncomendaMessages.error.e0);
        return res.status(EncomendaMessages.success.s4.http).send(EncomendaMessages.success.s4);

    });
}
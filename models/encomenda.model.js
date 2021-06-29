const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const encomendaSchema = new Schema({
    referencia: String,
    quantidade: String,
    estado: String,
    data_entrega: {
        type: Date,
        default: Date.now
    },
    cliente: {
        type: String,
        ref: CONFIG.mongodb.collections.user
    },
    comentarios: [{
        comentario: String,
        user: {
            type: String,
            ref: CONFIG.mongodb.collections.user
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    activo: {
        type: Boolean,
        default: true
    }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.encomenda, encomendaSchema);
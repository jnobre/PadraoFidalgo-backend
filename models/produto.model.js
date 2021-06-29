const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');
/**
 * Designação: string
 * referência: string
 * resumo: string
 * preço sem IVA: float
 * valor IVA : int
 * preço com IVA: float
 * Stock
 * Unidade: string (enum ??)
 */
const produtoSchema = new Schema({
    designacao: String,
    referencia: String,
    resumo: String,
    precosiva: String,
    iva: String,
    precociva: String,
    stock: String,
    unidade: String,
    registration_date: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.produto, produtoSchema);
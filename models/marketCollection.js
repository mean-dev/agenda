/**
 * Shema for collection 0 (Median values)
 * @type {*|exports}
 */

var mongoose = require('mongoose');

var MarketSchema = new mongoose.Schema({
    created_at: Date,
    updated_at: { type: Date, default: Date.now },
    type: String,
    name: String,
    year: Number,
    quarter: Number,
    currencycode: String,
    roc: Number,
    roa: Number,
    roe: Number,
    ros: Number,
    kgv: Number,
    kbv: Number,
    kuv: Number,
    kcfv: Number
});

exports.marketSchema = MarketSchema;


var marketFields = {
    roc: "Roc %",
    roa: "Roa",
    roe: "Roe",
    ros: "Ros"
};

exports.marketFields = marketFields;
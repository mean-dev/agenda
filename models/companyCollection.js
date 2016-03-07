/**
 * Shema for collection 2 (companies)
 * @type {*|exports}
 */

var mongoose = require('mongoose');

// SHEMA COMPANIES
var companyShema = new mongoose.Schema({
    cik: String,
    name: String,
    display_name: String,
    symbol: String,
    entityid: Number,
    exchange: String,
    sic_code: Number,
    sic_description: String,
    created_at: Date,
    updated_at: Date,
    ask: Number,
    bid: Number,
    avgDailyVolume: Number,
    volume: Number,
    lastTradeDate: Date,
    lastTradeTime: Date,
    lastPrice: Number,
    marketCap: Number,
    dividendPayDate: String,
    spread: Number,
    formtenk: [{ type: mongoose.Schema.Types.ObjectId, ref: 'form10k' }],
    market: {type: mongoose.Schema.Types.ObjectId, ref: 'market'}
});

exports.companiesShema = companyShema;

var companyFields = {
    symbol: "Symbol",
    exchange: "Exchange",
    avgDailyVolume: "Daily Volume",
    marketCap: "Market cap"
};

exports.companyFields = companyFields;
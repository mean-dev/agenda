var mongoose = require('mongoose');

var CollecDon0Schema = new mongoose.Schema({
    median: Number,
    sector1median: Number,
    sector2median: Number,
    sector3median: Number,
    collecDon1: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CollecDon1' }]
});


// SHEMA COMPANIES
var companiesShemaFields = {
    cik: String,
    name: String,
    symbol: String,
    exchange: String,
    created_at: Date,
    updated_at: Date,
    marketCap: Number,
    display_name: String,
    entityid: Number,
    sic_code: Number,
    sic_description: String,
    ask: Number,
    bid: Number,
    avgDailyVolume: Number,
    volume: Number,
    lastTradeDate: Date,
    lastTradeTime: Date,
    lastPrice: Number,
    dividendPayDate: String,
    spread: Number,
    formtenk: [{ type: mongoose.Schema.Types.ObjectId, ref: 'formtenk' }]
};

var companiesShemaVisibleFields = {
    symbol: "Symbol",
    exchange: "Exchange",
    avgDailyVolume: "Daily Volume",
    marketCap: "Market cap"
};

var companiesShema = new mongoose.Schema(companiesShemaFields);


// SHEMA FORM10K

var form10kSchemaFields = {
    "ros": Number,
    "roe": Number,
    "roa": Number,
    "roc": Number,
    "symbol": String,
    "cik": String,
    "name": String,
    "period": String,
    "year": Number,
    "quarter": Number,
    "usdconversionrate": String,
    "receiveddate": Date,
    "periodlengthcode": String,
    "periodlength": Number,
    "periodenddate": Date,
    "currencycode": String,
    "dividendspaid": Number,
    "effectofexchangerateoncash": String,
    "capitalexpenditures": Number,
    "cashfromfinancingactivities": Number,
    "cashfrominvestingactivities": Number,
    "cashfromoperatingactivities": Number,
    "cfdepreciationamortization": Number,
    "investmentchangesnet": Number,
    "created_at": Date,
    "updated_at": Date,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'company' }
};


var form10kSchemaVisibleFields = {
    ros: "Ros",
    roe: "Roe",
    roa: "Roa",
    roc: "Roc",
    dividendspaid: "Dividends paid"
}

var form10kSchema = new mongoose.Schema(form10kSchemaFields);


exports.MediansShema = CollecDon0Schema;

exports.CompaniesShema = companiesShema;
exports.companiesShemaFields = companiesShemaFields;
exports.companiesShemaVisibleFields = companiesShemaVisibleFields;


exports.Form10kShema = form10kSchema;
exports.form10kSchemaFields = form10kSchemaFields;
exports.form10kSchemaVisibleFields = form10kSchemaVisibleFields;
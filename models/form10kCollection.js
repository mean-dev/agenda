/**
 * Shema for form10k
 * @type {*|exports}
 */

var mongoose = require('mongoose');

// SHEMA FORM10K
var form10kSchema = new mongoose.Schema({
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
});

exports.form10kSchema = form10kSchema;

var form10kFields = {
    "formtenk.ros": "Ros",
    "formtenk.roe": "Roe",
    "formtenk.roa": "Roa",
    "formtenk.roc": "Roc %"
};

exports.form10kFields = form10kFields;
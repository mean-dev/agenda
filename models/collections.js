var mongoose = require('mongoose');

var db;
if (process.env.VCAP_SERVICES) {
    var env = JSON.parse(process.env.VCAP_SERVICES);
    db = mongoose.createConnection(env['mongodb-2.2'][0].credentials.url);
} else {
    db = mongoose.connect('mongodb://127.0.0.1/agendaapp');
}

exports.db = db;

var CollecDon0Schema = new mongoose.Schema({
    median: Number,
    sector1median: Number,
    sector2median: Number,
    sector3median: Number,
    collecDon1: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CollecDon1' }]
});


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
    formtenk: [{ type: mongoose.Schema.Types.ObjectId, ref: 'form10k' }]
});
var companiesShemaVisibleFields = {
    symbol: "Symbol",
    exchange: "Exchange",
    avgDailyVolume: "Daily Volume",
    marketCap: "Market cap"
};
//exports.companiesShemaFields = companiesShemaFields;
exports.companiesShemaVisibleFields = companiesShemaVisibleFields;
exports.companiesModel = db.model('company', companyShema);

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
var form10kSchemaVisibleFields = {
    ros: "Ros",
    roe: "Roe",
    roa: "Roa",
    roc: "Roc",
    dividendspaid: "Dividends paid"
}
//exports.form10kSchemaFields = form10kSchema;
exports.form10kSchemaVisibleFields = form10kSchemaVisibleFields;
exports.form10kModel = db.model('form10k', form10kSchema);



// SHEMA Screens
var screensShema = new mongoose.Schema({
    "title": String,
    "filter": String
});
exports.screensModel = db.model('screens', screensShema);

exports.MediansShema = CollecDon0Schema;
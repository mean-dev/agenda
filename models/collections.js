var mongoose = require('mongoose');

var db;
if (process.env.VCAP_SERVICES) {
    var env = JSON.parse(process.env.VCAP_SERVICES);
    db = mongoose.createConnection(env['mongodb-2.2'][0].credentials.url);
} else {
    db = mongoose.connect('mongodb://127.0.0.1/agendaapp');
}

exports.db = db;

// Companies
var companiesShema = require('./companyCollection.js').companiesShema;
exports.companiesModel = db.model('company', companiesShema);

// form 10k
var form10kSchema = require('./form10kCollection.js').form10kSchema;
exports.form10kModel = db.model('form10k', form10kSchema);

// Market Collection
var marketSchema = require('./marketCollection.js').marketSchema;
exports.marketModel = db.model('market', marketSchema);

// Screen Collection
var screensShema = require('./screenCollection.js').screensShema;
exports.screensModel = db.model('screen', screensShema);



// Connect to MongoDB using Mongoose
var mongoose = require('mongoose');
var db;
if (process.env.VCAP_SERVICES) {
    var env = JSON.parse(process.env.VCAP_SERVICES);
    db = mongoose.createConnection(env['mongodb-2.2'][0].credentials.url);
} else {
    db = mongoose.createConnection('localhost', 'agendaapp');
}

// Medians (Shema0)
var MediansShema = require('../models/collections.js').MediansShema;
var MediansModel = db.model('MediansShema', MediansShema);

// Companies (Shema1)
var CompaniesShema = require('../models/collections.js').CompaniesShema;
var CompaniesModel = db.model('CompaniesModel', CompaniesShema);
var companiesShemaVisibleFields = require('../models/collections.js').companiesShemaVisibleFields;

// Form10k (Shema2)
var Form10kShema = require('../models/collections.js').Form10kShema;
var Form10kModel = db.model('Form10kModel', Form10kShema);
var form10kSchemaVisibleFields = require('../models/collections.js').form10kSchemaVisibleFields;

//require('../models/dummy.js');

// GENERATE FILTERS
var fields1 = {};
fields1 = companiesShemaVisibleFields;
for(var prop in form10kSchemaVisibleFields ){
    fields1[prop] = form10kSchemaVisibleFields[prop];
}

var fields2 = {
    ">": "Greater than",
    "<": "Less than",
    "=": "Equal to",
    "!": "Not equal to"
};


exports.index = function(req, res) {

    CompaniesModel.find({}, function(error, companies) {

        var ids = [];

        var _companies = [];

        for(var index in companies) {

            var company = companies[index];

            Form10kModel.find({
                '_id': { $in: companies[index]['formtenk'] }
            }, function(err, docs){
                if(docs.length > 0) {
                    company['formtenk'] = docs;
                   _companies.push(company);
                }
            });

            console.log(_companies);

        }

        res.render('index', { companies: companies, fields1:fields1, fields2:fields2});
    });

};

// Api routes. Return list of companies
exports.companies_list = function(req, res) {

    CompaniesModel.find({}, function(error, elements) {
        res.json(elements);
    });
};

// Api routes. Return specific company by Id
exports.company = function(req, res) {
    res.render('index');
};

// Create new company
exports.company_create = function(req, res) {
    res.render('index');
};

// Store new 10k form
exports.form10k_store = function(req, res) {
    res.render('index');
};

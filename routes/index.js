// db connection
var db = require('../models/collections.js').db;

// Companies (Shema1)
var companiesModel = require('../models/collections.js').companiesModel;

// Screens
var screensModel = require('../models/collections.js').screensModel;

//require('../models/dummy.js');

// GENERATE FILTERS. Conacte fields from company and form10k
var fields1 = require('../models/companyCollection.js').companyFields;
var _fields1 = require('../models/form10kCollection.js').form10kFields;
for(var prop in _fields1 ){
    fields1[prop] = _fields1[prop];
}

// STATIC second select
var fields2 = {
    ">": "Greater than",
    "<": "Less than",
    "=": "Equal to",
    "!": "Not equal to"
};

// Median select
var fields3 = require('../models/marketCollection.js').marketFields;

exports.index = function(req, res) {

        companiesModel
            .find({})
            .populate(['formtenk','market'])
            .exec(function (error, companies) {
                // get all screens
                screensModel.find({}).exec(function(err,screens){
                    res.render('index', { companies: companies, screens:screens, fields1:fields1, fields2:fields2, fields3:fields3});
                });
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

// Store new screen
exports.screen_store = function(req, res) {

    var _screen = req.body;

    _screen['filter']= JSON.stringify(_screen['filter']);

    var screen = new screensModel(_screen);
    screen.save(function(err){

    });
};

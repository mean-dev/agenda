// db connection
var db = require('../models/collections.js').db;

// Companies (Shema1)
var companiesModel = require('../models/collections.js').companiesModel;
var companiesShemaVisibleFields = require('../models/collections.js').companiesShemaVisibleFields;

// Form10k (Shema2)
var form10kSchemaVisibleFields = require('../models/collections.js').form10kSchemaVisibleFields;

// Screens
var screensModel = require('../models/collections.js').screensModel;

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

        companiesModel
            .find({})
            .populate('formtenk')
            .exec(function (error, companies) {

                // get all screens
                screensModel.find({}).exec(function(err,screens){
                    res.render('index', { companies: companies, screens:screens, fields1:fields1, fields2:fields2, fields3:[]});
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

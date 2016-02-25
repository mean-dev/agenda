
var mongoose = require('mongoose');
var express = require('express');
var app = express();
app.use(express.static("/webhome/agenda"));

app.get('/api/companies', function(req, res) {
    var companies = require('./companies.json');
    return res.send(companies);
});

app.listen(1337, function(){
    console.log('Express server listening on port 1337');
});


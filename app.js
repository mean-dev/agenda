
var express = require('express');
var routes = require('./routes');

var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);

app.set('port', process.env.VCAP_APP_PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
    if(!err) return next();
    console.log(err.stack);
    res.json({error: true});
});

// Main App Page
app.get('/', routes.index);

// MongoDB API Routes
app.get('/api/companies', routes.companies_list);
app.get('/api/companies/:company', routes.company);
app.post('/api/companies', routes.company_create);
app.post('/api/companies/:company/form10k/', routes.form10k_store);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
var express = require('express'); //modulo para parte de routing 
var nunjucks = require('nunjucks');
const apis = require('./endpoints');
var app = express();

// Setup nunjucks templating engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('port', process.env.PORT || 3000);

// Home page
app.get('/', function(req, res) {
    res.render('layout.html', {
        page: 'example',
        port: app.get('port')
    });
});

// Other example
app.get('/example', function(req, res) {
    res.render('example.html', {
        page: 'example',
        port: app.get('port')
    });
});

// search example
app.get('/search', function(req, res) {
    res.render('search.html', {
        page: 'search',
        port: app.get('port')
    });
});
/* 
//result route
app.get('/result', function(req, res) {
    apis.getMoviesByQueryTerm(req.query.search_input, function(response){
        searchResultsData = response.data.data.movies
        res.render('result.html', {
            page: 'result',
            port: app.get('port'),
            term: req.query.search_input,
            searchResultsData: searchResultsData
        });
    })   
}); */

//result with limit route
app.get('/result', function(request, res) {
    apis.getMoviesByQueryTermAndLimit(request.query.search_input, request.query.limit_value, function(response){
        searchResultsData = response.data.data.movies
        res.render('result.html', {
            page: 'result',
            port: app.get('port'),
            term: request.query.search_input,
            searchResultsData: searchResultsData
        });
    })   
});



// Kick start our server
app.listen(app.get('port'), function() {
    console.log('Server started on port', app.get('port'));
});

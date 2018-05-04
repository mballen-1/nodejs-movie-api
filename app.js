var express = require('express');
var nunjucks = require('nunjucks');

var app = express();
console.log("dirname: "+__dirname);
app.use('/static', express.static(__dirname + '/static'));


// Setup nunjucks templating engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('port', process.env.PORT || 3000);

// Home page
app.get('/', function(req, res) {
    res.render('layout.html', {
        page: 'home',
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

// Other example
app.get('/movie-page-full.html', function(req, res) {
    res.render('movie-page-full.html', {
        page: 'movie-details',
        port: app.get('port')
    });
});


// Kick start our server
app.listen(app.get('port'), function() {
    console.log('Server started on port', app.get('port'));
});


//result route by search term and limit
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
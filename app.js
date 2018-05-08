var express = require('express');
var nunjucks = require('nunjucks');
const apis = require('./endpoints');


var app = express();
//console.log("dirname: "+__dirname);
app.use('/static', express.static(__dirname + '/static'));


// Setup nunjucks templating engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('port', process.env.PORT || 3000);

// Other example
app.get('/example', function(req, res) {
    res.render('example.html', {
        page: 'example',
        port: app.get('port')
    });
});

// Other example
app.get('/result/:id', function(req, res) {
    apis.getMovieById( req.params.id, function(response){
        searchResultsData = response.data.data.movie,
       // console.log(searchResultsData),
        console.log("TITLE ->" + searchResultsData.title_english),
        res.render('movie-page-full.html', {
            page: 'movie-page-full',
            port: app.get('port'),
            searchResultsData : searchResultsData,
        });
    });    
});

app.get('/by_term', function(req, res) {
    apis.getMoviesByQueryTerm( req.query.query_term, function(response){
        console.log("term---->" + req.query.query_term),
        searchResultsData = response.data.data.movies
        res.render('layout.html', {
            page: 'home',
            port: app.get('port'),
            searchResultsData : searchResultsData,
        });
    });    
});

//index route
app.get('/', function(req, res) {
    apis.getCurrentMoviesDefault(function(response){
        searchResultsData = response.data.data.movies
        randomNumber = Math.floor(Math.random()*20),
        res.render('layout.html', {
            page: 'home',
            port: app.get('port'),
            searchResultsData: searchResultsData,
            randomNumber: randomNumber
        });
    });
});

app.get('/index.html', function(req, res) {
    console.log("entre a index")
    apis.getCurrentMoviesDefault(function(response){
        searchResultsData = response.data.data.movies;
        randomNumber = Math.floor(Math.random()*20),
        res.render('layout.html', {
            page: 'home',
            port: app.get('port'),
            searchResultsData: searchResultsData,
            randomNumber: randomNumber
        });
    });  
});



// Kick start our server
app.listen(app.get('port'), function() {
    console.log('Server started on port', app.get('port'));
});

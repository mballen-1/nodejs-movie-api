var express = require('express');
var nunjucks = require('nunjucks');
const apis = require('./endpoints');


var app = express();
console.log("dirname: "+__dirname);
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
app.get('/:id', function(req, res) {
    apis.getMovieById( req.params.id, function(response){
        //console.log(response.data),
        searchResultsData = response.data.data.movie
        console.log("TITLE ->" +searchResultsData.title_english)
        res.render('movie-page-full.html', {
            page: 'movie-page-full',
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


//result route by search term and limit
app.get('/result', function(request, res) {
    apis.getMoviesByQueryTermAndLimit(request.query.search_input, request.query.limit_value, function(response){
        searchResultsData = response.data.data.movies
        res.render('example.html', {
            page: 'example',
            port: app.get('port'),
            term: request.query.search_input,
            searchResultsData: searchResultsData
        });
    })   
});


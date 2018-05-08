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
app.get('/movie-page-full.html', function(req, res) {
    var v1 = apis.q_term;
    apis.getMoviesByQueryTerm( v1, function(response){
        searchResultsData = response.data.data.movies
        res.render('movie-page-full.html', {
            page: 'movie-details',
            port: app.get('port'),
            searchResultsData : searchResultsData,
        });
    });    
});

//index route
app.get('/', function(req, res) {
    console.log("entre a index")
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
        console.log("entre")
        searchResultsData = response.data.data.movies
        res.render('result.html', {
            page: 'result',
            port: app.get('port'),
            term: request.query.search_input,
            searchResultsData: searchResultsData
        });
    })   
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(global.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


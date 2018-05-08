const axios = require('axios');
const app = require('./app');


module.exports = {

    getMoviesByQueryTerm(term, cb){
        axios.get('https://yts.am/api/v2/list_movies.json?query_term'+ term + '&sort_by=year').then(function(response){
            cb(response);
        })
        .catch(function (error){
            console.log(error);
        });
    },

    getMoviesByQueryTermAndLimit(term, limit, callback){
        axios.get('https://yts.am/api/v2/list_movies.json?query_term='+ term + '&limit=' + limit).then(function(response){
            callback(response);
        })
        .catch(function (error){
            console.log(error);
        });
    },

    getCurrentMoviesDefault(callback){
        axios.get('https://yts.am/api/v2/list_movies.json?minimum_rating=8.6').then(function(response){
            callback(response);
        })
        .catch(function (error){
            console.log(error);
        });
    },

    getMovieById(id, callback){
        console.log("id->"+ id);
        axios.get('https://yts.am/api/v2/movie_details.json?movie_'+id).then(function(response){
            callback(response);
        })
        .catch(function (error){
            console.log(error);
        });
    },




};
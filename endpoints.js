const axios = require('axios');

module.exports = {
    
    q_term:'',

    getMoviesByQueryTerm(term, cb){
        q_term = term,
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

    }

};
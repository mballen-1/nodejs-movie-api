const axios = require('axios');

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
    }




};
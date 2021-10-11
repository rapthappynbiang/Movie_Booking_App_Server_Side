//defining the routing function with and argument app which will be pass from server.js
module.exports = app =>{
    //requiring the movie controller
    const movie = require('../controllers/movie.controller'); 

    //import express router
    var router = require('express').Router();

    //Defining routes for finding all movies
    router.get("/movies", movie.findAllMovies);

    //Defining routes for finding a movie with provided _id
    router.get("/movies/:id", movie.findOne);

    //Defining routes for finding movies with status=RELEASED&title={title}&genres={genres}&artists={artists}&start_date={startdate}&end_date={enddate}
    // router.get("/GET/movies?status=RELEASED&title={title}&genres={genres}&artists={artists}&start_date={startdate}&end_date={enddate}", movie.findAllMovies);

    app.use("/api", router);
}
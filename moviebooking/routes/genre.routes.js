module.exports = app =>{
    const router = require('express').Router();
    const genres = require('../controllers/genre.controller');

    //GET/genres
     router.get("/genres", genres.findAllGenres);

     app.use('/api', router);
}
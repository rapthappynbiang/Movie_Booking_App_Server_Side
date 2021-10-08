module.exports = app =>{
    const router = require('express').Router();
    const genres = require('../controllers/genre.controller');

    //GET/artists
     router.get("/GET/genres", genres.findAllGenres);

     app.use('/app/api', router);
}
module.exports = app =>{

    console.log("I am inside artists router");
    const router = require('express').Router();
    const artists = require('../controllers/artist.controller');

    //GET/artists
     router.get("/GET/artists", artists.findAllArtists);

     app.use('/app/api', router);
}
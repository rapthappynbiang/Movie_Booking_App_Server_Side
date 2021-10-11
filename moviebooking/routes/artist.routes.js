module.exports = app =>{

    //import express router
    const router = require('express').Router();
    //import artists.controller
    const artists = require('../controllers/artist.controller');

    //GET/artists
     router.get("/artists", artists.findAllArtists);

     app.use('/api', router);
}
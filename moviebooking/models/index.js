const dbConfig = require('../config/db.config.js');
const mongoose = require('mongoose');

const db = {};
db.url = dbConfig.url;
db.mongoose = mongoose;
db.movies = require('./movie.model')(mongoose);
db.genre = require('./genre.model')(mongoose);
db.artist = require('./artist.model')(mongoose);
db.user = require('./user.model')(mongoose);

module.exports = db;
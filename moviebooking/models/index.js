const dbConfig = require('../config/db.config.js');
const mongoose = require('mongoose');

const db = {};
db.url = dbConfig.url;
db.mongoose = mongoose;
db.movies = require('./movie.model')(mongoose);
db.genres = require('./genre.model')(mongoose);
db.artists = require('./artist.model')(mongoose);
db.users = require('./user.model')(mongoose);

module.exports = db;
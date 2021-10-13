const db = require('../models');
//efining the mongoose object
const Genre = db.genres;

exports.findAllGenres = (req, res)=>{
    Genre.find({})
    .then(response=>{
       res.setHeader('Content-Type', 'application/json');
       res.status(200)
       .json({genres: response})
       .end();
    })
    .catch(err=>{
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.status(500)
        .send({message: "Internal Server Error"})
        .end();
    });
    return;
}
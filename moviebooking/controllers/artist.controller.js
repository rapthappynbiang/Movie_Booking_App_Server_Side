const db = require('../models');
//efining the mongoose object
const Artist = db.artists; 

exports.findAllArtists = (req, res)=>{
    Artist.find({})
    .then(response=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200)
        .send({artists: response})
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
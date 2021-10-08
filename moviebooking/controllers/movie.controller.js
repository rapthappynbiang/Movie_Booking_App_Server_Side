const db = require('../models');
//efining the mongoose object
const Movies = db.movies;

//find movies by status
exports.findAllMovies = (req, res)=>{
   
    //GET /movies?status=RELEASED&title={title}&genres={genres}&artists={artists}&start_date={startdate}&end_date={enddate}
    if(req.query.status==="RELEASED" && 
    (req.query.title!== "" || req.query.title!== undefined) && 
    (req.query.genres !== "" || req.query.genres !== undefined) &&
    (req.query.artists !== "" || req.query.artists !== undefined) &&
    (req.query.start_date !== "" || req.query.start_date !== undefined) &&
    (req.query.end_date !== "" || req.query.end_date !== undefined)){

        Movies.findOne({
            released: true,
            title: req.query.title,
            genres: req.query.genres,
            artists: req.query.artists,
            released_data: req.query.start_date,
            published_data: req.query.end_date
        })
        .then(response=>{
            res.setHeader('Content-Type': 'application/json');
            res.status(200)
            .send(response)
            .end();
        }).catch(err=>{
            res.setHeader('Content-Type', 'application/json');
            res.status(404)
            .send({message: "Cannot get Movies with provided data"})
            .end();
        })
     }else if(req.query.status==="PUBLISHED"){
        //search for movies with published: true.s
        Movies.find({published: true})
        .then( response =>{
            //set header content type and send the data to client
            res.setHeader('Content-Type', 'application/json');
             res.status(200)
             .send(response)
             .end();
        })
        .catch( err =>{
            //log the error to console for information to developer
            console.log(err);
             //set header content type and send the data to client
             res.setHeader('Content-Type', 'application/json');
             //send the status 500 with message  Server Error
             res.status(500)
            .send({message: "Server Error"})
            .end();
        });
    }else if(req.query.status!=="RELEASED"){
        Movies.find({released: true})
        .then( response =>{
            //set header content type and send the data to client
            res.setHeader('Content-Type', 'application/json');
             res.status(200)
             .send(response)
             .end();
        })
        .catch(err=>{
            console.log(err);
             //set header content type and send the data to client
             res.setHeader('Content-Type', 'application/json');
            //send the status 500 with message Server Error
            res.status(500)
            .send({message: "Server Error"})
            .end();
        });
    }else{
        Movies.find({})
        .then(response=>{
            //set header content type and send the data to client
            res.setHeader('Content-Type', 'application/json');
            res.status(200)
            .send(response)
            .end();
        })
        .catch(err=>{
            
             //set header content type and send the data to client
            res.setHeader('Content-Type', 'application/json');
            //send the status 500 with message Server Error
           res.status(500)
           .send({message: "Server Error"})
           .end();
        })
    }
    return;
}

//find movies by id
exports.findOne = (req, res)=>{
    Movies.findOne({movieid: req.params.id})
    .then(response=>{
        //set header content type and send the data to client
        res.setHeader('Content-Type', 'application/json');
       res.status(200)
       .send(response)
       .end();
    })
    .catch((err)=>{
       //log error to console for developer to know
       console.log(err)
        //set header content type and send the data to client
        res.setHeader('Content-Type', 'application/json');
        //send status 404 and message as Cannot get movie with specified id
       res.status(404)
       .send({message: "Cannot get movie with specified id"})
       .end();
    })

}

//find details of shows of a specific movie given its id.
exports.findShows = (req, res)=>{

    Movies.findOne({ _id: req.params.id })
    .then(response=>{
        //set header content type and send the data to client
        res.setHeader('Content-Type', 'application/json');
       res.status(200)
       .send(response.shows)
       .end();
    })
    .catch((err)=>{
       //log error to console for developer to know
       console.log(err)
        //set header content type and send the data to client
        res.setHeader('Content-Type', 'application/json');
       res.status(404)
       .send({message: "cannot get movie with specified id"})
       .end();
    })
}
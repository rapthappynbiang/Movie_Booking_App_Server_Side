const db = require('../models');
//efining the mongoose object
const Movies = db.movies;

//find movies by status
exports.findAllMovies = (req, res)=>{

    if(req.query.status==="PUBLISHED"){
        console.log(req.path + " "+ req.query.status)
        //search for movies with published: true.
        Movies.find({published: true})
        .then( response =>{
            //set header content type and send the data to client
            res.setHeader('Content-Type', 'application/json');
            res.status(200)
            .send({movies: response})
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
    }else if(req.query.status==="RELEASED"){
        
        console.log(req.path + " "+ req.query.status)
        //GET /movies?status=RELEASED&title={title}&genres={genres}&artists={artists}&start_date={startdate}&end_date={enddate}
            if(req.query.title != undefined || 
            req.query.genres != undefined ||
            req.query.artists != undefined ||
            req.query.start_date != undefined ||
            req.query.end_date != undefined){

                console.log(`${req.query.status} ${req.query.title}`);
                var queryobj = {
                    released: true
                }

                //to add the data for query
                //check title if not ""
                if(req.query.title != undefined){
                    queryobj.title = new RegExp(req.query.title, "i")
                }
                
                //check if generes is not ""
                if(req.query.genres != undefined){
                    queryobj.genres = req.query.genres.split(",");
                }

                //check if artists is not ""
                if(req.query.artists != undefined){
                    queryobj.artists = req.query.artists.split(",");
                }

                //check if generes is not ""
                if(req.query.start_date != undefined){
                    queryobj.start_date = req.query.start_date;
                }

                //check if generes is not ""
                if(req.query.end_date != undefined){
                    queryobj.end_date = req.query.end_date;
                }

            Movies.find(queryobj)
            .then(response=>{
                //set Headder content-type
                res.setHeader('Content-Type', 'application/json');

                //just in case response is null
                if(response.length===0){
                    res.status(404).json({message: "Not Found"}).end();
                    return;
                }
                res.status(200)
                .json({movies: response})
                .end();
            }).catch(err=>{
                res.setHeader('Content-Type', 'application/json');
                res.status(404)
                .send({message: "Cannot get Movies with provided data"})
                .end();
            })
            return;
        }

        //else return the movies with released true
        Movies.find({released: true})
        .then( response =>{
            //set header content type and send the data to client
             res.setHeader('Content-Type', 'application/json');
             res.status(200)
             .send({movies: response})
             .end();
        },
        (err)=>{
            console.log(err);
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
            .json({movies: response})
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
    
}

//find movies by id
exports.findOne = (req, res)=>{
    Movies.findOne({movieid: req.params.id})
    .then(response=>{
        //set header content type and send the data to client
        res.setHeader('Content-Type', 'application/json');
       res.status(200)
       .send([response])
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

//find details of shows of a specific movie given its id
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
const db = require('../models');
//efining the mongoose object
const User = db.users;
const TokenGenerator = require('uuid-token-generator');
const tokGen = new TokenGenerator();
//have used v4 instead of uuidv4 since it is deprecated
const { v4 } = require('uuid');
const { atob } = require('b2a');

//signup() api
exports.signUp=(req, res)=>{
    User.find({email: req.body.email_address})
   .then(response => {
       
       if(response.length === 0){
          //data is not there insert data to database

          //get the number of users present in db
           User.countDocuments({}, (err, count)=>{
            var data = req.body;
             count += 1;
            User.insertMany([{
                userid: `${count}`,
                email: data.email_address,
                first_name: data.first_name,
                last_name: data.last_name,
                username: data.username,
                contact: data.mobile_number,
                password: data.password,
                uuid: v4(),
                accesstoken: tokGen.generate(),
                isLoggedIn: true,
            }])
            .then(response=>{
                res.setHeader('Content-type', 'application/json');
                res.status(200)
                .json(response)
                .end();
            })
            .catch(err=>{
                console.log(err);
                res.setHeader('Content-Type', 'application/json');
                res.status(400)
                .json({message: "Bad Request" })
                .end();
            });
           });

       }else{
          //if data already exists  
          res.setHeader('Content-Type', 'application/json');
          res.status(400)
          .json({message: "User already exists"})
          .end();
       }
       
   })
   .catch(err=>{
       //if any error send status 500
       console.log(err);
       res.setHeader('Content-Type', 'application/json');
          res.status(500)
          .json({message: "Server Error"})
          .end();
   })
}


//login api
exports.login = (req, res) => {
    //decode the username and password from header store in Authorization key
    console.log(req.get("Authorization"));
    var authorisation = req.get("Authorization").split(" ")[1];
    console.log(authorisation);
    var username = atob(authorisation).split(":")[0];
    var password = atob(authorisation).split(":")[1];

    //Find the user with username and password with decoded username and password
    //if found update the accesstoken and isLoggedIn value
    //and set new option as true to return the object after update
    User.findOneAndUpdate({username: username, password: password}, 
                          {uuid: v4(), accesstoken: tokGen.generate(), isLoggedIn: true},
                          {new: true})
    .then(response=>{
        //if user with username and password does not exist send a message to signup
        if(response == null){
            res.status(404).json({message: "User not found Please Signup"}).end();
        }
        var data = {
            uuid: response.uuid,
            accesstoken: response.accesstoken,
            isLoggedIn: response.isLoggedIn
        }
        //else send the data 
        res.status(200).json(data).end();
    })
    .catch(err=>{
        //if err occurs
        console.log(err);
        res.status(500).json({message: "Internal server Error"}).end(); 
    });
}

//logout api
exports.logout = (req, res) => {
        console.log(typeof req.body);
        var uuid = req.body["uuid"];
        console.log(uuid);
        User.findOneAndUpdate({uuid: uuid}, {uuid: "", accesstoken: "", isLoggedIn: false}, {new: true})
        .then(response=>{
            res.status(200).json({"message": "successfully loggout"}).end();
        }) 
        .catch(err=>{
            res.status(500).json({"message": "Internal Server Error"}).end();
        })
}

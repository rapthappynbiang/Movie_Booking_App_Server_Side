const db = require('../models');
//efining the mongoose object
const User = db.users;
const TokenGenerator = require('uuid-token-generator');
const tokGen = new TokenGenerator();
//have used v4 instead of uuidv4 since it is deprecated
const { v4 } = require('uuid');
const { atob } = require('b2a');
const bcrypt = require('bcrypt');

//signup() api
exports.signUp=(req, res)=>{
    User.find({email: req.body.email_address})
   .then(response => {
       
       if(response.length === 0){
          //data is not there insert data to database

          //get the number of users present in db
           User.countDocuments({}, (err, count)=>{
               if(err){
                   console.log(err)
                   return;
               }
               var data = req.body;
                //Hash the password before storing to db
                  bcrypt.hash(data.password, 10).then(hashPassword=>{
                      data.password = hashPassword;
                      count += 1;
                        User.insertMany([{
                            userid: `${count}`,
                            email: data.email_address,
                            first_name: data.first_name,
                            last_name: data.last_name,
                            username: data.username,
                            contact: data.mobile_number,
                            password: data.password
                        }])
                        .then(response=>{
                            res.setHeader('Content-type', 'application/json');
                            res.status(200)
                            .send({message: "sucessfully Sign up"})
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


//login api /auth/login
exports.login = (req, res) => {

    /*decode the username and password from header store in Authorization key*/
    var authorisation = req.get("Authorization").split(" ")[1];
    var username = atob(authorisation).split(":")[0];
    var password = atob(authorisation).split(":")[1];
    //get user by username and compare hash password
    User.findOne({username: username})
    .then(response=>{
        if(response == null){
            res.setHeader('Content-Type','application/json');
            res.status(404).json({message: "user not found please signup!"}).end();
            return;
        }
        //store password in a variable
        var loginPassword = response.password;
        //compare response.password with password using bcrypt.compare
        bcrypt.compare(password, response.password).then((result)=>{
            
                  //result is true i.e password is correct
                  if(result){
                      //Password is correct
                      User.findOneAndUpdate({username: username, password: loginPassword},
                        {uuid: v4(), accesstoken: tokGen.generate(), isLoggedIn: true},
                        {new: true})
                        .then(responseObj=>{
                            var data ={
                               uuid: responseObj.uuid,
                               accesstoken: responseObj.accesstoken,
                               message: "Loggedin Successful!"
                            }

                            //send data to front end
                            res.setHeader('Content-Type', 'application/json');
                            res.status(200).json(data).end();
                        })
                  } else{
                      //if password is incorrect
                    console.log("Result is false");
                    res.status(400).json({message: "Invalid password"}).end();
                  }

        }).catch(err=>{
            console.log(err);
            res.status(500).json({message: "error try again!"})
        })
    })   
}

//logout api /auth/logout
exports.logout = (req, res) => {
       //check type of req body
       var uuid ="";
       if(typeof req.body !== 'object'){
            uuid = JSON.parse(req.body).uuid;
       }else{
           uuid = req.body.uuid;
       }

       console.log(uuid);

        User.findOneAndUpdate({uuid: uuid}, {uuid: "", accesstoken: "", isLoggedIn: false}, {new: true})
        .then((response)=>{
            //Set Header content-type
            res.setHeader('Content-Type', 'application/json');
             console.log(response);
            if(response == null){
                res.status(400).json({"message": "Some Error occurs"}).end();
                return;
            }

            //send the data isLoggin false.
            res.status(200).json({message: "Logged Out successfully."}).end();
        },
        (err)=>{
            console.log(err)
        }) 
        .catch(err=>{
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({"message": "Internal Server Error"}).end();
        })
}

// '/auth/coupons?code='
exports.getCouponCode = (req, res)=>{
   //Authenticate the user by checking the access-token passed in header
   //example of header "access-token": "Berear access-token"
   var accesstoken = req.get("Authorization").split(" ")[1];

   //find user that has the specified access-token
   User.findOne({accesstoken: accesstoken})
   .then((response)=>{
       //if user is there find the coupons with the provided code provided in req query inside coupon of user
       var code = req.query.code;

       if(response == null){
           //if code not found send status 404
          res.setHeader('Content-Type', 'application/json');
          res.status(404).send({"message": "Code not found"}).end();
          return;
       }

       //store coupons array of a user in coupons
       var coupons = response.coupons;
       
       //search code 
       coupons.map(item=>{
           //if item id match the code return the item 
           if(item.id == code){
               res.setHeader('Content-Type', 'application/json');
               res.status(200).send({discountValue: item.discountValue}).end();
           } 
       },
       (err)=>{
           console.log(err);
       })            
   },
   (err)=>{
       console.log(err);
   })
   .catch(err=>{
    console.log(err);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({message: "Server Error"})
   })
}

// '/auth/bookshow'
exports.bookShow = (req, res)=>{
    //Authenticate the user by checking the access-token passed in header
    //if authentication sucess update user bookingRequest
    var accesstoken = req.get("Authorization").split(" ")[1];
    var uuid = req.body.customerUuid;
    console.log("uuid->>", uuid)
    console.log("access-token->>", accesstoken)

   //find user that has the specified access-token
   User.findOneAndUpdate({uuid: uuid, accesstoken: accesstoken}, 
    {  //push the data to the user booking Requests list
        $push : { bookingRequests : {
        reference_number: Math.ceil(Math.random()*100000) + 1,
        coupon_code: req.body.bookingRequest.coupon_code,
        show_id: req.body.bookingRequest.show_id,
        tickets: req.body.bookingRequest.tickets
       }
     }
    },
    {
        new: true
    })
   .then(response=>{
       console.log(response)
       response.bookingRequests.map(item=>{
           //Sent the booking id to client
          if(item.show_id == req.body.bookingRequest.show_id){
              //Send the booking id to user
              res.setHeader('Content-Type', 'application/json');
              res.status(200).json({"bookingId": item.reference_number}).end();
          }
         });
        },
        //If any error log the error
        (err)=>{
            console.log(err);   
   })
   .catch(err=>{
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
         res.status(500).json({message: "Internal Server Error"}).end();
   });
}

const express = require('express');
const cors = require('cors');
bodyParser = require('body-parser');
//make express object
const app = express(); 

//use corsOptions
var corsOptions = {
  origin: "https://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
// using bodyParser
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
// using bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//Handle incoming Request
app.get("/", (req, res) => {
  console.log(req.url);
  res.json({ message: "Welcome to Upgrad Movie booking application development." });
  res.end();
});

//create a mongoose object and conncted to it
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  //Handling all movies requests
 require("./routes/movie.routes")(app);

 //Handling all genres requests
 require("./routes/genre.routes")(app);

 //Handling all artists requests
 require("./routes/artist.routes")(app);

const PORT = 3000;
app.listen(PORT, ()=>{
  console.log("Server is listening at port 3000");
});

//default port
const port = 9000;
const http  = require("http");
const httpStatus = require("http-status-codes");

//definning routes map
const routeResponseMap ={
    "/GET/movies": "All Movies Data in JSON format from Mongo DB",
    "/GET/genre": "All Genres Data in JSON format from Mongo DB",
    "/GET/artist": "All Artists Data in JSON format from Mongo DB",
}


const app = http.createServer((request, response)=>{
    response.writeHead(200,{ 
        "content-type": "text/html"
    });
    //Handling routes
    console.log(request.url);
    if(routeResponseMap[request.url]){
        //return the movies data
        response.write(routeResponseMap[request.url]);
       response.end();
    }else{
        response.end("<h1>Not Found</h1>");
    }

}); 

app.listen(port);
console.log("Server has Started");
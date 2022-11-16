/** -----Example express------
// Import the top-level function of express
const express = require('express');

// Create an Express application using the top-level function
const app = express();

// Define port the number as 3000
const port = 3000;

// Routes HTTP GET request to the specified path "/" with the specified callback function
app.get('/',function(request,response){
    response.send("Hello World!");
});

//Make the app listen on port 3000
app.listen(port,function(){
    console.log('Server is listening on http://localhost:' + port);
}) 
**/

const http = require('http');

function index (request, response){
    response.writeHead(200);
    response.end('Hello World');
}

var routes = {
    '/': function index(request,response){
        response.writeHead(200);
        response.end('Hello, world!');
    },
    '/foo':function foo(request, response){
        response.writeHead(200);
        response.end('You are now viewing "foo"');
    }
}

http.createServer(function(request, response){
    // if(request.url === '/'){
    //     return index(request,response);
    // }
    if (request.url in routes){
        return routes[request.url](request,response);
    }
    response.writeHead(404);
    response.end(http.STATUS_CODES[404]);
}).listen(1337);

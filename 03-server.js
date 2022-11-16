const express = require('express');
const http = require('http');

const app = express();

function responseText(req, res){
    res.setHeader('Content-Type','text/plain');
    res.end('Hello Text-Plain');
}

function responseJSON(req, res){
    res.setHeader('Content-Type','application/JSON');
    res.end(JSON.stringify({text:'Hello Application-JSON', numbers:[1,2,3]}));
}

function responseNotFound(req, res){
    res.writeHead(404,{'Content-Type':'text/plain'});
    res.end('Sorry Not Found! ;)')
}

const server = http.createServer(function(request, response){
    if(request.url === '/text') return responseText(request,response);
    if(request.url === '/json') return responseJSON(request, response);
    responseNotFound(request, response);
}).listen(1337);
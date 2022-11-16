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

const querystring = require('querystring');

function responseEco(req, res){
    const { input = '' } = querystring.parse(
        req.url
            .split('?')
            .slice(1)
            .join('')
    )

    res.setHeader('Content-Type','text/plain');
    res.end(
        JSON.stringify({
            normal:input,
            shouty:input.toUpperCase(),
            characterCount:input.length,
            backwords:input
                .split('')
                .reverse()
                .join('')
        })
    )
}

function responseNotFound(req, res){
    res.writeHead(404,{'Content-Type':'text/plain'});
    res.end('Sorry Not Found! ;)')
}

const server = http.createServer(function(request, response){
    if(request.url === '/') return responseText(request,response);
    if(request.url === '/json') return responseJSON(request, response);
    if(request.url.match(/^\/echo/)) return responseEco(request,response);

    responseNotFound(request, response);
}).listen(1337);
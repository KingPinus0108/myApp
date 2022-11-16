const express = require('express');
const { fstat } = require('fs');
const http = require('http');
const port = process.env.PORT || 1337
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

const fs = require('fs');
function responseStatic(req, res){
    const file_name = `${__dirname}/public${req.url.split('/static')[1]}`
    console.log("" + req.url.split());
    fs.createReadStream(file_name)
        .on('error', () => responseNotFound(req,res))
        .pipe(res);
}

function responseNotFound(req, res){
    res.writeHead(404,{'Content-Type':'text/plain'});
    res.end('Sorry Not Found! ;)')
}

const server = http.createServer(function(request, response){
    if(request.url === '/') return responseText(request,response);
    if(request.url === '/json') return responseJSON(request, response);
    if(request.url.match(/^\/echo/)) return responseEco(request,response);
    if(request.url.match(/^\/static/)) return responseStatic(request,response);

    responseNotFound(request, response);
});
server.listen(port);
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(function(req, res){
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify({text:'hi',numbers:[1,2,3]}));
}).listen(1337)


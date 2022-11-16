const fs = require('fs');
const express = require('express');
const querystring = require('querystring')

const port = process.env.PORT || 1337;

const app = express();

app.get('/',responseText)
app.get('/json',responseJSON)
app.get('/echo',responseEco)
app.get('/static/*',responseStatic)
app.get('/chat',responseChat)
app.get('/sse',responseSSE)

function responseText(req, res){
    res.setHeader('Content-Type','text/plain');
    res.end('Hello Text-Plain');
}

function responseJSON(req, res){
    res.setHeader('Content-Type','application/JSON');
    res.end(JSON.stringify({text:'Hello Application-JSON', numbers:[1,2,3]}));
}

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

function responseStatic(req, res){
    const file_name = `${__dirname}/public${req.url.split('/static')[1]}`
    fs.createReadStream(file_name)
        .on('error', () => responseNotFound(req,res))
        .pipe(res);
}

function responseNotFound(req, res){
    res.writeHead(404,{'Content-Type':'text/plain'});
    res.end('Sorry Not Found! ;)')
}

const EventEmitter = require('events');
const chatEmitter = new EventEmitter();
function responseChat(req, res){
    const {message} = req.query

    chatEmitter.emit('message',message)
    res.end()
}

function responseSSE(req, res){
    res.writeHead(200,{
        'Content-Type':'text/event-stream',
        'Connection':'keep-alive'
    })

    const onMessage = msg => res.write(`data:${msg}\n\n`)
    chatEmitter.on('message',onMessage)
    res.on('close',function(){
        chatEmitter.off('message',onMessage)
    })
}

app.listen(port,() => console.log(`Server listening on port:${port}`))
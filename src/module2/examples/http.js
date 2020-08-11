
// Примеры из статьи https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/

// одно и то же:
const http = require('http');
const server = http.createServer((request, response) => {
    // code
});

const server2 = http.createServer();
server2.on('request', (request, response) => {
    // code
});



/*
// http2
const http2 = require('http2');
const { HTTP2_HEADER_STATUS, HTTP_HEADER_CONTENT_TYPE } = http2.constants;

const server = http2.createServer();
server.on("stream", stream => {
    stream.respond({
        [HTTP2_HEADER_STATUS]: 200,
        [HTTP_HEADER_CONTENT_TYPE]: 'text/plain'
    });

    stream.write('hello');
    stream.end('world');
});*/
/*
// Обработка ошибок
const server = require('http').createServer();
const green = text => `\x1b[32m${text}\x1b[0m`;
const PORT = Number(process.env.PORT) || 3000;
const {
    handleRequestError,
    handleResponseError,
    handleServerError
} = require('./');

server
    .on('request', (req, res) => {
        req.on('error', handleRequestError);
        res.on('error', handleResponseError);
    })
    .on('error', handleServerError);

server.listen(PORT);
process.stdout.write(`Server running on port ${green(PORT)}`);
*/
/*
// https
// PATH_TO_CERT=/some/path PATH_TO_KEY=/another/path fileName
const readFileSync = require('fs').readFileSync;
const green = text => `\x1b[32m${text}\x1b[0m`;
const PORT = Number(process.env.PORT) || 3000;
const { PATH_TO_CERT, PATH_TO_KEY} = process.env;
const assert = require('assert');

assert.ok(
    PATH_TO_KEY && PATH_TO_CERT,
    'Key or certificate path not provided via env variable.'
);

const server = require('https').createServer(
    { key: readFileSync(PATH_TO_KEY), cert: readFileSync(PATH_TO_CERT) },
    (req,res) => req.pipe(res)
);

server.listen(PORT);
process.stdout.write(`Server running on port ${green(PORT)}`);*/
/*const server = require('http').createServer();
const { createReadStream } = require('fs');
const PORT = Number(process.env.PORT) || 3000;
const green = text => `\x1b[32m${text}\x1b[0m`;
const indexHTMLPath = './src/module2/task1/index.html';

server.on('request', (req, res) => {
    const { url, method } = req;

    if (url === '/' && method === 'GET') {
        res.setHeader("Content-Type", 'text/html');
        return createReadStream(indexHTMLPath).pipe(res);
    }

    res.statusCode = 404;

    res.end();
});

server.listen(PORT);
process.stdout.write(`Server running on port ${green(PORT)}`);*/
/*
const server = require("http").createServer();
const PORT = Number(process.env.PORT) || 3000;
const green = text => `\x1b[32m${text}\x1b[0m`;

server.on("request", (req, res) => {
    const { url } = req;

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;

    res.end(JSON.stringify({ url }));
});

server.listen(PORT);
process.stdout.write(`Server running on port ${green(PORT)}`);*/

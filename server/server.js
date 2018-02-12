/*
const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
});

wss.on('error', function() {});

server.listen(1337, function listening() {
  console.log('Listening on %d', server.address().port);
});
*/

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 1337 });
console.log('server started on port 1337');

wss.on('connection', function connection(ws, req) {
  console.log('→ connected');

  ws.on('message', function incoming(message) {
    console.log('message: %s', message);
  });

  ws.on('open', () => console.log('→ connected'));

  ws.on('close', () => console.log('← disconnected'));

  ws.on('error', () => console.log('x errored'));
});

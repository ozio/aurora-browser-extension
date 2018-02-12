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

const WebSocket = require('ws');
const moment = require('moment');
const highlight = require('cli-highlight').highlight;

const wss = new WebSocket.Server({ port: 1337 });
console.log('server started on port 1337');

wss.on('connection', function connection(ws, req) {
  console.log('→ connected');

  ws.on('message', function incoming(message) {
    const date = moment().format('LTS');

    console.log(`\n${date}:\n${highlight(JSON.stringify(JSON.parse(message), null, 2), { language: 'JSON' })}`);
  });

  ws.on('open', () => console.log('→ connected'));

  ws.on('close', () => console.log('← disconnected'));

  ws.on('error', () => console.log('x errored'));
});

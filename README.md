# Aurora Browser Extenstion Test

## Install

### Chrome/Opera

1. Open `chrome://extensions/`
2. Check `Developer mode`
3. Press `Load unpacked extension...` and open folder `./extension/build/chrome`

Extension should start automatically and then start trying to connect to the local websocket on `ws://localhost:1337`.

### WebSocket server

You can write your own server and start listening on `ws://localhost:1337`, but I also wrote a simple server on NodeJS for debug reasons.

How to start it:

1. Install `node` if you need.
2. Run `npm install` in project folder.
3. Run `npm run server`.

## Protocol

For now, the extension can only send messages about current tab location and active/inactive browser state.

**Examples:**

Browser window is focused/unfocused (I just realized that you dont need this type of messages, omg):
```json
{"version":1,"type":"focus","focused":true}
```

Bbrowser tab is have a new url:
```json
{"version":1,"type":"url","url":"http://youtube.com"}
```

Any suggestions?

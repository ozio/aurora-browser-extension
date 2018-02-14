# Aurora Browser Extenstion Test

## Install

Extension should start automatically.

### Chrome/Opera Extension

1. Open `chrome://extensions/`
2. Turn on `Developer mode`
3. Press `Load unpacked extension...` and open folder `./extension/build/chrome`

### Firefox WebExtensions

1. Open `about:debugging#addons`
2. Turn on `Enable add-on debugging`
3. Press `Load Temporary Add-on`

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

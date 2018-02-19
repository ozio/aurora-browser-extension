# Aurora Browser Extenstion

## Extensions

#### Chrome/Opera Extension

1. Open `chrome://extensions/`
2. Turn on `Developer mode`
3. Press `Load unpacked extension...` and open folder `./extensions/build/chrome`

#### Firefox WebExtensions

1. Open `about:debugging#addons`
2. Turn on `Enable add-on debugging`
3. Press `Load Temporary Add-on` and open `./extensions/build/firefox/extension.js`

## WebSocket server

You can write your own server and start listening on `ws://localhost:1337`, but I also wrote [a simple server on NodeJS](https://github.com/ozio/aurora-websocket-server) for debug reasons.

## Protocol

For now, the extension can only send messages about current tab location and active/inactive browser state. Every message have information about API version, type of message and information about browser.

**Examples:**

Browser window is focused or unfocused:
```json
{
  "version": 1,
  "type": "focus",
  "browser": {
    "name": "Opera",
    "version": "50.0"
  },
  "payload": {
    "focused": true
  }
}
```

Browser tab have a new url:
```json
{
  "version": 1,
  "type": "url",
  "browser": {
    "name": "Opera",
    "version": "50.0"
  },
  "payload": {
    "hash": "",
    "host": "www.youtube.com",
    "hostname": "www.youtube.com",
    "href": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "password": "",
    "pathname": "/watch",
    "port": "",
    "protocol": "https:",
    "username": "",
    "search": "?v=dQw4w9WgXcQ",
    "searchParams": {
      "v": "dQw4w9WgXcQ"
    }
  }
}
```

## Browser SDK

Also, website developers can include owr [small browser SDK](https://github.com/ozio/aurora-browser-sdk) to their own websites to send their metrics and settings to Aurora through extension.

## Roadmap

- [ ] **Bundling:** Turn on code minify;
- [ ] **Extensions:** Apple Safari;
- [ ] **Extensions:** Microsoft Edge;
- [ ] **User SDK:** Handshake;
- [ ] **Plugins:** For popular services like YouTube or Facebook;
- [ ] **UI:** Visual Preferences;
- [ ] Analytics.

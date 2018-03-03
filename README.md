# Aurora Browser Extenstion

## Extensions

#### Chrome/Opera Extension

1. Open `chrome://extensions/`.
2. Select the `Developer mode` checkbox.
3. Press `Load unpacked extension...` and open `./extensions/build/chrome` folder.

#### Firefox WebExtensions

1. Open `about:debugging#addons`.
2. Select the `Enable add-on debugging` checkbox.
3. Press `Load Temporary Add-on` and open `./extensions/build/firefox/extension.js`.

#### Microsoft Edge Extensions

1. Open `about:flags`.
2. Select the `Enable extension developer features` checkbox.
3. Select `More (...)` to open the menu.
4. Select `Extensions` from the menu.
5. Select the Load extension button and open `./extensions/build/edge/` folder.

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

**Explanation:** payload contains fields of [Location](https://developer.mozilla.org/en-US/docs/Web/API/Location) object. Additionally, `searchParams` field is parsed to key-value object.

## ~~Browser SDK~~

~~Also, website developers can include owr [small browser SDK](https://github.com/ozio/aurora-browser-sdk) to their own websites to send their metrics and settings to Aurora through extension.~~

## Roadmap

- [x] **Bundling:** Turn on code minify;
- [x] **Extensions:** Microsoft Edge;
- [ ] **Plugins:** For popular services like YouTube or Facebook;
- [ ] **UI:** Visual Preferences;
- [ ] Analytics.

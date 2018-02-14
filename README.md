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

Browser window is focused or unfocused:
```json
{
  "version": 1,
  "type": "focus",
  "browser": {
    "name": "Opera",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36 OPR/50.0.2762.67"
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
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36 OPR/50.0.2762.67"
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

## Roadmap

- [ ] Extensions: Apple Safari;
- [ ] Extensions: Microsoft Edge;
- [ ] User SDK: Keymaps;
- [ ] UI: Visual Preferences;
- [ ] Drop build target to `es5`;
- [ ] Analytics.

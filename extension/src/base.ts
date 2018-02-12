import * as ReconnectingWebsocket from 'reconnecting-websocket';

const WEBSOCKET_PROTOCOL = 'ws';
const WEBSOCKET_PORT = 1337;
const WEBSOCKET_DOMAIN = 'localhost';
const WEBSOCKET_PATH = '';
const WEBSOCKET_URL = `${WEBSOCKET_PROTOCOL}://${WEBSOCKET_DOMAIN}:${WEBSOCKET_PORT}/${WEBSOCKET_PATH}`;
const API_VERSION = 1;

abstract class Extension {
  currentURL?: string = null;

  isBrowserFocused?: boolean = null;

  ws: ReconnectingWebsocket;

  constructor() {
    this.connect(WEBSOCKET_URL);
    this.addListeners();
    this.ws.addEventListener('open', async () => {
      await this.updateFocus(true);
      await this.updateCurrentURL(true);
    });
  }

  connect(path: string) {
    this.ws = new ReconnectingWebsocket(path);
  }

  sendMessage(type: MessageType, payload: MessagePayload): void {
    const message: Message = {
      ...payload,
      type,
      version: API_VERSION,
    };

    try {
      this.ws.send(JSON.stringify(message));
    } catch(e) {}
  }

  async updateCurrentURL(forceUpdate?: boolean) {
    const url = await this.getCurrentURL();
    const urlHasChanged = url !== this.currentURL;

    if (urlHasChanged || forceUpdate) {
      if (url) this.currentURL = url;

      if (!(this.isBrowserFocused === true || forceUpdate)) return;

      this.sendMessage('url', { url: this.currentURL });
    }
  }

  async updateFocus(forceUpdate?: boolean) {
    const focused = await this.getFocused();

    if (!(this.isBrowserFocused !== focused || forceUpdate)) return;
    this.isBrowserFocused = focused;

    if (focused) {
      this.sendMessage('focus', { focused });
    } else {
      this.sendMessage('focus', { focused });
    }
  }

  abstract addListeners(): void;

  abstract getCurrentURL(): Promise<string>;

  abstract getFocused(): Promise<boolean>;
}

export default Extension;

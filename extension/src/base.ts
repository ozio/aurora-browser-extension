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

  static getURLData(url: string): URLData {
    const urlObject = new URL(url);
    const searchObject = {};

    for (let item of urlObject.searchParams) {
      searchObject[item[0]] = item[1];
    }

    return {
      hash: urlObject.hash,
      host: urlObject.host,
      hostname: urlObject.hostname,
      href: urlObject.href,
      password: urlObject.password,
      pathname: urlObject.pathname,
      port: urlObject.port,
      protocol: urlObject.protocol,
      username: urlObject.username,
      search: urlObject.search,
      searchParams: searchObject,
    };
  }

  connect(path: string) {
    this.ws = new ReconnectingWebsocket(path);
  }

  sendMessage(type: MessageType, payload: MessagePayload) {
    const message: Message = {
      type,
      version: API_VERSION,
      payload,
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

      this.sendMessage('url', {
        ...Extension.getURLData(this.currentURL)
      });

    }
  }

  async updateFocus(forceUpdate?: boolean) {
    const focused = await this.getFocused();

    if (!(this.isBrowserFocused !== focused || forceUpdate)) return;
    this.isBrowserFocused = focused;

    this.sendMessage('focus', { focused });
  }

  abstract addListeners();

  abstract getCurrentURL(): Promise<string>;

  abstract getFocused(): Promise<boolean>;
}

export default Extension;

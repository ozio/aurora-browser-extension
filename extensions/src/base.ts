import * as ReconnectingWebsocket from 'reconnecting-websocket';
import * as bowser from 'bowser';

const WEBSOCKET_PROTOCOL = 'ws';
const WEBSOCKET_PORT = 1337;
const WEBSOCKET_DOMAIN = 'localhost';
const WEBSOCKET_PATH = '';
const WEBSOCKET_URL = `${WEBSOCKET_PROTOCOL}://${WEBSOCKET_DOMAIN}:${WEBSOCKET_PORT}/${WEBSOCKET_PATH}`;
const API_VERSION = 1;

abstract class Extension {

  /** Generate meta data */
  static getMetaData(): MetaInterface {
    return {
      version: API_VERSION,
      browser: Extension.getBrowserData(),
    };
  }

  /** Generate browser data */
  static getBrowserData(): BrowserInterface {
    return {
      name: bowser.name,
      version: bowser.version,
    };
  }

  /** Generate URL data */
  static getURLData(url: string): URLData {
    const urlObject = new URL(url);
    const searchObject = {};

    for (const item of urlObject.searchParams) {
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

  /** Initialize socket connect */
  static connect(path: string): ReconnectingWebsocket {
    return new ReconnectingWebsocket(path);
  }

  /** URL of current tab of current window */
  currentURL?: string = null;

  /** Browser is focused */
  isBrowserFocused?: boolean = null;

  /** WebSocket object */
  ws: ReconnectingWebsocket;

  constructor() {
    this.ws = Extension.connect(WEBSOCKET_URL);

    this.ws.addEventListener('open', async () => {
      await this.updateFocus(true);
      await this.updateCurrentURL(true);
    });
  }

  /** Send message */
  sendMessage(type: MessageType, payload: MessagePayload) {
    const message: Message = {
      ...Extension.getMetaData(),
      type,
      payload,
    };

    try {
      this.ws.send(JSON.stringify(message));
    } catch (e) {}
  }

  /** Update current URL message */
  async updateCurrentURL(forceUpdate?: boolean) {
    const url = await this.getCurrentURL();
    const urlHasChanged = url !== this.currentURL;

    if (urlHasChanged || forceUpdate) {
      if (url) this.currentURL = url;

      if (!(this.isBrowserFocused === true || forceUpdate)) return;

      this.sendMessage('url', {
        ...Extension.getURLData(this.currentURL),
      });
    }
  }

  /** Update focus message */
  async updateFocus(forceUpdate?: boolean) {
    const focused = await this.getFocused();

    if (!(this.isBrowserFocused !== focused || forceUpdate)) return;
    this.isBrowserFocused = focused;

    this.sendMessage('focus', { focused });
  }

  /** Abstract methods, which should be implemented in adapter class with custom browser API: */

  /** Method that implements return of page URL from current tab from current browser window */
  abstract getCurrentURL(): Promise<string>;

  /** Method that implements return of current browser focus state */
  abstract getFocused(): Promise<boolean>;
}

export default Extension;

declare type MessageType = 'url' | 'focus';

declare interface URLData {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  password: string;
  pathname: string;
  port: string;
  protocol: string;
  username: string;
  search: string;
  searchParams: {
    [key: string]: string;
  };
}

declare interface BrowserInterface {
  name: string;
  version: string | number;
}

declare interface MetaInterface {
  version: number;
  browser: BrowserInterface;
}

declare interface FocusMessagePayload {
  focused: boolean;
}

declare interface UrlMessagePayload extends URLData {

}

declare type MessagePayload = FocusMessagePayload | UrlMessagePayload;

declare type Message = {
  type: MessageType;
  payload: MessagePayload;
} & MetaInterface;

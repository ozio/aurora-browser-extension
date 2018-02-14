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
  }
}

declare interface MessageMeta {
  type: MessageType;
  version: number;
}

declare interface FocusMessagePayload {
  focused: boolean;
}

declare interface UrlMessagePayload extends URLData {

}

declare type MessagePayload = FocusMessagePayload | UrlMessagePayload;

declare type Message = MessageMeta & { payload: MessagePayload };

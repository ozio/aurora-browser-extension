declare type MessageType = 'url' | 'focus';

declare interface MessageMeta {
  type: MessageType;
  version: number;
}

declare interface FocusMessagePayload {
  focused: boolean;
}

declare interface UrlMessagePayload {
  url: string;
}

declare type MessagePayload = FocusMessagePayload | UrlMessagePayload;

declare type Message = MessagePayload & MessageMeta;

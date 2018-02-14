import { EventEmitter } from 'eventemitter3';

class AuroraSDK extends EventEmitter {
  public init(options: SDKOptions) {
    this.emit('init', this);
  }
}

export default new AuroraSDK();

export class WriteSocket {
  //use to store the websocket object that will be used to make updates in realtime
  constructor() {}

  static setSocket(socket) {
    this.socket = socket;
  }
  static getSocket() {
    return this.socket;
  }
}

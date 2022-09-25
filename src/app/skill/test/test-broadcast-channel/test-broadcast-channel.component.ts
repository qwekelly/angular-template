import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-broadcast-channel',
  templateUrl: './test-broadcast-channel.component.html',
  styleUrls: ['./test-broadcast-channel.component.scss']
})
export class TestBroadcastChannelComponent implements OnInit, OnDestroy {

  broadcastChannel: BroadcastChannel;

  value: string;

  type: string;

  channelPort2: MessagePort;

  channelDatas: string[] = [];

  constructor() { }

  ngOnInit() {
    this.initBroadcastChannel();
    this.initIframeChannel();
  }

  ngOnDestroy() {
    this.broadcastChannel && this.broadcastChannel.close();
    window.removeAllListeners();
    this.channelPort2 && this.channelPort2.removeAllListeners();
  }

  initBroadcastChannel() {
    this.broadcastChannel = new BroadcastChannel('my_test_channel');
    this.broadcastChannel.onmessage = (event) => {
      if (event && event.data) {
        this.value = event.data;
        if (event.data === 'reload') {
          location.reload();
        }
      }
    };
  }

  onSendMeeage(value: string) {
    value && this.broadcastChannel.postMessage(value);
  }

  initIframeChannel() {
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'channel') {
        this.type = event.data.type;
        if (event.ports && event.ports.length) {
          this.channelPort2 = event.ports[0];
          this.channelPort2.onmessage = (_event) => {
            if (_event.data && _event.data.type === 'channel') {
              this.channelDatas.push(_event.data.data);
            }
          };
        }
      }
    });
  }
}

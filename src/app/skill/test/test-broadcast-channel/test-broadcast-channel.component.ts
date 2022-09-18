import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-broadcast-channel',
  templateUrl: './test-broadcast-channel.component.html',
  styleUrls: ['./test-broadcast-channel.component.scss']
})
export class TestBroadcastChannelComponent implements OnInit, OnDestroy {

  broadcastChannel: BroadcastChannel;

  value: string;

  constructor() { }

  ngOnInit() {
    this.initBroadcastChannel();
  }

  ngOnDestroy() {
    this.broadcastChannel && this.broadcastChannel.close();
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
}

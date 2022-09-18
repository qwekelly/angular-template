// @ts-nocheck
import { Component, OnDestroy, OnInit } from '@angular/core';

import { CustomBatteryManager } from 'utils/global.model';

@Component({
  selector: 'app-skill-web-api',
  templateUrl: './skill-web-api.component.html',
  styleUrls: ['./skill-web-api.component.scss'],
})
export class SkillWebApiComponent implements OnInit, OnDestroy {

  battery: CustomBatteryManager = {};

  broadcastChannel: BroadcastChannel;

  broadcastChannelValue: string;

  constructor() { }

  ngOnInit() {
    this.getBattery();
    this.initBroadcastChannel();
  }

  ngOnDestroy() {
    this.battery && this.battery.removeAllListeners();
    this.broadcastChannel && this.broadcastChannel.close();
  }

  getBattery() {
    navigator.getBattery().then((battery: CustomBatteryManager) => {
      this.battery = battery;
      battery.addEventListener('chargingchange', () => {});
      battery.addEventListener('levelchange', () => {});
      battery.addEventListener('chargingtimechange', () => {});
      battery.addEventListener('dischargingtimechange', () => {});
    });
  }

  changeSecondsToBaseTime(second: number) {
    let result = parseInt(second)
    let h = Math.floor(result / 3600) < 10 ? Math.floor(result / 3600) : Math.floor(result / 3600)
    let m = Math.floor((result / 60 % 60)) < 10 ? Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
    let s = Math.floor((result % 60)) < 10 ?  Math.floor((result % 60)) : Math.floor((result % 60))
    return `${(h ? h + '小时' : '')} ${(m ? m + '分钟' : '')}`
  }

  initBroadcastChannel() {
    this.broadcastChannel = new BroadcastChannel('my_test_channel');
    this.broadcastChannel.onmessage = (event) => {
      if (event && event.data) {
        this.broadcastChannelValue = event.data;
      }
    };
  }

  onSendMeeage(value: string) {
    value && this.broadcastChannel.postMessage(value);
  }
}

// @ts-nocheck
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { CustomBatteryManager } from 'utils/global.model';

@Component({
  selector: 'app-skill-web-api',
  templateUrl: './skill-web-api.component.html',
  styleUrls: ['./skill-web-api.component.scss'],
})
export class SkillWebApiComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('iframe') iframe: ElementRef<HTMLIFrameElement>;

  battery: CustomBatteryManager = {};

  broadcastChannel: BroadcastChannel;

  broadcastChannelValue: string;

  channel: MessageChannel;

  channelPort1: MessagePort;

  channelPort2: MessagePort;

  channelIframeUrl: SafeResourceUrl;

  constructor(
    private domSanitizer: DomSanitizer,
  ) {
    
  }

  ngOnInit() {
    this.channelIframeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('/skill/test/broadcast-channel');
    this.getBattery();
    this.initBroadcastChannel();
  }

  ngAfterViewInit() {
    this.iframe && this.initChannel();
  }

  ngOnDestroy() {
    this.battery && this.battery.removeAllListeners();
    this.broadcastChannel && this.broadcastChannel.close();
    this.iframe && this.iframe.nativeElement.removeAllListeners();
    this.channelPort1 && this.channelPort1.removeAllListeners();
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

  initChannel() {
    this.channel = new MessageChannel();
    this.channelPort1 = this.channel.port1;
    this.channelPort2 = this.channel.port2;

    this.iframe.nativeElement.addEventListener('load', () => {
      this.iframe.nativeElement.contentWindow.postMessage({
        type: 'channel',
        isInit: true,
        data: 'Hellow',
      }, '*', [this.channelPort2]);
  
      this.channelPort1.onmessage = (event) => {
        console.log('监听返回', event);
      };
    });
  }

  onSendChannelMeeage(value: string) {
    value && this.channelPort1 && this.channelPort1.postMessage({
      type: 'channel',
      isInit: false,
      data: value,
    });
  }
}

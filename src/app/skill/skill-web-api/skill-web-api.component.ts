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

  constructor() { }

  ngOnInit() {
    this.getBattery();
  }

  ngOnDestroy() {
    if (this.battery) {
      this.battery.removeAllListeners();
    }
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
}

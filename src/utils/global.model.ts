export type FileExtension = 
  '.doc' |
  '.docx' |
  '.jpg' |
  '.jpeg' |
  '.mp3' |
  '.mp4' |
  '.png' |
  '.pdf' |
  '.txt' |
  '.md' |
  '.webp' |
  '.zip' |
  '.xls' |
  '.xlsx'

export type FileMimeType =
  'application/msword' |
  'application/pdf' |
  'application/zip' |
  'application/vnd.ms-excel' |
  'image/jpeg' |
  'image/png' |
  'text/html' |
  'text/plain' |
  'audio/mpeg' |
  'video/mp4'

export interface CustomBatteryManager extends EventTarget {
  // https://www.w3.org/TR/battery-status/#abstract

  // charging: 说明当前电池是否正在充电
  readonly charging: boolean;
  // chargingTime: 代表距离充电完毕还需多少秒，如果为 0 则充电完毕。
  // 当电池完全被充满电时，或者系统不存在电池时，这个值为0。
  // 如果系统不在充电，或者无法确定完全充满电所需时间，这个值为（无穷大）Infinity。
  readonly chargingTime: number;
  // dischargingTime: 代表距离电池耗电至空且挂起需要多少秒。
  // 如果放电时间无法确定，或 系统没有电池 或 系统正在充电，这个值为（无穷大）Infinity。
  readonly dischargingTime: number;
  // level: 代表电量的放大等级，这个值在 0.0 至 1.0 之间。
  readonly level: number;

  // 电池充电状态更新时被调用。
  onchargingchange(): void;
  // 电池充电时间更新时被调用。
  onchargingtimechange(): void;
  // 电池断开充电时间更新时被调用。
  ondischargingtimechange(): void;
  // 电池电量更新时被调用。
  onlevelchange(): void;
}
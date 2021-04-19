/**
 * @summary 设备状态
 * @memberof Service
 * @description 设备状态对应表
 * - Healthy: '正常',
 * - Nodevice: '未安装',
 * - NoDevice: '未安装',
 * - OFFLINE: '通讯故障',
 * - DEVICEERROR: '故障',
 * - PaperOut: '纸尽',
 * - PaperLow: '纸少',
 * - TonerLow: '墨少',
 * - TonerOut: '墨尽',
 * - BinFull: '卡盒满',
 * - USERERROR: '人为错误',
 * - TransportError: '通道错误',
 * - InputOutputError: '放钞口异常',
 * - Escrpwerror: '暂存栈异常',
 * - notdisp: '不能出钞',
 * - notacceptor: '不能存钞',
 */
type DeviceStatus =
  | 'Healthy'
  | 'Nodevice'
  | 'OFFLINE'
  | 'PaperOut'
  | 'PaperLow'
  | 'TonerLow'
  | 'TonerOut'
  | 'BinFull'
  | 'USERERROR'
  | 'TransportError'
  | 'InputOutputError'
  | 'Escrpwerror'
  | 'notdisp'
  | 'notacceptor';

/**
 * @summary 硬件媒介状态
 * - HEALTHY: '正常',
 * - POWEROFF: '正常',
 * - NODEVICE: '未安装',
 * - HWERROR: '硬件故障',
 * - BUSY: '忙',
 * - FRAUDATTEMPT: '尝试舞弊',
 * - POTENTIALFRAUD: '舞弊嫌疑',

 * - FULL: '纸满',
 * - LOW: '纸少',
 * - OUT: '纸尽',
 * - NOTSUPP: '不支持',
 * - UNKNOWN: '未知',
 * - JAMMED: '卡纸',

 * - OK: '正常',
 * - BINFULL: '满',
 * - BINUNKNOWN: '未知',
 * - BINHIGH: '将满',
 * - NOBIN: '无',

 * - PRESENT: '有',
 * - NOTPRESENT: '没有',
 * - INJAWS: 'INJAWS',

 * - CLOSED: '关',
 * - OPEN: '开',
 * - FATAL: '故障',
 * - NOTSUPPORTED: '不支持',

 * - EMPTY: '空',
 * - NOTEMPTY: '不空',
 * - NOTEMPTYCUST: '不空CUST',
 * - NOTEMPTY_UNK: '不空UNK',

 * - OCCUPIED: '被占据',

 * - ONLINE: '正常',
 * - NOCHIP: 'NOCHIP',
 * - NOCARD: 'NOCARD',

 * - DEGRADED: 'DEGRADED',
 * - NOACCEPT: '不接收',

 * - READY: '准备好',
 * - NOTREADY: '未准备好',
 * - NOTINITIALIZED: '没初始化',
 * - UNDEFINED: '未定义',
 * - INITIALIZED: '初始化',

 * - ACTIVE: '激活',
 * - INACTIVE: '未激活'
 */
type MediaStatus =
  | 'HEALTHY'
  | 'POWEROFF'
  | 'NODEVICE'
  | 'HWERROR'
  | 'BUSY'
  | 'FRAUDATTEMPT'
  | 'POTENTIALFRAUD'
  | 'FULL'
  | 'LOW'
  | 'OUT'
  | 'NOTSUPP'
  | 'UNKNOWN'
  | 'JAMMED'
  | 'OK'
  | 'BINFULL'
  | 'BINUNKNOWN'
  | 'BINHIGH'
  | 'NOBIN'
  | 'PRESENT'
  | 'NOTPRESENT'
  | 'INJAWS'
  | 'CLOSED'
  | 'OPEN'
  | 'FATAL'
  | 'NOTSUPPORTED'
  | 'EMPTY'
  | 'NOTEMPTY'
  | 'NOTEMPTYCUST'
  | 'NOTEMPTY_UNK'
  | 'OCCUPIED'
  | 'ONLINE'
  | 'NOCHIP'
  | 'NOCARD'
  | 'DEGRADED'
  | 'NOACCEPT'
  | 'READY'
  | 'NOTREADY'
  | 'NOTINITIALIZED'
  | 'UNDEFINED'
  | 'INITIALIZED'
  | 'ACTIVE'
  | 'INACTIVE';

/**
 * @summary 设备状态定义
 * @memberof Service
 */
interface BaseServiceState {
  /**
   * @summary 读取设备状态结果
   */
  Result: 'OK' | 'FAIL';
  /**
   * @summary 设备状态
   */
  StDeviceStatus: DeviceStatus;
  StMediaStatus: MediaStatus;
}
/**
 * @summary 能力参数信息定义
 * @memberof Service
 */
interface BaseCapabilityInfo {
  /**
   * @summary 最大接收容量
   */
  CpMaxAcceptItems: number;
}
/**
 * @summary 基本服务接口
 */
declare interface Service {
  /**
   * @summary 复位
   * @param action 复位行为
   * @returns 0 - 成功 非0 - 失败
   */
  resetAction(action: string): number;
  /**
   * @summary 判断是否需要复位
   * @returns (true:需复位，false:无需复位)
   */
  isStateNeedReset(): boolean;

  /**
   * @summary 打开服务
   * @param 打开参数
   * @returns 0 - 成功 非0 - 失败
   */
  open(param: object): number;

  /**
   * @summary 复位
   * @param args 复位参数
   * @returns 0 - 成功 非0 - 失败
   */
  reset(...args: Array<any>): number;

  /**
   * @summary 关闭SP服务
   * @returns 0 - 成功 非0 - 失败
   */
  close(): number;

  /**
   * @summary 获取服务状态
   */
  getState(): BaseServiceState;
  /**
   * @summary 获取服务能力参数
   * @return BaseCapabilityInfo
   */
  getCapability(): BaseCapabilityInfo;
}

/**
 * 硬件服务接口
 * @interface
 */
declare interface DeviceService {
  /**
   * @summary 获取读卡器媒介状态
   * @returns 媒介状态
   */
  StMediaStatus(): MediaStatus;
  /**
   * @summary 获取硬件状态
   * @returns {"ok"} 硬件正常
   * @returns {"fail"} 硬件故障
   */
  getSelfState(): 'ok' | 'fail';
  /**
   * @summary 判断媒介是否存在
   */
  hasMedia(): boolean;
  /**
   * @summary 判断设备是否支持
   * @return (true:能用，false：不能用)
   */
  isSupport(): boolean;
}

/// <reference path="./idc.d.ts" />
/// <reference path="./service.d.ts" />
/// <reference path="./gpy.d.ts" />
/// <reference path="./guidelight.d.ts" />
/// <reference path="./pin.d.ts" />
/// <reference path="./bcr.d.ts" />
/// <reference path="./cam.d.ts" />
/// <reference path="./idcard.d.ts" />
/// <reference path="./asr.d.ts" />
/// <reference path="./sb.d.ts" />

import { Event } from 'src/helper/eventmanager';
type DeviceStatus = 'UNKNOW' | 'BUSY' | 'HEALTHY' | 'OPEN' | 'CLOSED';
type StatusEvent = Event<['StDeviceStatus' | 'StSafeState' | 'StSafeDoorStatus' | 'StCabinetState', any, DeviceStatus], 'StatusChanged'>;
declare global {
  /**
   * @summary 所有硬件服务模块
   */
  interface DeviceModules {
    /**
     * @summary 指示灯模块
     */
    glt: GuideLightsService & Service & DeviceService;
    /**
     * @summary 高拍仪模块
     */
    gpy: GPYService & Service & DeviceService;
    /**
     * @summary 密码键盘模块
     */
    pin: PinInputService & Service & DeviceService;
    /**
     * @summary 二维码模块
     */
    bcr: BcrService & Service & DeviceService;
    /**
     * @summary 摄像头模块
     */
    cam: CameraService & Service & DeviceService;
    /**
     * @summary 身份证模块
     */
    idcard: IDCardService & Service & DeviceService;
    /**
     * @summary 银行卡读卡器
     */
    idc: IDCService & Service & DeviceService;
    /**
     * @summary 市民卡读卡器
     */
    idc2: IDCService & Service & DeviceService;
    /**
     * @summary 语音模块
     */
    asr: AsrService & Service;
  }

  /**
   * @summary 硬件状态管理模块
   */
  interface MSMI {
    /**
     * @summary 检查所有模块的状态
     * @param modlist 模块列表
     */
    getAllState<T extends keyof DeviceModules>(modlist: Array<T | 'linetest'>): Promise<'ok' | 'fail'>;
    /**
     * @summary smi模块事件处理
     * @param event 事件
     */
    onEventCallBack(event: StatusEvent | Event): Promise<void>;
  }
}

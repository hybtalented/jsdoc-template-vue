/**
 * @summary 导航灯灯光操作
 * - OFF 关灯
 * - SLOW 慢闪
 * - MEDIUM 中闪
 * - QUICK 快闪
 * - CONTINUOUS 常亮
 */
type LightFrequence = 'OFF' | 'SLOW' | 'MEDIUM' | 'QUICK' | 'CONTINUOUS';
/**
 * @summary 导航灯名称
 * - DOCUMENTPRINTER 文档打印机
 * - SCANNER 身份证扫描
 * - FINGERPRINT 凭条打印机
 * - BARCODE 二维码
 * - UKEY 市民卡读卡器
 * - CAMERA 摄像头
 */
type GuideLightName = 'DOCUMENTPRINTER' | 'SCANNER' | 'FINGERPRINT' | 'BARCODE' | 'UKEY' | 'CAMERA';
/**
 * 身份证模块
 */
declare interface GuideLightsService {
  /**
   * 打开或关闭加密键盘指示灯
   * @param FlashRate 灯闪频率
   * @returns 0 - 成功 非0 - 失败
   */
  setPinPadLight(FlashRate: LightFrequence): number;

  /**
   * 高拍仪指示灯
   * @param FlashRate 灯闪频率
   * @returns 0 - 成功 非0 - 失败
   */
  setNoteDispenserLight(FlashRate: LightFrequence): number;

  /**
   * 打开或关闭vtm相关模块指示灯
   * @param strLightName 灯名
   * @param  FlashRate 灯闪频率
   * @returns 0 - 成功 非0 - 失败
   */
  setGuidLigtEx(strLightName: GuideLightName, strFlashRate: LightFrequence): number;
}

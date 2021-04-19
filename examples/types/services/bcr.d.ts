/**
 * 二维码服务相关接口
 */
declare interface BcrService {
  /**
   * @summary 开始二维码扫描
   * @param  timeout 超时时间
   * @returns 0 - 成功 非0 - 失败
   */

  readBarcode(timeout: number): number;

  /**
   * @summary 撤销条形码扫描
   * @returns 0 - 成功 非0 - 失败
   */
  cancelReadBarcode(): number;
}

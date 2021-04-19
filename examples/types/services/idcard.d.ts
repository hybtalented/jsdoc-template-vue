/**
 * @summary 身份证模块服务接口
 */
interface IDCardService {
  /**
   *
   * @param timeout 超时时间
   * @param waitTakenTimeout 等待取卡超时时间
   * @param savePath 身份证图片保存位置
   * @returns 0 - 成功 非0 - 失败
   */
  readImage(timeout: number, waitTakenTimeout: number, savePath: string): number;
}

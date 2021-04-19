/**
 * @summary 社保终端调用服务定义
 */
declare interface SheBaoService {
  /**
   * @summary 隐藏社保终端程序
   */
  hideSBTerminal(): void;
  /**
   * @summary 调用社保终端程序
   * @param idname 身份证名称
   * @param idcode 身份证号码
   */
  readcardCX(idname: string, idcode: string): void;
}
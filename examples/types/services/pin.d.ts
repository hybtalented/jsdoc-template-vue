/**
 * @summary 键盘回调定义
 * @memberof PinInputService
 */
interface KeyPressCallback {
  /**
   * @param keyName 按键名
   * @param keyCode 按键值
   */
  (keyName: string, keyCode: number): void;
}
/**
 * @summary 密码键盘服务接口
 */
declare interface PinInputService {
  /**
   * @summary 开始密文输入
   * @param span 参与运算的pan值
   * @param keyname 参与运算的keyname
   * @returns  密文
   */
  pinInputPin(span: string, keyname: string): Promise<string>;
  /**
   * @summary 开始明文输入
   */
  pinInputData(): Promise<string>;

  /**
   * @summary 设置键盘点击事件回调
   * @param callback 回调函数
   * @returns 旧的回调函数
   */
  setKeyPressProc(callback: KeyPressCallback): KeyPressCallback;

  /**
   * @summary 导密钥
   * @param keyname 密钥名称
   * @param bytearr 密钥值16进制
   * @param encKeyName 主密钥
   * @param useflags 密钥的加密函数
   * @returns 0 - 成功 非0 - 失败
   */
  LoadKey(keyname: string, bytearr: string, encKeyName: string, useflags: string): number;
}

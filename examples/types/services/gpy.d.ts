/**
 * @summary 高拍仪服务接口
 */
declare interface GPYService {
  /**
   * @summary 加载高拍仪，初始化摄像头
   * @returns 是否加载成功
   */
  Load(): boolean;
  /**
   * @summary 拍摄图像
   * @param Name 图像保存路径
   * @returns {void} 拍摄图像失败
   * @returns {string} 拍摄图像的文件名
   */
  Scan(Name: string) :void|string;
  /**
   * @summary 释放高拍仪资源
   */
  UnLoad():void;
  /**
   * @summary 设置高拍仪位置
   * @param left 距离屏幕左侧的距离
   * @param top 距离屏幕右侧的距离
   * @param width 高拍仪展示的宽度
   * @param height 高拍仪展示的高度
   */
  setGeometry(left: number, top: number, width: number, height: number): void;
  /**
   * @summary 显示高拍仪视频
   */
  show(): void;
  /**
   * @summary 隐藏高拍仪视频
   */
  hide() : void;
  /**
   * @summary 清除高拍仪相关资源，解绑所有事件
   */
  destroy(): void;
}
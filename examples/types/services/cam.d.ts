/**
 * 摄像头服务相关接口
 */
declare interface CameraService {
  /**
   * @summary 拍照
   * @param CameraID 相机ID号
   * @param CameraData 需要添加到图片上的文字和图片保存完整路径。
   * @returns 0 - 成功 非0 - 失败
   */
  takePicture(CameraID: string, CameraData: string): number;

  /**
   * @summary 打开预览窗
   * @param CameraID 摄像头 id
   * @param left 摄像头位置
   * @param top 摄像头位置
   * @param width 摄像头大小
   * @param height 摄像头大小
   * @returns 0 - 成功 非0 - 失败
   */
  startDisplay(CameraID: string, left: number, top: number, width: number, height: number): number;

  /**
   * @summary 关闭预览框
   * @param CameraID 摄像头id
   * @returns 0 - 成功 非0 - 失败
   */
  stopDisplay(CameraID: string): number;

  /**
   * @summary 设置预览框参数
   * @param lPositionX x坐标
   * @param lPositionY y坐标
   * @param lWidth 宽
   * @param lHight 高
   * @returns 0 - 成功 非0 - 失败
   */
  setGeometry(lPositionX: number, lPositionY: number, lWidth: number, lHight: number): number;
}

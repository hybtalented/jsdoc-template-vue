/**
 * @summary 读卡器服务
 */
declare interface IDCService {
  /**
   *  @summary 等待插卡
   * @param Tracks 磁道: "1,2,3"
   * @param time 超时时间
   * @returns 0 - 成功 非0 - 失败
   */
  insert(Tracks: string, time: string): number;

  /**
   * @summary 取消插入
   */
  cancelInsert(): void;

  /**
   * @summary 退卡
   * @param time 超时时间
   */
  eject(time: string): void;
  /**
   * @summary 吞卡
   */
  retain(): void;

  /**
   * @summary 获取磁道1数据
   * @returns 磁道数据
   */
  GetTrack1(): string;
  /**
   * @summary 获取磁道2数据
   * @returns 磁道数据
   */
  GetTrack2(): string;
  /**
   * @summary 获取磁道2数据
   * @returns 磁道数据
   */
  GetTrack3(): string;
}

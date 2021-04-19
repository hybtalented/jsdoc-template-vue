/**
 * @enum {string} 日志级别枚举
 */
 declare enum LoggerType {
  /**
   * 通知日志
   */
  EC_INFO = 'info',
  /**
   * 调试日志,在生产环境将关闭调试日志
   */
  EC_DEBUG = 'debug',
  /**
   * 警告日志
   */
  EC_WARN = 'warn',
  /**
   * 错误日志
   */
  EC_ERROR = 'error',
  /**
   * 严重错误日志
   */
  EC_FATAL = 'fatal'
}


/**
 * 平台日志接口
 *
 * @description 需要更具
 */
declare interface ILogger {
  /**
   * 打印通知日志
   * @param str  日志内容
   */
  info(str: string): void;
  /**
   * 打印警告日志
   * @param str  日志内容
   */
  warn(str: string): void;
  /**
   * 打印调试日志
   * @param str  日志内容
   */
  debug(str: string): void;
  /**
   * 打印错误日志
   * @param str  日志内容
   */
  error(str: string): void;
  /**
   * 打印重要错误日志
   * @param str  日志内容
   */
  fatal(str: string): void;
  /**
   * 打印日志
   * @param str  日志内容
   */
  PrintJrn(str: string): void;
}



type PlatFormResult<T> = T | Promise<T>;

/**
 * @summary 应用平台函数接口
 *
 * @description 应用平台是指提供 WebView 服务的应用，应用平台函数接口定义了应用平台上应该提供的一些让页面进行调用的方法
 */
declare interface IPlatform {
  /**
   * @summary 平台初始化
   * @param interval 尝试间隔
   * @param maxRetry 最大尝试次数
   * @param callback 初始化函数（可选）
   */
  init(interval: number, maxRetry: number, callback?: Function): Promise<string>;
  /**
   * @summary 关闭系统
   */
  ComputerShutdown(): PlatFormResult<void>;
  /**
   * @summary 清除缓存
   */
  clearCache(): PlatFormResult<void>;

  /**
   * @summary 判断文件名是否存在
   * @param filename 文件名
   * @returns 大于0表示文件存在，<=0 表示文件存在
   */
  IsFileExist(filename: string): PlatFormResult<number>;
  /**
   *  @summary 重启系统
   */
  ComputerRestart(): PlatFormResult<void>;
  /**
   * @summary 将本地应用的入口地址设置为对应地址，并立即跳转到该url
   * @param url 新入口url
   */
  LoadUrl(url: string): PlatFormResult<void>;
  /**
   * @summary 获取本机ip
   * @returns 本机ip
   */
  GetIPAddress(): PlatFormResult<string>;
  /**
   * @property 获取当前url上次访问的hash值的变量名
   */
  readonly urlLabel: string;
  /**
   * @summary  获取本地配置
   * @param name 配置名称
   * @returns 配置值
   */
  GetConfig(name: string): string;
  /**
   * @summary 保存本地配置
   * @param name 配置名称
   * @param value 配置值
   */
  SetConfig(name: string, value: string): PlatFormResult<void>;
  /**
   * @summary 读取本地文件
   * @param filename 文本文件名称
   * @returns 文本文件内容
   */
  ReadFileText(filename: string): PlatFormResult<string>;

  /**
   * @summary 获取终端机器码
   * @param 终端序列号
   * @returns 终端机器码
   */
  GetMachineCode(seqno: string): PlatFormResult<string>;
  /**
   * @summary 读取本地文件base64
   * @param filename 文件名称
   * @returns 文件base64
   */
  ReadFileBase64(filename: string): PlatFormResult<string>;
  /**
   * @summary 写本地文本文件
   * @param filename 文本文件名称
   * @param text 文本文件内容
   */
  WriteFileText(filename: string, text: string): PlatFormResult<void>;
  /**
   * @summary 写本地文件base64
   * @param filename 文件名称
   * @param base64 文件base64
   * @param type 文件类型
   */
  WriteFileBase64(filename: string, base64: string, type: string): PlatFormResult<void>;
  /**
   * @summary 删除文件
   * @param path 文件路径
   */
  DeleteFile(path: string): PlatFormResult<void>;

  /**
   * @summary 获取内存使用情况
   * @returns 内存使用量
   */
  GetMemeryUsage(): PlatFormResult<number>;
  /**
   * @summary 创建目录
   * @param path 目录名称
   */
  makeDir(path: string): PlatFormResult<void>;

  /**
   * @summary 设置注册表
   * @param keyType 注册表位置
   * @param Path 注册表路径
   * @param Name 注册键名
   * @param Type 注册值类型
   * @param Data 注册键值
   * @param Size 注册键值的长度
   */
  SetRegistryValue(KeyType: string, Path: string, Name: string, Type: string, Data: string, Size: number): PlatFormResult<void>;

  /**
   * @summary 设置注册表
   * @param KeyType 注册表位置
   * @param Path 注册表路径
   * @param Name 注册键名
   * @param Type 注册值类型
   */
  GetRegistryValue(KeyType: string, Path: string, Name: string, Type: string): PlatFormResult<string>;
  /**
   * @summary 全屏浏览器
   */
  FullScreen(): void;
  /**
   * @summary 退出应用
   */
  KillApp(): void;
  /**
   * @summary 重启应用
   */
  RestartApp(): void;
}

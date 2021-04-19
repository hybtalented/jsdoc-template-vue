/// <reference path="./services/index.d.ts" />
/// <reference path="./login.d.ts" />
/// <reference path="./event.d.ts" />
/// <reference path="./flow.d.ts" />
/// <reference path="./ui.d.ts" />

/**
 * @summary 时间操作模块相关接口定义
 */
interface MEctime {
  /**
   * @summary 将日期对象格式化
   * @param date 日期
   * @param format 日期格式 y 年 M 月 d 日 h|H 小时 m 分钟 s 秒 S 毫秒 q 季度 E 星期
   * @returns 格式化后的日期
   */
  pattern(date: Date, format: String): String;
  /**
   * @summary 解析时间字符串
   * @param datestring 字符串
   * @param format 字符串格式，如yyyyMMdd
   * @returns 如果解析成功，返回对应日期，否则返回当前时间
   */
  parse(datestring: string, format: string): Date;
  /**
   * @summary 获取month个月之前的日期
   * @param month 当前日期以前的月份数
   * @returns 日期对象
   */
  getAgoMonth(month: Number): Date;
}
/**
 * @summary 数据字典模块相关接口定义
 */
interface MDatadic {
  /**
   * @summary 设置dd变量
   * @param name dd变量名称
   * @param value dd变量值
   * @param args 其他设置的dd变量，如果长度为奇数，最后一个值将传给`b_writeDB`
   *
   * @description 设置dd变量的值，b_writeDB 表示是否将dd变量写入本地数据库
   */
  setDD(name: string, value: any, ...args: []): void;
  /**
   * @summary 设置dd变量
   * @param config dd变量键值对
   *
   * @description 设置dd变量的值，b_writeDB 表示是否将dd变量写入本地数据库
   */
  setDD(config: { [ddname: string]: any }): void;
  /**
   * @summary 带有默认值判断的dd变量设置
   * @description 如果dd变量不存在，则设置dd变量，否则，什么都不做
   * @param defaultDD 默认的dd变量值
   * @returns 设置的dd变量结果
   */
  defaultDD(defaultDD: {
    [ddname: string]: any;
  }): Promise<{
    [ddname: string]: any;
  }>;
  /**
   * @summary 带有默认值判断的dd变量设置
   *
   *
   * 如果dd变量不存在，则设置dd变量，否则，什么都不做
   * @param name dd变量名
   * @param value dd变量值
   * @param args 类似于 name 和 value
   * @returns 设置的dd变量结果
   */
  defaultDD(
    name: string,
    value: any,
    ...args: []
  ): Promise<{
    [ddname: string]: any;
  }>;
  /**
   * @summary 获取dd变量
   * @param name dd变量名称
   * @param context 上下文对象，上下文中的相关变量可以在formatDD中作为变量使用
   * @returns dd变量值
   */
  getDD(name: string, context: { [key: string]: any }): any;
  /**
   * @summary 格式化dd变量
   * @param value 带格式化的dd变量 {ddname} 包围
   * @param context 上下文对象，上下文中的相关变量可以在formatDD中作为变量使用
   * @returns 格式化结果
   */
  formatDD(value: string, context: { [key: string]: any }): any;
  /**
   * @summary 格式化字符串
   * @param value 带格式化的dd变量 `{ddname1} {ddname2}` 包围
   * @param context 上下文对象，上下文中的相关变量可以在formatDD中作为变量使用
   * @returns 格式化结果
   */
  replaceDD(value: string, context: { [key: string]: any }): string;
}

/**
 * @summary 所有的全局模块定义
 */
declare interface ReqModules extends DeviceModules {
  /**
   * 数据字典模块
   */
  datadic: MDatadic;
  /**
   * ui模块
   */
  ui: MUI;
  /**
   * 硬件状态管理模块
   */
  smi: MSMI;
  /**
   * 时间格式化
   */
  ectime: MEctime;
  /**
   *  流程调用
   */
  flow: MFlow;
  /**
   * 事件管理模块
   */
  event: MEventManager;
  /**
   * 业务和用户信息管理模块
   */
  login: MLogin;
  /**
   * 社保省统一应用调用接口
   */
  sb: SheBaoService & Service;
}

/// <reference path="./native.d.ts" />
/// <reference path="./services/index.d.ts" />
/// <reference path="./req.d.ts"/>
/// <reference path="./platform.d.ts"/>
import { IAPI } from './api';

declare global {
  /**
   * @summary 公共api
   */
  const api: IAPI;
  /**
   * @summary 平台函数
   */
  const platform: IPlatform;
  /**
   * @summary 通知日志
   */
  const EC_INFO = LoggerType.EC_INFO;
  /**
   * @summary 调试日志
   */
  const EC_DEBUG = LoggerType.EC_DEBUG;
  /**
   * @summary 警告日志
   */
  const EC_WARN = LoggerType.EC_WARN;
  /**
   * @summary 错误日志
   */
  const EC_ERROR = LoggerType.EC_ERROR;
  /**
   * @summary 严重日志
   */
  const EC_FATAL = LoggerType.EC_FATAL;

  /**
   * @summary 日志管理中心
   */
  const logger: ILogger;

  /**
   * @summary 打印跟踪日志，用于更好的定位错误位置
   * @param type 日志类型
   * @param template 模板字符串
   * @param args 模板参数
   */
  function Trace(type: LoggerType, template: string, ...args: string[]): void;

  /**
   * @summary 获取模块实例
   * @param name
   */
  function req<T extends keyof ReqModules>(name: T): ReqModules[T];
  
  /**
   * @summary 保存交易结果到dd变量t_load_info_all
   * @param result.trans_result 交易结果，如果未设置，则根据交易报文的结果设置
   * @param result.trans_result_detail 交易结果详情
   * @param result.savefail 是否仅在报文失败时保存交易结果
   * @param result.channel 交易渠道
   */
  function SaveTransResultTop(result: { trans_result?: 'success' | 'fail' | 'quit', trans_result_detail: string, savefail?: boolean, channel: string }): void;

  type ReqModulesType = ReqModules;
}

/// <reference path="./flowrunner.d.ts" />
import { Step } from 'src/helper/flowrunner';
declare global {
  /**
   * @summary 流程管理模块相关接口定义
   */
  interface MFlow {
    /**
     * @summary 运行流程
     *
     * @param flowname 流程名
     * @param flowobj 流程配置
     * @param sonWin 流程步骤定义位置
     * @param startnode  起始运行节点
     * @returns 流程运行结果
     */
    RunScript(flowname: string, flowobj: object, sonWin: object, startnode: string): Promise<string>;
    /**
     * @summary 执行步骤
     * @param flowname 执行步骤的流程名
     * @param name 步骤名
     * @param param 步骤参数
     * @param flag  步骤标识
     * @param pStep 调用该步骤的父步骤
     * @returns 步骤运行结果
     */
    CallStep(flowname: string, name: string, param: any, flag: string, pStep: Step | null): Promise<string>;
    /**
     * @summary 停止流程
     * @param flowname 流程名
     */
    stopFlowByName(flowname: string): Promise<void>;
    /**
     * @summary 在指定流程上运行子流程
     * @param flowname 流程名
     * @param name 子流程名
     * @param window 子流程window
     * @param startnode 起始节点
     * @returns 流程运行结果
     */
    RunScriptByName(flowname: string, name: string, window: object, startnode?: string): Promise<string>;
    /**
     * @summary 注册一个新的流程
     *
     * @note 在创建流程时，还会同时创建一个事件管理者( EventManager )
     * @param flowname 流程名
     * @param descript 流程描述
     */
    registerFlow(flowname: string, descript: string): void;
  }

  /**
   * @summary 步骤函数
   */
  interface FlowContext {
    /**
     * @summary 流程上下文定义
     * 
     * 对象中的每一个键都为流程流程步骤
     */
    [name: string]: new () => Step;
  }
}

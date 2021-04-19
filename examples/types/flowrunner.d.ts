/// <reference path="./eventmanager.d.ts" />

/**
 * @summary 流程节点定义
 */
declare interface FlowNode<ResultList extends string, NodeNameList extends string> {
  /**
   * @summary 步骤参数
   */
  param: any;
  /**
   * @summary 流程步骤函数名
   */
  exec:
    | string
    | {
        name: string;
        next?: string;
      };
  /**
   * @summary 流程节点映射表
   */
  ret: Record<ResultList, NodeNameList>;
  /**
   * @summary 节点描述
   */
  descript: string;
}

/**
 * @summary 流程程序配置
 */
declare type FlowProgram<NodeEntry extends string> = Record<NodeEntry, FlowNode<string, NodeEntry>>;

/**
 * @summary 流程运行器模块
 *
 * 该模块中定义了基本流程步骤基类和流程执行类
 */
declare module '\*/helper/flowrunner' {
  import { Event } from 'src/helper/eventmanager';
  /**
   * @summary 子步骤调用完成事件类
   */
  export class CallStepEvent extends Event {
    /**
     * @summary 子步骤标识
     */
    flag: string;
    /**
     *
     * @param flag 子步骤标识
     * @param ret 步骤返回值
     */
    constructor(flag: string, ret: string);
  }
  /**
   * @summary 基本流程步骤类
   */
  export abstract class Step {
    /**
     * @property 等待时的返回值
     */
    static readonly WAIT: string;
    /**
     * @summary 调用子步骤
     * @param name 步骤名
     * @param flag 步骤标识
     * @param param 传给步骤的参数
     * @returns 步骤执行结果
     */
    CallStep(name: string, flag: string, param: any): string;
    /**
     * @summary 等待事件
     * @param mod 事件模块
     * @param evts 事件列表，逗号分隔
     */
    AsynWaitEvt(mod: string, evts: string): void;
    /**
     * @summary 流程调用参数
     */
    FlowParam: any;
    /**
     * @summary 流程步骤入口
     * @param param 调用参数
     * @returns 步骤返回值，如果返回 Step.WAIT 流程将等待步骤，直到 onevent 返回; 如果返回值为其他字符串，步骤将以及返回.
     */
    abstract Process(param?: any): string;
    /**
     * @summary 开发环境步骤如果
     *
     * @description 在调试启用时调用
     * @param param 调用参数
     * @returns 步骤返回值，如果返回 Step.WAIT 流程将等待步骤，直到 onevent 返回; 如果返回值为其他字符串，步骤将以及返回.
     */
    abstract devProcess(param?: any): string;
    /**
     * @summary 事件处理函数
     * @param event 事件
     * @returns 步骤返回值，如果返回 Step.WAIT 流程将等待步骤，直到 onevent 返回; 如果返回值为其他字符串，步骤将以及返回.
     */
    abstract onevent(event: Event | CallStepEvent): string;
    /**
     * @summary 打印跟踪日志
     */
    Trace: typeof Trace;
  }

  /**
   * @summary 流程执行器
   */
  export class FlowRunner {
    /**
     * @summary 构造函数
     * @param name 流程名
     * @param context vuex上下文
     */
    constructor(name: string, context: object);
    /**
     * @summary 启用关闭开发模式
     * @param isDev 是否启用
     */
    switchDev(isDev: boolean): void;
    /**
     * @summary 运行流程
     * @param flowname 流程名
     * @param flowobj 流程配置
     * @param subWin 流程步骤定义位置
     * @param startnode  起始运行节点
     * @returns 流程运行结果
     *
     * @description 不同于 {@link helper/flowrunner.FlowRunner#RunScript}， {@link helper/flowrunner.FlowRunner#run} 将会确保之前运行的流程退出以后，然后才会开始继续新的流程
     */
    run<T extends string>(flowname: string, flowobj: FlowProgram<T>, subWin: FlowContext, startnode: string): Promise<string>;

    /**
     * @summary 移除当前调用的所有根步骤
     */
    removeListCallStep(): Promise<void>;
    /**
     * @summary 停止当前运行的流程
     *
     * @description 停止当前正在运行的流程，如果当前有流程等待运行，还会通知新流程之前的流程已经停止
     */
    stopFlow(): Promise<void>;
    /**
     * @summary 运行流程
     * @param  flowname 流程名
     * @param  flowobj 流程配置
     * @param subWin 流程步骤定义位置
     * @param  startnode  起始运行节点
     * @param  rId 当前流程执行的唯一Id
     * @returns  流程运行结果
     */
    RunScript(flowname: string, flowobj: object, subWin: FlowContext, startnode: string, rId: number): Promise<string>;

    /**
     * @summary 运行节点
     * @param  pStep 父节点
     * @param name 步骤类名
     * @param flag Object flag标志
     * @param param 调用参数
     * @param callback 步骤完成回调函数
     * @param  immediate 在步骤成功返回是是否立即触发步骤的完成回调
     * @returns  步骤返回结果
     *
     * @description 运行步骤，并立即返回步骤 {@link helper/flowrunner.FlowRunner#init} 或 {@link helper/flowrunner.FlowRunner#Process} 的返回值
     */
    private CallStep(pStep: Step | null, name: string, flag: string, param: any, callback: (string) => void, immediate: boolean): string | Promise<string>;
    /**
     * @summary 运行节点
     * @param pStep 父节点
     * @param name 步骤类名
     * @param flag flag标志
     * @param param 参数
     *
     * @description 异步调用步骤，在步骤完全退出以后完成
     */
    CallStepASync(pStep: Step, name: string, flag: string, param: any): Promise<string>;

    /**
     * @summary 运行子流程
     * @param node 子流程所在节点配置
     * @param prevNode 当前流程的流程名和节点名
     * @param prevNode.name 父流程名称
     * @param prevNode.id 父流程当前节点名称
     * @param rId 子流程流程 id，继承于父流程
     * @returns 子流程调用结果
     */
    runsubflow(node: FlowNode<string, string>, prevNode: { name: string; id: string }, rId: number): Promise<string>;
  }
}

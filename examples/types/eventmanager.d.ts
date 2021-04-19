/**
 * @summary 流程事件管理模块
 *
 * @description 模块中主要实现了基本事件类，以及事件管理中心类
 */
 declare module '\*/helper/eventmanager' {
  /**
   * @summary 基本流程事件类
   */
  export class Event<T extends Array<any> = [], RetType extends string = ''> {
    /**
     * 模块名
     */
    mod: string;
    /**
     * 调用方法名
     */
    func: string;
    /**
     * 事件参数
     */
    param: T;
    /**
     * 事件名称
     */
    ret: RetType;
    /**
     * @param mod 模块名
     * @param func 方法名
     * @param param 事件参数
     * @param ret 事件名
     */
    constructor(mod: string, func: string, param: T, ret: RetType);
  }
  /**
   * @summary 事件管理中心类
   *
   * 负责对对流程步骤的事件进行管理，功能包括事件的绑定、解绑与分发。
   */
  export class EventManager {
    /**
     * 将事件对象分发到对应的步骤
     * @param evt　事件对象
     */
    dispatch(evt: Event): void;
    /**
     * @summary 调用步骤的事件处理函数
     * @param {Step} step 步骤
     * @param event 事件
     * @see {@link helper/flowrunner.Step#onevent}
     */
    doEvent(step, event: Event): void;
    /**
     * @summary 监听事件
     * @param {Step} step 需要监听事件的步骤
     * @param mod 事件模块名
     * @param evts 事件列表，都号分隔
     * @param data 针对 UI 事件可以通过 data 对事件传参
     */
    attachEvent(step, mod: string, evts: string, data?: any): void;
    /**
     * @summary 停止步骤的所有事件监听
     * @param {Step} step 步骤
     */
    detachEvent(step): void;
    /**
     * @summary 停止事件管理中心目前所有监听的事件
     */
    detachAllEvent(): void;
  }
}
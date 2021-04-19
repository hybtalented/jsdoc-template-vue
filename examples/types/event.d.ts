

/// <reference path="./eventmanager.d.ts" />
import { Event, EventManager } from 'src/helper/eventmanager';
declare global {
  /**
   * @summary 流程事件管理模块相关接口定义
   */
  interface MEventManager {
    /**
     * @summary 将事件分发到所有的事件管理者
     * @param event 事件
     */
    dispatchEvent(event: Event): void;
    /**
     * @summary 注册一个新的事件管理者
     *
     * @description 目前，每一个 FlowRunner 都拥有各自的 EventManager 实例. 而 EventManager 实例复制将事件分发
     * 到对应流程的流程步骤
     * @param flowname 流程名
     * @param eventmanager 流程对应的事件管理者实例
     */
    registerEventManager(flowname: string, eventmanager: EventManager): void;
  }
}

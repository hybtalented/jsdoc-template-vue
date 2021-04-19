/// <reference path="./login.d.ts" />
import Vue, { Component } from 'vue';

/**
 * @summary UI 模块
 * @module src/module/ui
 */
/**
 * @summary 事件处理函数模板
 *
 * @tparam ArgTypes 函数参数类型
 * @tparam OutType 函数返回类型
 */
interface UIHandler<ArgTypes extends any[] = [], OutType = void> {
  (this: Vue, ...args: [...ArgTypes, string]): OutType;
}

type MouseEventParams = { id: string; event: MouseEvent; target: HTMLElement };

/**
 * @summary 页面状态
 */
type PageStates = 'inited' | 'vox_played' | 'busy' | 'checkFailed';
/**
 * @summary UI 模块管理的当前聚焦的输入框的描述信息定义
 */
interface InputInfo {
  /**
   * @summary 调用键盘类型类型
   */
  type: 'pin' | 'customize' | 'num' | 'sfz' | 'key_num' | 'hex_upper' | 'en_upper' | 'en_lower' | 'other';
  /**
   * @summary 输入框 DOM 元素
   */
  input: HTMLInputElement;
  /**
   * @summary 键盘位置
   */
  position?: 'topleft' | 'topmiddle' | 'topright' | 'bottomleft' | 'bottommiddle' | 'bottomright';
  /**
   * @summary 键盘缩放
   */
  scale?: number;
}
/**
 * @summary 内置的 UI 钩子函数
 */
interface UIHandlers {
  /**
   * @property 组件数据准备钩子
   */
  OnInitPage: UIHandler;
  /**
   * @property 开发环境数据配置钩子
   */
  OnDevData?: UIHandler;
  /**
   * @property s_return点击事件处理钩子
   * @param ret s_return 值
   * @param ele 触发事件的元素
   * @returns true 阻止ui返回事件触发
   */
  OnClick?: UIHandler<[string, HTMLElement], boolean>;
  /**
   * @property s_check校验处理钩子
   * @param id 校验输入框id
   * @param value 输入框值
   * @param input 输入框
   * @returns show_msg 展示错误信息
   */
  OnCheckValue?: UIHandler<[string, string, HTMLInputElement], string>;
  /**
   * @property 页面html元素后期处理钩子
   */
  OnInit?: UIHandler;
  /**
   * @property 页面退出前处理钩子
   * @param result 页面退出的结果
   */
  OnClose?: UIHandler<[string]>;
  /**
   * @property 聚焦事件处理钩子
   * @param id focusid
   * @param type focusin - 获得焦点 focusout - 失去焦点
   */
  OnFocus?: UIHandler<[{ id: string; type: 'focusin' | 'focusout' }], boolean>;
  /**
   * @property 页面键盘输入钩子
   * @param key 按键值
   * @param ctrlKey 是否按下ctrl键
   * @param shiftKey 是否按下shift键
   */
  OnKeyInput?: UIHandler<[{ key: string; ctrlKey: boolean; shiftKey: boolean }], boolean>;
  /**
   * @property 鼠标按下事件
   * @param id 产生的事件的元素mouseid
   * @param event 鼠标事件
   * @param target 鼠标事件对象
   * @returns 事件是否停止传播
   */
  OnMouseDown?: UIHandler<[MouseEventParams], boolean>;
  /**
   * @property 鼠标释放事件
   * @param id 产生的事件的元素mouseid
   * @param event 鼠标事件
   * @param target 鼠标事件对象
   * @returns 事件是否停止传播
   */
  OnMouseUp?: UIHandler<[MouseEventParams], boolean>;
  /**
   * @property 鼠标经过事件
   * @param id 产生的事件的元素mouseid
   * @param event 鼠标事件
   * @param target 鼠标事件对象
   * @returns 事件是否停止传播
   */
  OnMouseMove?: UIHandler<[MouseEventParams], boolean>;
  /**
   * @property 鼠标移动事件
   * @param id 产生的事件的元素mouseid
   * @param event 鼠标事件
   * @param target 鼠标事件对象
   * @returns 事件是否停止传播
   */
  OnMouseOver?: UIHandler<[MouseEventParams], boolean>;
  /**
   * @property 鼠标经过事件
   * @param event 鼠标事件
   * @returns 事件是否停止传播
   */
  OnMouse?: UIHandler<[MouseEvent], boolean>;

  /**
   * @property 页面check白名单
   * @returns 白名单数组
   */
  additionalPageWhiteList?: UIHandler<[], String[]>;
}
declare global {
  /**
   * @summary UI 钩子函数定义
   */
  type UIHandlersType = UIHandlers;
  /**
   * @summary ui模块
   */
  interface MUI {
    /**
     * 获取当前页面状态
     * @param name 状态名
     */
    getPageState(name: PageStates): boolean;
    /**
     * @summary 设置当前页面状态为true
     * @param name 状态名
     */
    setPageState(name: PageStates): void;
    /**
     * @summary 设置当前页面状态为 false
     * @param name 状态名
     */
    resetPageState(name: PageStates): void;
    /**
     * @summary 显示主页菜单
     * @param param.url 路由地址
     * @param param.page 页数
     *
     * @description 显示主页菜单，并跳转到指定路由的指定页
     */
    showMenu(param: { url: string; page: string }): Promise<void>;
    /**
     * @summary 隐藏主页菜单
     */
    hideMenu(): Promise<void>;
    /**
     * @summary 锁定ui事件，启用返回事件
     */
    lock(): void;
    /**
     * @summary 解锁ui事件，禁止返回事件
     */
    unlock(): void;
    /**
     * @summary 显示页面
     * @param curr_page 页面名称
     */
    showpage(curr_page): void;
    /**
     * @summary 获取当前渲染业务或其子组件
     * @param ref 子组件的ref或空
     */
    componentInstance(ref?: string): Vue;
    /**
     * @summary 调用页面钩子
     * @param name 钩子名
     * @param args 参数
     * @returns 钩子函数的返回值
     */
    doPageFunc(name: keyof UIHandlers, ...args: any[]): void | boolean;
    /**
     * @summary 跳转到指定路由
     * @param url 请求内部路由地址
     */
    navigate(url: string): Promise<boolean>;
    /**
     * @summary 跳转到指定url的业务，不在进入业务前做一些预处理操作
     * @param config.url 业务的路由
     * @param config.menu_url 跳转前的菜单路由
     * @param config.menu_page 跳转前菜单的页数
     */
    goto_service_page(config: { url: string; menu_url: string; menu_page?: number }): Promise<void>;
    /**
     * @summary 跳转路由到指定业务
     * @param bussiness 业务名
     *
     * @attention 调用 goto_bussiness_page 不会隐藏主页菜单，需要调用 req('ui').hideMenu() 隐藏菜单
     */
    goto_bussiness_page(bussiness: string): Promise<void>;
    /**
     * @summary 产生一个返回事件
     * @param s_return 放回事件的返回值
     */
    return_page(s_return: string): Promise<void>;
    /**
     * @summary 设置当前选中的输入框
     * @param input_info 输入框信息
     */
    setCurrentInput(input_info: InputInfo): void;
    CurrInputInfo: InputInfo;
    /**
     * @summary 播放语音
     * @description 语音播放目前是在App.vue里通过 <bgsound /> 元素进行播放
     * @param vox 语音文件名
     */
    playSnd(vox): void;
    /**
     * @summary  初始化业务的流程配置
     * @param options vue组件配置
     * @param page_func 流程页面的钩子函数定义
     * @param window 流程页面的步骤定义
     * @param prograss_info
     */
    InitPage<T extends string>(options: Component, page_func: PageHandlers<T>, window: FlowContext, prograss_info: Array<PrograssInfo<T>>): void;
  }
  /**
   * @summary 页面钩子函数
   */
  type PageHandlers<T extends string = string> = Record<T, UIHandlers>;
}

/**
 * @summary 对 HTML 元素的扩展
 */
interface HTMLElement {
  /**
   * @summary 模拟触发一个事件
   * @param type 事件类型
   * @param eventParam 事件参数
   * @param eventTypeName 事件类名称
   * @returns 如果调用了 event.preventDefault， 则返回 false
   */
  dispatchFakeEvent(type: 'input' | 'click' | 'focusin' | 'focusout' | 'keydown' | 'keypress', eventParam?: { [name: string]: any }, eventTypeName?: string): boolean;
  /**
   * 模拟触发一个点击事件
   * @returns 如果调用了 event.preventDefault， 则返回 false
   */
  fakeClick(): boolean;
  /**
   * 模拟聚焦
   *
   * 1. 如果元素内部包含 input 或 textarea, 自动聚焦input(textarea),
   * 2. 如果元素内部不包含 input 或 textarea，在改触发一个模拟的聚焦事件
   */
  fakeFocus(): void;
}
type KeyboradValueType = 'CLEAR' | 'BACKSPACE' | '{BACKSPACE}' | '退格' | 'CLEAR' | 'CANCEL' | 'ENTER' | string;
/**
 * @summary 对 HTML 输入框元素的扩展
 */
interface HTMLInputElement {
  /**
   * @summary 获取光标所在位置
   * @returns 当前光标的起始位置
   */
  iGetFieldPos(): number;
  /**
   * @summary 获取当前输入框选中的长度
   * @number 输入框选中范围的长度
   */
  iGetFieldLength(): number;
  /**
   * @summary 选中指定位置内字符 || 设置光标位置
   * - 从start起选中(含第start个)，到第end结束（不含第end个）
   * - 若不输入end值，即为设置光标的位置（第start字符后）
   * @param start 起始位置
   * @param end  结束位置
   */
  iSelectField(start: number, end?: number): void;
  /**
   * @summary 选中指定字符串
   * @param 字符串
   */
  iSelectStr(str: string): void;
  /**
   * @summary 在光标之后插入字符串
   * @param 字符串
   */
  iAddField(str: string): void;
  /**
   * @summary 删除光标前面(-)或者后面(+)的n个字符
   * @param n 删除的字符数
   */
  iDelField(n: number): void;
  /**
   * @summary 删除当前选中范围
   */
  iDelSelection(): void;
  /**
   * @summary 输入相关
   * @param val 输入值
   *
   * - CLEAR 清除输入框
   * - BACKSPACE，{BACKSPACE}，退格 删除光标前一个字符
   * - CANCEL，ENTER 完成输入操作
   */
  doInputVal(val: KeyboradValueType): void;
  /**
   * 模拟按键值输入
   *
   * @summary 模拟按键值输入，但是输入框的值并没有真正改变
   * @param val 按键值
   * @returns 输入按键后输入框的值
   */
  fakeInputValue(val: string): string;
  /**
   * @summary 模拟输入框聚焦
   *
   * 聚焦输入框，并产生一个 focusin 事件
   */
  fakeFocus(): void;
  /**
   * @summary 模拟输入框失去焦点
   *
   * 输入框失去焦点，并产生一个 focusout 事件
   */
  fakeBlur(): void;
}

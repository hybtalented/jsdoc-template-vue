import { VNodeData } from 'vue';

declare global {
  interface CommonProps {
    /**
     * @summary dd变量双向绑定
     *
     * 其内容为绑定的dd变量名
     */
    s_model: string;
    /**
     * @summary 点击时的ui返回值
     */
    s_return: string;
    /**
     * @summary 用于输入框校检
     *
     * 其值为存储校检错误消息dd变量的名称，如果校检失败则dd变量值为对应的消息，否则为 false
     */
    s_check: string;
    /**
     * @summary 手机号码校检
     *
     * 需要搭配 s_check 使用，内容为校检失败时dd变量设置的消息
     * @note
     */
    s_phone: string;
    /**
     * @summary 字符串最小长度校检
     *
     * 需要搭配 s_check 使用，其中 length 为校检字符串的最小长度，message 为校检失败时dd变量设置的消息
     */
    s_minLength: {
      length: number;
      message: string;
    };
    /**
     * @summary 字符串最大长度校检
     *
     * 需要搭配 s_check 使用，其中 length 为校检字符串的最大长度，message 为校检失败时dd变量设置的消息
     */
    s_maxLength: {
      length: number;
      message: string;
    };
    /**
     * @summary 聚焦事件绑定
     *
     * 内容为绑定该聚焦事件的输入框的标识，会触发 OnFocus 钩子
     */
    s_focus: string;
  }
  /**
   * @summary ui.json 节点配置
   */
  type VueConfig = CommonProps & VNodeData;
  /**
   * @summary vue个是 html 语法树
   */
  interface VueJsonTree {
    /**
     * @summary vue组件名称或者html标签
     */
    name: string;
    /**
     * @summary 元素属性配置
     */
    config: VueConfig;
    /**
     * @summary 子元素
     */
    children: Array<VueJsonTree | string>;
  }
}

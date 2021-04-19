import * as axios from 'axios';

/**
 * 工具函数 api 接口
 */
declare interface IAPI {
  /**
   * @summary base64解码
   * @param base64 待解码的base64
   * @returns {ArrayBuffer} 解码结果
   */
  base64_decode(base64: string): ArrayBuffer;
  /**
   * @summary base64编码
   * @param data 待编码的内容
   * @returns 编码后的base64
   */
  base64_encode(data: [] | ArrayBuffer | Uint8Array | string): string;
  /**
   * @summary 数据或者对象分组
   * @param data 待分组的对象
   * @param by 分组方式
   * @returns 解码结果
   *
   *
   * @description 如果分组by是一个数字，分组结果是一个数组， 数据里每个元素是一个有对应的元素（键值）的数组（对象）。
   *        如果by是一个字符串，将在照数组或对象里每一个元素的对应键值进行分组，分组结果是一个对象
   */
  groupby(data: [] | Object, by: number | string): [] | object;
  /**
   * @summary 去除字符串两边的空字符
   * @param str 待处理的字符串
   */
  trimStr(str: string): string;
  /**
   * @summary 去除字符串两边的回车、制表符和空格
   * @param str 待处理的字符串
   */
  trimEmpty(str: string): string;
  /**
   * @summary 计算表达式
   * @param str 表达式
   * @param context 上下文
   */
  eval(str: string, context: object): void;
  /**
   * @summary 增加终端消息流水号，并保存到平台数据库
   */
  addSEQ(): void;
  /**
   * @summary 异步发送get请求
   * @param url 请求的url地址
   * @param config 请求体
   * @param dataType 请求的数据内容类型
   * @returns 请求结果的内容
   */
  get<T>(url: string, config?: axios.AxiosRequestConfig, dataType?: ResponseType): Promise<T>;
  get<T = object | any[]>(url: string, config?: axios.AxiosRequestConfig, dataType?: 'json'): Promise<T>;
  get<T = ArrayBuffer>(url: string, config?: axios.AxiosRequestConfig, dataType?: 'arraybuffer'): Promise<T>;
  /**
   * @summary 异步发送post请求
   * @param url 请求的url地址
   * @param config 请求体
   * @param dataType 请求的数据内容类型
   * @returns 请求结果的内容
   */
  post<T, R = axios.AxiosResponse<T>>(url: string, config?: axios.AxiosRequestConfig, dataType?: ResponseType): Promise<R>;
  post<T = object | any[], R = axios.AxiosResponse<T>>(url: string, config: axios.AxiosRequestConfig, dataType: 'json'): Promise<R>;
  post<T = ArrayBuffer, R = axios.AxiosResponse<T>>(url: string, config: axios.AxiosRequestConfig, dataType: 'arraybuffer'): Promise<R>;
  /**
   * @summary 将字符串类型的style转化为对象
   * @param style style字符串
   * @returns style对象
   */
  Style2Object(style: string): object;
  /**
   * @summary 将当个css配置转化为style
   * @param css 待转换的css
   * @returns 转换结果
   */
  Css2Style(css: string): string;
  /**
   * @summary 将对象的style转换为字符串类型的style
   * @param obj style对象
   * @returns 转换结果
   */
  Object2Style(obj: object): string;
  /**
   * @summary 将style对象转换为对应的css
   * @param selector css选择器
   * @param obj style对象
   * @returns 转换的css
   */
  Object2Css(selector: string, obj: object): string;
  /**
   * @summary 将VBArray转化为16进制字符串
   * @param hex VBArray对象
   * @returns 转化结果
   */
  hexToStr(hex: VBArray<number>): string;
  /**
   * @summary 将Array转化为16进制字符串
   * @param hex 待转化的数据
   * @returns 转化结果
   */
  hexobjToStr(hex: Array<number> | Uint8Array): string;
  /**
   * @summary 将16进制字符串转化为Uint8Array
   * @deprecated 请使用 bytesToHexString 方法
   * @param str 16进制字符串
   * @returns 转化结果
   */
  strToHex(str: string): Uint8Array;
  /**
   * @summary 将VBArray装换为Array
   * @param hex
   * @returns 转化结果
   */
  hex2array(hex: VBArray): Array<number> | null;
  /**
   * @summary 将BCD字符串转化为16进制字符串
   * @param str BCD字符串
   * @returns 16进制字符串
   */
  bcdStrToHexStr(str: string): string;
  /**
   * @summary 将数据转化为16进制字符串
   * @param bytes 待转化的数据
   * @returns 16进制字符串
   */
  bytesToHexString(bytes: Array<number> | Uint8Array): string;
  /**
   * @summary 将gbk格式的文本转化为字符串
   * @param ary 待转化的gbk格式的文本
   * @returns javascript字符串
   */
  bytesToGBKString(ary: ArrayBuffer | Uint8Array): string;
  /**
   * @summary 将字符串转化为GBK格式文本
   * @param str 字符串
   * @returns GBK格式文本
   */
  stringToGBKBytes(str: string): ArrayBuffer;
  /**
   * @summary 将字符串转化为UTF-8格式文本
   * @param str 字符串
   * @returns UTF-8格式文本
   */
  stringToUTFBytes(str: string): ArrayBuffer;
  /**
   * @summary 将UTF-8格式的文本转化为字符串
   * @param ary 待转化的UTF-8格式的文本
   * @returns javascript字符串
   */
  UTFbytesToString(ary: ArrayBuffer | Uint8Array): string;
  /**
   * @summary 将GBK格式的文本转化为字符串
   * @param str 字符串
   * @returns GBK格式文本
   */
  stringToBytes(str: string): number[];
  /**
   * @summary 获取随机的UUID
   * @param format 如果对应位为x，改位将转化为随机的16进制字符， 如果为y，该位将转化为8或b 默认值: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
   * @returns UUID
   */
  getUuid(format?: string): string;
  /**
   * @summary DES加密字符串
   * @param message 待加密的字符串
   * @param key 加密密钥
   * @returns 16进制加密结果
   */
  encryptByDES(message: string, key: string): string;
  /**
   * @summary 获取DES加密固定的加密尾
   * @param key 加密密钥
   * @returns 16进制加密尾
   */
  getDESEncryptAffix(key: string): string;
  /**
   * @summary DES加密16进制字符串
   * @param message 16进制字符串
   * @param key 加密密钥
   * @returns 16进制加密结果
   */
  encryptByDES2(message: string, key: string): string;
  /**
   * @summary DES解密16字符串
   * @param ciphertext 加密16进制字符串
   * @param key 加密密钥
   * @returns 解密结果
   */
  decryptByDES(ciphertext: string, key: string): string;
  /**
   * @summary 异步下载文件
   * @param url 文件url
   * @returns 文件base64
   */
  downloadFileBase64(url: string): Promise<string>;
  /**
   * @summary 将数据保存成文件，并通过浏览器下载
   * @param filename
   * @param data
   * @param type
   */
  SaveFile(filename: string, data: string | Uint8Array | ArrayBufferView | ArrayBuffer, type: 'text/plain' | 'image/png' | 'image/jpeg' | 'application/pdf' | 'application/octet-stream'): void;
  /**
   * @summary 深拷贝对象
   * @param target 目标对象
   * @returns 拷贝后的对象
   */
  deepcopy(target: any): any;
  /**
   * @summary 判断类1是否是类2的子类
   * @param class1 类1
   * @param class2 类2
   */
  isSubClassOf(class1: FunctionConstructor, class2: FunctionConstructor): boolean;
  /**
   * @summary 字符串填充
   * @param str 原始字符串
   * @param len 填充后的最小长度
   * @param fillData 如果第一位为`+`表示从右边开始填充，如果第一位为`-`号表示从左边开始填充，填充的字符为`fillData`的第二位。
   * @note 中文字符将按照GBK编码计算长度
   */
  strFillChar(str: string, len: number, fillData: string): string;
  /**
   * @summary 填充指定字符到字符串开始位置到指定长度
   * @param origStr 原始字符串
   * @param length 长度
   * @param fillData 填充字符
   * @returns 填充后的字符串
   */
  fixStrings(origStr: string, length: number, fillData: string): string;

  /**
   * @summary 获取包含中文字符的字符串的视觉长度
   * @param str 字符串
   * @returns 字符串的长度
   * 
   * - 如果是英文字符长度为1
   * - 如果是中文字符长度为2
   */
  getGBKStrLength(str: string): number;
  /**
   * @summary 获取 html 元素绝对位置和大小
   * @param elem html元素
   */
  getElementRect(elem: HTMLElement): { left: number; top: number; width: number; height: number };
  /**
   * @summary 对字符串内容进行脱敏
   * @param str 字符串
   * @returns 脱敏后的字符串
   */
  namesFormate(str: string): string;
  /**
   * @summary 查找字符串中子字符串出现的位置
   * @param str 查找字符串
   * @param searchString  待查找的字符串
   * @param start 起始位置
   */
  findSubString(str: string, searchString: string, start: number): Array<number>;

  /**
   * @summary 获取指定长度的随机数
   * @param n 长度
   */
  randomn(n: number): string;
  /**
   * @summary 判断两个可JSON序列化的对象是否相等
   * @param json1 对象1
   * @param json2 对象2
   */
  isJsonEqual(json1, json2): boolean;
}

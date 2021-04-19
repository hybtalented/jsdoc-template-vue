interface PrograssInfo<T extends string = string> {
  /**
   * 进度条显示名
   */
  label: string;
  /**
   * 跳到进度条的页面，逗号分隔
   */
  enter: string;
  /**
   * 页面退出时，对应页面前进或后退时的返回值，逗号分隔
   */
  leave?: Record<T, { next?: string; prev?: string }>;
}
/**
 * @summary 登录信息的录入情况
 * @memberof MLogin
 */
interface LoginInfo {
  /**
   * @summary 是否已读取身份证
   */
  idcard: boolean;
  /**
   * @summary 是否已读取市民卡
   */
  smk: false;
  /**
   * @summary 是否已读取活体检测
   */
  htjc_rec: false;
  /**
   * @summary 是否人脸识别
   */
  face_rec: false;
}
/**
 * @summary 保存的用户数据
 * @memberof MLogin
 */
interface BussData {
  /**
   * @summary 业务信息
   */
  url: string;
  /**
   * @summary 业务名称
   */
  name: string;
  /**
   * @summary 用户欢迎文字
   */
  hello_user: string;
  /**
   * @summary 用户身份证或市民卡名字
   */
  user_name: string;
  /**
   * @summary 用户身份证或市民卡号码
   */
  user_code: string;
  /**
   * @summary 用户出生日期
   */
  user_born: string;
  /**
   * @summary 用户民族
   */
  user_national: string;
  /**
   * @summary 用户身份证有效期
   */
  user_valid_period: string;
  /**
   * @summary 用户身份证地址
   */
  user_home: string;
  /**
   * @summary 用户性别
   */
  user_sex: string;
  /**
   * @summary 人脸识别人脸照片 base64
   */
  user_face: string;
  /**
   * @summary 人脸识别完整照片 base64
   */
  user_face_full: string;
  /**
   * @summary 手机号码
   */
  phone: string;
  /**
   * @summary 进度条配置
   */
  prograss_info: Array<PrograssInfo>;
}
/**
 * @summary 终端状态
 * @memberof MLogin
 */
declare enum BussState {
  /**
   * @summary 正在办理业务
   */
  inbussiness = 'inbussiness',
  /**
   * 终端服务中
   */
  inservice = 'inservice',
  /**
   * 机器上电
   */
  powerup = 'powerup',
  /**
   * 机器进入初始化
   */
  uninit = 'uninit',
  /**
   * 业务办理完成
   */
  funsel = 'funsel'
}

/**
 * @summary 用户/终端信息模块保存接口
 */
interface MLogin {
  /**
   * @summary 初始化进度条配置
   * @param options 进度条配置
   */
  initPrograssInfo(options: Array<PrograssInfo>): void;
  /**
   * @summary 清除进度条配置，在业务退出后自动条用
   */
  uninitPrograssInfo(): void;
  /**
   * @summary 进度条跳到对应步骤
   * @param step 步骤对应数字，范围从0-进度条步骤数
   */
  GoToPrograssStep(step: number): void;
  /**
   * @summary 退出页面是调用进度条
   * @param page_name 页面名称
   */
  leavePrograss(page_name: string): void;
  /**
   * @summary 进入页面时调用进度条
   * @param page_name 页面名称
   */
  enterPrograss(page_name): void;
  /**
   * @summary 保存对应登录数据是否已经登入
   * @param obj 对应键值可以传字符串，此时对应字符串将用 replaceDD 转换
   */
  SaveLoadInfo(obj: Partial<LoginInfo>): void;
  /**
   * @summary 保存业务数据
   * @param obj 业务数据，对应键值可以传字符串，此时对应字符串将用 replaceDD 转换
   */
  SaveBussInfo(obj: Partial<BussData>): void;
  /**
   * @summary 保存终端状态
   * @param newState
   */
  SaveBussState(newState: BussState): void;
  /**
   * @summary 显示用户名字
   */
  ShowCustName(): void;
  /**
   * @summary 清除所有登录信息
   */
  ClearLoginIfo(): void;
  /**
   * @summary 判断是否存在用户登录信息
   */
  IsLogin: boolean;
  /**
   * @summary 获取业务数据
   * @param name 数据名称
   */
  BussInfo<T extends keyof BussData>(name: T): BussData[T];
  /**
   * @summary 判断各登录数据是否已经登录
   * @param na 数据名称用 : 和 | 分隔，
   *     -  : 分隔表示与的关系，
   *     -  | 分隔表示或者的关系，
   * 目前支持 idcard(身份证信息),smk（市民卡信息）,face_rec（人脸识别）,lcdb(鹿城代办),idcard|smk(身份证或市民卡)
   * @returns 返回 ok 表示必要信息已录入，返回其他（例如 idcard）表示需要录入相应的信息（例如身份证）
   */
  IsAllLoadNow(na: string): 'ok' | keyof LoginInfo;
  /**
   * 终端状态
   */
  BussState: string;
  /**
   * @summary 将数据转移到Datadic中
   * @param na 数据项名称
   * 如果na 为
   *     face 表示人脸数据，包括p_my_facebase64, t_my_facebase64, p_my_facebase64_bigFace，
   *     bussiness 表示业务相关数据，包括 t_IdCard_Name, t_IdCard_Code, t_IdCard_Born, t_IdCard_Home,
   *   t_IdCard_ValidPeriod, t_IdCard_National, t_IdCard_Sex, t_business_name
   *     auto 将转移  p_my_idcode, p_my_idname, p_my_phone, t_photo_sb_result
   */
  UnDumpData(na: 'face' | 'bussiness' | 'auto'): void;
}

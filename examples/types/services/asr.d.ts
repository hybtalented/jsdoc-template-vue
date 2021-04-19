/**
 * @summary 语音识别类型及参数映射
 */
type RecogizeParamType = {
  do_business: string[];
  QA: {
    catagory: string;
    question: string;
    answer: string;
  };
};
/**
 * @summary 语音识别回调函数
 * @param type 识别类型
 * @param param 参数
 */
declare type RecognizeCallbackType<T extends keyof RecogizeParamType> = (type: T, param: RecogizeParamType[T]) => void;
/**
 * 语音识别服务接口
 */
declare interface AsrService {
  /**
   * @summary 播放语音
   * @param msg 播放文本信息
   */
  Speak(msg: string): void;
  /**
   * @summary 开始语音识别
   */
  StartRecognize(): number;
  /**
   * @summary 停止语音识别
   */
  StopRecognize(): number;
  /**
   * @summary 设置语音识别回调
   * @param callback 语音识别处理函数, 如果为空表示移除语音识别回调函数
   */
  setRecognizeProc<T extends keyof RecogizeParamType>(callback?: RecognizeCallbackType<T>): void;
}

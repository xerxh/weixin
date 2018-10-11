import { config } from '../config.js'

// http请求
class HTTP {
  constructor() {
    // 基础url
    this.baseRestUrl = config.api_blink_url
  }

  //http 请求类
  request(params) {
    var that = this
    // api接口地址
    var url = this.baseRestUrl + params.url;
    // 如果没有指定方法  默认使用GET请求
    if (!params.method) {
      params.method = 'GET';
    }
    // wx提供的ajax请求接口
    wx.request({
      url: url,
      data: params.data,
      method: params.method,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        // 如果请求返回状态为2开头
        if (startChar == '2') {
          // 成功处理方法
          params.success && params.success(res.data);
        } else {
          // 错误码处理方法
          params.error && params.error(res);
        }
      },
      fail: function (err) {
        // 如果有错误处理方法 则执行  没有则不执行
        params.fail && params.fail(err)
      }
    });
  }
};

export { HTTP };
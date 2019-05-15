const config = {
  // 服务器地址
  api_blink_url: 'http://10.0.164.29:7016',

  /**
   * 错误状态码
   * @ successCode ： 成功响应状态码
   * @ systemErrorCode :  系统错误状态码
   * @ internalErrorCode : 内部错误状态码
   * @ userExpiredCode : 用户过期状态码
   */
  error_code: {
    '601': '出现了一个系统错误',
    '602': '出现了一个内部错误',
    '603': '用户已经过期'
  }

}

export { config }
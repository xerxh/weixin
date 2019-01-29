const config = {
  // 服务器地址
  api_blink_url: 'https://csscxcx.hartedu.com/hart/market/api',

  // api_blink_url: 'http://10.0.192.12:8686/hart/market/api',

    /**
     * 错误状态码
     * @ successCode ： 成功响应状态码
     * @ systemErrorCode :  系统错误状态码
     * @ internalErrorCode : 内部错误状态码
     * @ userExpiredCode : 用户过期状态码
     * code : 0：系统错误 1:正常，2:内部错误, 3:用户过期
     */
    error_code: {
      '1001' : '出现了一个系统错误',
      '1002' : '出现了一个内部错误',
      '1003' : '用户已经过期'
    }

}

export { config }
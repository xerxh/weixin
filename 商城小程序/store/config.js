const config = {
  // 服务器地址
  // api_blink_url: 'http://10.0.192.12:8686/',
  api_blink_url: 'https://scxcx.hanyiguoji.com/',

    /**
     * 错误状态码
     * @ successCode ： 成功响应状态码
     * @ systemErrorCode :  系统错误状态码
     * @ internalErrorCode : 内部错误状态码
     * @ userExpiredCode : 用户过期状态码
     * code : 0：系统错误 1:正常，2:内部错误, 3:用户过期
     */
    error_code: {
      '0' : '出现了一个系统错误',
      '2' : '出现了一个内部错误',
      '3' : '用户已经过期'
    }

}

export { config }
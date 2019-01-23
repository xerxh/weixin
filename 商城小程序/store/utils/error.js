import { config } from '../config.js'

//  返回状态统一处理
const codeFun = (
  { data, collbackFuc = {} }
) => {
  return new Promise((resolve, reject) => {
    // 对返回状态进行判断集中处理
    switch (data.code * 1) { // 将数字字符串转化为数字
      // 成功处理
      case config.error_code.successCode:
        successCodeFun(data)
        break
      // 系统错误处理  
      case config.error_code.systemErrorCode:
        systemErrorCodeFun(data.msg)
        break
      // 内部错误处理  
      case config.error_code.internalErrorCode:
        internalErrorCodeFun(data.msg)
        break
      // 用户过期处理  
      case config.error_code.userExpiredCode:
        userExpiredCodeFun(data.msg, loginFunc, getZan)
          .then(res => {
            console.log(res)
            resolve(res)
          })
        break
      default:
        defaultFun(data.msg)
    }
  })
}

export { codeFun };

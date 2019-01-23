import { HTTP } from '../utils/http.js'
class LoginModel extends HTTP {
  constructor() {
    super()
  }

  // 获取登录
  Weixinlogin(codeId,source,version) {
    console.log(this,'登录')
    let params = {
      url: 'api/user/appletThirdpartyLogin',
      data: {
        code:codeId,
        sources: source,
        version: version
        },
      method:'POST'
    }
    return this.request(params)
  }


}

export { LoginModel }
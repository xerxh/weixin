import { HTTP } from '../utils/http.js'
class LoginModel extends HTTP {
  constructor() {
    super()
  }

  // 获取登录
  /**
   * 
   * @ code code码
   * @ sources 来源渠道
   * @ version 版本号
   * @ nickName 用户昵称
   * @ gender 性别
   * @ city 城市
   * @ province 省
   * @ avatarUrl 用户头像
   * @ referrerNo 推荐人id
   * 
   */
  Weixinlogin({code, nickName, gender, city, province, avatarUrl, referrerNo = ""} = {}) {
    console.log(this,'登录')
    let params = {
      url: '/user/appletThirdpartyLogin',
      data: {
        code:code,
        sources: 'Applet',
        version: '1.0',
        nickName,
        gender,
        city,
        province,
        referrerNo,
        avatarUrl
      },
      method:'POST'
    }
    return this.request(params)
  }


}

export { LoginModel }
import { HTTP } from '../utils/http.js'
import { loginUrl } from '../api/userApi.js'
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
  Weixinlogin({ code, nickName, gender, city, province, avatarUrl, parentId } = {}) {
    console.log(code, '登录')
    let params = {
      url: loginUrl,
      data: {
        code: code,
        userName: nickName,
        userSex: gender,
        city,
        province,
        parentId,
        userPicture: avatarUrl
      },
      method: 'POST'
    }
    return this.request(params)
  }


}

export { LoginModel }
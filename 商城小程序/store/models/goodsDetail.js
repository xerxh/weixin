import { HTTP } from '../utils/http.js'
class GoodsDetailModel extends HTTP {
  constructor() {
    super()
  }
  // 获取商品详情
  getGoodsDetail($ID) {
    var params = {
      url: 'hart/api/curriculum/getCurriculumDetail',
      data:{
        curriculumId:$ID
      }
    }
    return this.request(params)

  }
  // 获取商品基本信息
  getGoodsBasicInfo($id) {
    var params = {
      url: 'hart/api/Curriculum/getCurriculumInfo',
      data:{
        curriculumId:$id,
        token: wx.getStorageSync('token')
      }
    }
    return this.request(params)
  }
  // 获取老师列表
  getTeacherInfo($ID) {
    let params = {
      url: 'hart/api/curriculum/getKeTeacherList',
      data:{
        curriculumId: $ID
      }
    }
    return this.request(params)
  }
  // 获取相关推荐
  getRecentGoods() {
    let params = {
      url: 'hart/api/curriculum/getKeRecdKeList',
      data: {
        curriculumId: $ID
      }
    }
    return this.request(params)
  }
  // 获取用户状态
  getUserStatus($token, $parentId, $type) {
    let params = {
      url: 'hart/api/user/isOperation',
      data: {
        token: $token,
        parentId: $parentId,
        type: $type
      },
      method: 'POST'
    }
    return this.request(params)
  }

  // 添加/取消收藏
  getAddCollect($objId,isCollect,$token) {
    let params = {
      url: 'hart/api/collect/addCollect',
      data: {
        parentId: $objId,
        iscollect: isCollect,
        token: $token
      },
      method:'POST'

    }
    return this.request(params)
  }

  // 获取评论列表
  getCommentList($ID) {
    let params = {
      url: 'hart/api/comment/getCommentList',
      data: {
        curriculumId: $ID
      }
    }
    return this.request(params)
  }


  // 获取商品基本信息
  getGoodsPurchaseInfo($id,token){
    let params = {
      url: 'hart/api/purchase/placeorder',
      data: {
        curriculumId: $id,
        token: token
      },
      method:"POST"
    }
    return this.request(params)
  }
}

export { GoodsDetailModel }
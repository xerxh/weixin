import { HTTP } from '../utils/http.js'
import {
  userHasPayUrl,
  collectionUrl,
  collectionClassListUrl
} from '../api/userApi.js'

import {
  addDistributionUrl,
  nextDistributionUrl
} from '../api/distributionApi.js'

import {
  fileUrl
} from '../api/file.js'

class MyModel extends HTTP {
  constructor() {
    super()
  }
  // 查询用户已购买课程列表
  getHasPay() {
    var params = {
      url: userHasPayUrl,
      data: {
        token: wx.getStorageSync('token')
      },
      method: 'post'
    }
    return this.request(params)
  }

  // 用户收藏 / 取消收藏
  getCollectionClass(classId, collectStatus) {
    var params = {
      url: collectionUrl,
      data: {
        classId,
        collectStatus,
        token: wx.getStorageSync('token')
      },
      method: 'post'
    }
    return this.request(params)
  }

  // 获取用户收藏列表
  getCollectionList() {
    var params = {
      url: collectionClassListUrl,
      data: {
        token: wx.getStorageSync('token')
      }
    }
    return this.request(params)
  }

  // 分销申请
  addDistribution(userName, phoneNum, filePath) {
    var params = {
      url: addDistributionUrl,
      data: {
        userName,
        phoneNum,
        filePath,
        token: wx.getStorageSync('token')
      },
      method: 'post'
    }
    return this.request(params)
  }
  // 下级分销列表
  addDistribution(pyramidType) {
    var params = {
      url: nextDistributionUrl,
      data: {
        pyramidType,
        token: wx.getStorageSync('token')
      }
    }
    return this.request(params)
  }

  // 文件上传
  upload(multipartFile) {
    var params = {
      url: fileUrl,
      data: {
        multipartFile
      },
      method: 'post'
    }
    return this.request(params)
  }
}

export { MyModel }
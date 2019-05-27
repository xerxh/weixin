import { HTTP } from '../utils/http.js'
import {
  sonClassTypeListUrl,
  addCommentUrl,
  chapterCommentListUrl,
  addCommentZanUrl
} from '../api/classApi.js'

class MyModel extends HTTP {
  constructor() {
    super()
  }
  // 查询子类型列表
  queryTypesList() {
    var params = {
      url: sonClassTypeListUrl,
      method: 'post'
    }
    return this.request(params)
  }

  // 类别id查询课程列表
  queryClassList(categoryId, condition) {
    var params = {
      url: queryClassListUrl,
      data: {
        categoryId,
        condition
      }
    }
    return this.request(params)
  }

  // 添加章节评论信息
  addComment(chapterId, remarkContent, isAnonym) {
    var params = {
      url: addCommentUrl,
      data: {
        chapterId,
        remarkContent,
        isAnonym,
        token: wx.getStorageSync('token')
      },
      method: 'post'
    }
    return this.request(params)
  }

  // 获取章节评论列表
  chapterCommentList(chapterId) {
    var params = {
      url: chapterCommentListUrl,
      data: {
        chapterId
      }
    }
    return this.request(params)
  }

  // 评论添加点赞信息
  addCommentZan(remarkId, likeType, likeStatus) {
    var params = {
      url: addCommentZanUrl,
      data: {
        remarkId,
        likeType,
        likeStatus,
        token: wx.getStorageSync('token')
      },
      method: 'post'
    }
    return this.request(params)
  }
}

export { MyModel }
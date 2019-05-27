import { HTTP } from '../utils/http'

import {
  queryChapterListUrl,
  chapterDetailUrl
} from '../api/classApi.js'

import {
  collectionUrl
}from '../api/userApi.js'

class musicModel extends HTTP {
    constructor() {
        super()
    }

    // 获取音频列表数据
    getAudioList (curriculumId) {
        let params = {
          url: queryChapterListUrl,
          data: {
              curriculumId,
              // token: wx.getStorageSync('token')
          }
        }
        return this.request(params)
    }
    // 改变音频状态
    switchAudioStatus (curriculumId, videoId, videoStatus, isAudition) {
        let params = {
            url : '/video/disposeVideoStatus',
            data : {
                curriculumId,
                videoId,
                videoStatus,
                isAudition,
                token: wx.getStorageSync('token')
            },
            method: 'post'
        }
        return this.request(params)
    }

    // 获取章节文稿
    getMusicDetail(chapterId) {
      let params = {
        url: chapterDetailUrl,
        data: {
          chapterId
        }
      }
      return this.request(params)
    }

    // 收藏课程
  collectionCourse(classId, collectStatus) {
    let params = {
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

}

export { musicModel }
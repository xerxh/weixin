import { HTTP } from '../utils/http'

class musicModel extends HTTP {
    constructor() {
        super()
    }

    // 获取音频列表数据
    getAudioList (curriculumId) {
        let params = {
            url: '/curriculum/getCurriculumVidoeList',
            data: {
                curriculumId,
                token: wx.getStorageSync('token')
            }
        }
        return this.request(params)
    }
    // 获取音频封面信息
    getAudioCoverInfo (curriculumId) {
        let params = {
            url: '/curriculum/getCurriculumInfo',
            data: {
                curriculumId,
                token: wx.getStorageSync('token')
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

    // 获取音乐简介详情
    getMusicDetail(videoId) {
      let params = {
        url: '/curriculum/getCurriculumVidoeDetail',
        data: {
          videoId
        }
      }
      return this.request(params)
    }

    // 收藏课程
    collectionCourse(parentId, iscollect) {
        let params = {
            url: '/collect/addCollect',
            data: {
                parentId,
                iscollect,
                token: wx.getStorageSync('token')
            },
            method: 'post'
        }
        return this.request(params)
    }
}

export { musicModel }
// pages/musicList/musicListBox/musicListBox.js
import { musicModel } from "../../../models/musicListModel"
const MusicMode = new musicModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    AudioList: {
      type: Array,
      value: []
    },
    // 课程id
    curriculumId: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // musicList :[
    //   {src: 'http://1256108302.vod2.myqcloud.com/0daf5e3bvodgzp1256108302/40c132de5285890784377355388/Qk6RR8YPQ2MA.mp3'},
    //   {src: 'http://1256108302.vod2.myqcloud.com/0daf5e3bvodgzp1256108302/40ad8e165285890784377342933/gNqQaNAKehgA.mp3'},
    //   {src: 'http://1256108302.vod2.myqcloud.com/0daf5e3bvodgzp1256108302/40d357395285890784377365616/JJjxowLeSvEA.mp3'},
    // ],
    nowMusicIndex: -1, // 现在播放的音乐
    previousMusicIndex: -1,
    isPlayList: {},
    isPlay: false,
    isShowFixComponent: false,
    // 是否显示内部列表
    isShowListData: false,
    // 排序标记 1 正序  0 倒序
    sort: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 继续播放
    continuePlay(e) {
      if(this.data.localprogressAllTime) {
        console.log('已经是最后一曲有缓存')
        return
      }
      const nowMusicIndex = e.currentTarget.dataset.index
      let isPlayList = this.data.isPlayList
      isPlayList[nowMusicIndex] = !isPlayList[nowMusicIndex]
      // 更新音频状态
      console.log(this.data.isPlay, '++++++++++')
      this.setData({
        nowMusicIndex,
        isPlayList,
        isPlay: this.data.isPlay ? false : true,
        previousMusicIndex: nowMusicIndex,
        isShowFixComponent: true
      })
      console.log('播放', this.data.isPlay)
    },
    // 播放
    play(nowMusicIndex) {
      let isPlayList = this.data.isPlayList
      if(isPlayList[nowMusicIndex]){
        var isPlay = false
      }else{
        var isPlay = true
        // 将上一个音乐播放的状态重置为不播放状态 
        if(this.data.previousMusicIndex != -1) {
          isPlayList[this.data.previousMusicIndex] = false
        }
      }
      isPlayList[nowMusicIndex] = !isPlayList[nowMusicIndex]
      console.log(nowMusicIndex)
      this.setData({
        nowMusicIndex,
        isPlayList,
        isPlay,
        previousMusicIndex: nowMusicIndex,
        isShowFixComponent: true
      })
      console.log('播放',isPlay)
    },
    // 传递缓存总时间数据  判断是否允许切换
    sendLocalAllTime(e) {
      console.log('缓存数据')
      const localprogressAllTime = e.detail.localprogressAllTime
      this.data.localprogressAllTime = localprogressAllTime
      console.log(localprogressAllTime)
    },
    musicPlay(e) {
      if(this.data.localprogressAllTime) {
        console.log('已经是最后一曲有缓存')
        return
      }
      const nowMusicIndex = e.detail.index
      // 更新音频状态
      console.log(this.data.curriculumId, '课程id')
      const curriculumId = this.data.curriculumId
      console.log(this.data.AudioList[nowMusicIndex], '获取音频id')
      const audioId = this.data.AudioList[nowMusicIndex].videoId
      const isAudition = this.data.AudioList[nowMusicIndex].isAudition
      console.log(isAudition)
      this.upStatus(curriculumId, audioId, 1, isAudition)
        .then(res => {
          // 刷新音频列表
          // console.log()
          this.triggerEvent('getAudioList')
          this.play(nowMusicIndex)
        })
    },
    // 组件内切换播放
    swicthPlay(e) {
      if(this.data.localprogressAllTime) {
        console.log('已经是最后一曲有缓存')
        return
      }
      console.log(e)
      let isPlayList = this.data.isPlayList
      let nowMusicIndex = e.detail.nowMusicMark
      if(this.data.previousMusicIndex != -1) {
        isPlayList[this.data.previousMusicIndex] = false
      }
      console.log(e.detail.isplay)
      isPlayList[nowMusicIndex] = e.detail.isplay
      // 更新音频状态
      const curriculumId = this.data.curriculumId
      console.log(this.data.AudioList[nowMusicIndex], '获取音频id')
      const audioId = this.data.AudioList[nowMusicIndex].videoId
      const isAudition = this.data.AudioList[nowMusicIndex].isAudition
      this.upStatus(curriculumId, audioId, 1, isAudition)
        .then(res => {
          // 刷新音频列表
          // console.log()
          this.triggerEvent('getAudioList',)
            // this.play(nowMusicIndex)
          // 切换状态
          this.setData({
            isPlayList,
            nowMusicIndex,
            isPlay: e.detail.isplay,
            previousMusicIndex: nowMusicIndex,
            isShowFixComponent: !e.detail.close
          })
        })
    },
    // 当播放完成后改变状态回调
    musicOver(e) {
      let nowMusicIndex = e.detail.nowMusicMark
      const videoId = this.data.AudioList[nowMusicIndex].videoId
      const isAudition = this.data.AudioList[nowMusicIndex].isAudition
      const curriculumId = this.data.curriculumId
      // 更新状态
      this.upStatus(curriculumId, videoId, 3, isAudition)
       .then(res => {
         // 刷新音频列表
          console.log('播放完成回调')
          this.triggerEvent('getAudioList')
       })
    },
    // 更新音频状态
    upStatus(curriculumId, videoId, status, isAudition) {
      return MusicMode.switchAudioStatus(curriculumId, videoId, status, isAudition)
    },
    // 列表排序
    sortList() {
      let AudioList = this.data.AudioList
      let Audition = []
      // 取出所有的试听课程
      this.data.AudioList.forEach((element, index) => {
        if(element.isAudition) {
          Audition.push(element)
          AudioList.splice(index, 1)
        }
      });
      // 将其余课程排序 倒序
      AudioList.reverse()
      // 重新将试听课放入
      this.setData({
        AudioList: [...Audition, ...AudioList],
        sort: !this.data.sort
      })
      
    },
    isShowList(e) {
      console.log(e)
      this.setData({
        isShowListData: !this.data.isShowListData
      })
    }
  }
})

// pages/musicList/musicListBox/musicListBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    musicList :[
      {src: 'http://1256108302.vod2.myqcloud.com/0daf5e3bvodgzp1256108302/40c132de5285890784377355388/Qk6RR8YPQ2MA.mp3'},
      {src: 'http://1256108302.vod2.myqcloud.com/0daf5e3bvodgzp1256108302/40ad8e165285890784377342933/gNqQaNAKehgA.mp3'},
      {src: 'http://1256108302.vod2.myqcloud.com/0daf5e3bvodgzp1256108302/40d357395285890784377365616/JJjxowLeSvEA.mp3'},
    ],
    nowMusicIndex: -1, // 现在播放的音乐
    previousMusicIndex: -1,
    isPlayList: {},
    isPlay: false,
    isShowFixComponent: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    continuePlay(e) {
      const nowMusicIndex = e.currentTarget.dataset.index
      let isPlayList = this.data.isPlayList
      isPlayList[nowMusicIndex] = !isPlayList[nowMusicIndex]
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
    musicPlay(e) {
      const nowMusicIndex = e.detail.index
      this.play(nowMusicIndex)
    },
    // 组件内切换播放
    swicthPlay(e) {
      console.log(e)
      let isPlayList = this.data.isPlayList
      let nowMusicIndex = e.detail.nowMusicMark
      if(this.data.previousMusicIndex != -1) {
        isPlayList[this.data.previousMusicIndex] = false
      }
      console.log(e.detail.isplay)
      isPlayList[nowMusicIndex] = e.detail.isplay
      this.setData({
        isPlayList,
        nowMusicIndex,
        isPlay: e.detail.isplay,
        previousMusicIndex: nowMusicIndex,
        isShowFixComponent: !e.detail.close
      })
    }
  }
})

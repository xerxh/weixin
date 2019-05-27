// components/musicplay/musicplay.js
import { 
  formatMusicTime 
} from "../../utils/util"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicList: {
      type: Array,
      value: [],
      observer: function(val) {
        console.log(val, '歌曲列表')
      }
    },
    // 正在播放的音乐的下标
    nowMusicMark: {
      type: Number,
      value: -1,
      observer: function(val) {
        console.log(val, '现在的下标')
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultShow: true,
    innerAudioContext: '', // 音频播放实例
    musicBtn: [
      {src: '../../images/music/jumpLeftTime.png', mark: 'jumpTimeLeft',
        activeSrc: "../../images/music/jumpLeftTime.png"},
      {src: '../../images/music/musicLeft.png', mark: 'musicLeft',
        activeSrc: "../../images/music/musicLeft.png"},
      {src: '../../images/music/musicPlay.png', mark: 'musicPlay', 
        activeSrc: "../../images/music/musicParse.png"},
      {src: '../../images/music/musicRight.png', mark: 'musicRight',
        activeSrc: "../../images/music/musicRight.png"},
      {src: '../../images/music/jumpRightTime.png', mark: 'jumpTimeRight',
        activeSrc: "../../images/music/jumpRightTime.png"}
    ],
    fixedBtnArray: [
      {src: '../../images/music/left.png', mark: 'musicLeft',
        activeSrc: "../../images/music/left.png"},
      {src: '../../images/music/playMusic.png', mark: 'musicPlay', 
        activeSrc: "../../images/music/paruseMusic.png"},
      {src: '../../images/music/right.png', mark: 'musicRight',
        activeSrc: "../../images/music/right.png"}
    ],
    btnArray: [
      {src: '../../images/music/musicList.png', title: '搜索'},
      {src: '../../images/music/article.png', title: '文稿'},
      {src: '../../images/music/collection.png', title: '收藏'},
      // {src: '../../images/music/download.png', title: '下载'},
      {src: '../../images/music/musicShare.png', title: '分享'},
    ],
    // 是否播放音乐
    isPlay: false,
    // 音乐最大时间
    musicAlltime: 0,
    // 音乐播放的进度条百分比
    progressValue: 0,
    // 音乐播放器的总时间
    progressAllTime: 0,
    // 正在播放的音乐的下标
    // nowMusicMark: 1,
    // 音乐播放时间
    musicTime: 0,
  },

  ready() {
    // 为音频播放进行一些初始化设定
    console.log('组件挂载完成')
    const innerAudioContext = wx.createInnerAudioContext()
    // innerAudioContext.autoplay = true
    //监听各个阶段
    innerAudioContext.onCanplay(() => {
      console.log('可以播放');
    });
    innerAudioContext.onPlay(() => {
      console.log('监听到音频开始播放');
    });
    innerAudioContext.onEnded(() => {
      console.log('音频自然播放结束事件');
    });
    innerAudioContext.onStop(() => {
      console.log('音频停止事件');
    });
    innerAudioContext.onError((res) => {
      console.log('监听到音频播放错误')
      console.log(res.errMsg);
      console.log(res.errCode);
    });
    innerAudioContext.onWaiting((res) => {
      console.log('音频加载中事件，当音频因为数据不足，需要停下来加载时会触发')
    });

    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    // 监听播放进度
    innerAudioContext.onTimeUpdate((res) => {
      this.setData({
        progressAllTime: formatMusicTime(innerAudioContext.duration),
        progressValue: formatMusicTime(innerAudioContext.currentTime),
        musicAlltime: innerAudioContext.duration,
        musicTime: innerAudioContext.currentTime
      })
    })
    this.data.innerAudioContext = innerAudioContext
  },
  /**
   * 组件的方法列表
   */
  methods: {
    allShowComponent() {
      console.log('显示整个组件')
      this.setData({
        defaultShow: !this.data.defaultShow
      })
    },
    close() {
      console.log('关闭整个组件')
    },
    sliderchange(e) { // 进度拖拽事件
      console.log(e.detail.value)
      this.data.innerAudioContext.pause()
      this.data.innerAudioContext.seek(e.detail.value)
      this.setData({
        musicTime: e.detail.value,
        progressValue: formatMusicTime(e.detail.value)
      })
      this.data.innerAudioContext.play()
    },
    noShowCompoent() {
      console.log('收起组件')
      this.setData({
        defaultShow: true
      })
    },
    play_music(item) {
      console.log(btnInfo)
      const btnInfo = item.currentTarget.dataset.item
      const index = item.currentTarget.dataset.index
      switch (btnInfo.mark) {
        case 'musicPlay': // 播放按钮
          console.log(this.data.nowMusicMark, '播放')
          this.data.innerAudioContext.src = this.properties.musicList[this.data.nowMusicMark].src
          console.log(this.properties.musicList[this.data.nowMusicMark].src)
          if(this.data.isPlay){
            this.data.innerAudioContext.pause()
          }else{
            this.data.innerAudioContext.play()
          }
          this.setData({
            isPlay: !this.data.isPlay
          })
          break
        case 'jumpTimeLeft': // 向后退15S时间
          this.data
          .innerAudioContext
          .seek(this.data.musicTime - 15)
          break
        case 'jumpTimeRight': // 前进15S时间
          this.data
          .innerAudioContext
          .seek(this.data.musicTime + 15)
          break
        case 'musicRight': // 下一曲
          console.log('下一曲')
          if(!this.properties.musicList[this.data.nowMusicMark + 1]) {
            wx.showToast({
              title: '已经到最后的曲目了',
              icon: 'none'
            })
          }else{
            this.data.innerAudioContext.pause()
            this.data.innerAudioContext.src = this.properties.musicList[this.data.nowMusicMark + 1].src
            this.data.innerAudioContext.play()
            this.setData({
              isPlay: true
            })
            ++this.data.nowMusicMark
          }
          break
        case 'musicLeft': // 上一曲
          if(!this.properties.musicList[this.data.nowMusicMark - 1]) {
            wx.showToast({
              title: '已经到最后的曲目了',
              icon: 'none'
            })
          }else{
            this.data.innerAudioContext.pause()
            this.data.innerAudioContext.src = this.properties.musicList[this.data.nowMusicMark - 1].src
            this.data.innerAudioContext.play()
            this.setData({
              isPlay: true
            })
            --this.data.nowMusicMark
          }
          break  
      }
    }
  }
})

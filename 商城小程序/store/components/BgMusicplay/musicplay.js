// components/musicplay/musicplay.js
import { 
  formatMusicTime 
} from "../../utils/util"
let bgAudio = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicList: {
      type: Array,
      value: []
    },
    isShow: {
      type: Boolean,
      value: true
    },
    // 正在播放的音乐的下标
    nowMusicMark: {
      type: Number,
      value: -1,
      observer:function(val, oldVal) {
        console.log('回调')
        console.log(val, oldVal)
        if(this.data.musicList[val]){
          this.data.innerAudioContext.pause()
          this.data.innerAudioContext.title = '啦啦啦啦'
          this.data.innerAudioContext.src = this.data.musicList[val].src
          setTimeout(() => {
            this.data.innerAudioContext.play()
          }, 200)
        }else{
          wx.showToast({
            title: '没有合适的音频',
            icon: 'none'
          })
        }
        
      }
    },
    // 是否播放音乐
    isSelectPlay: {
      type: Boolean,
      value: false,
      observer: function(val, oldVal) {
        console.log(val, oldVal)
        console.log('切换播放')
        switch (val) {
          case true:
            // this.data.innerAudioContext.pause()
            if(this.data.isStop){
              this.data.innerAudioContext.title = '我是雷神托尔'
              this.data.innerAudioContext.src = this.data.musicList[this.data.nowMusicMark].src
            }
            this.data.innerAudioContext.play()
            this.setData({
              isPlay: true,
              isStop: false
            })
            break;
          case false:
            this.data.innerAudioContext.pause()
            this.setData({
              isPlay: false
            })
            break;
        }
        this.setData({
          isPlay: val
        })
        // console.log(val,'是否播放')
      }
    },
    // 针对关闭的音频进行继续播放
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlay: false,
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
    // 是否正在拖拽进度
    isSlider: false,
    // 是否为停止状态
    isStop: false
  },

  ready() {
    // 为音频播放进行一些初始化设定
    console.log('组件挂载完成')
    const innerAudioContext = bgAudio
    // innerAudioContext.autoplay = true
    //监听各个阶段
    innerAudioContext.onCanplay(() => {
      // console.log('可以播放');
    });
    innerAudioContext.onPlay(() => {
      console.log('监听到音频开始播放');
      // this.setData({
      //   isPlay: true,
      //   isStop: false
      // })
      // // 切换列表的播放视图
      // this.triggerEvent('swicthPlay', {
      //   isplay:true,
      //   nowMusicMark: this.data.nowMusicMark
      // })
    });
    innerAudioContext.onEnded(() => {
      console.log('音频自然播放结束事件');
      // 进行下一音频的自动播放
      this.next_music(this.data.nowMusicMark + 1)
    });
    innerAudioContext.onStop(() => {
      console.log('音频停止事件');
      this.setData({ // 停止时记录状态
        isPlay: false,
        isStop: true,
        isSelectPlay: false
      })
      // 记录是否为停止的状态
      // 切换列表的播放视图
      this.triggerEvent('swicthPlay', {
        // isplay:false,
        close: true,
        nowMusicMark: this.data.nowMusicMark
      })
    });
    innerAudioContext.onPause(() => {
      console.log('暂停播放时间')
      // this.setData({
      //   isPlay: false
      // })
      // // 切换列表的播放视图
      // this.triggerEvent('swicthPlay', {
      //   isplay: false,
      //   nowMusicMark: this.data.nowMusicMark
      // })
    })
    innerAudioContext.onError((res) => {
      console.log('监听到音频播放错误')
      console.log(res.errMsg);
      console.log(res.errCode);
    });
    innerAudioContext.onWaiting((res) => {
      console.log('音频加载中事件，当音频因为数据不足，需要停下来加载时会触发')
    });

    // 监听播放进度
    innerAudioContext.onTimeUpdate((res) => {
      // 如果没有拖拽进行更新  防止和拖拽事件冲突
      if(!this.data.isSlider){
        this.setData({
          progressAllTime: formatMusicTime(innerAudioContext.duration),
          progressValue: formatMusicTime(innerAudioContext.currentTime),
          musicAlltime: innerAudioContext.duration,
          musicTime: innerAudioContext.currentTime
        })
      }
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
    sliderchanging(e) {  // 拖拽过程事件  改变进度条
      console.log('拖拽中', e.detail)
      this.setData({
        isSlider: true,
        progressValue: formatMusicTime(e.detail.value)
      })
    },
    sliderchange(e) { // 进度拖拽完成后事件
      console.log(e.detail.value)
      this.data.innerAudioContext.seek(e.detail.value)
      this.setData({
        musicTime: e.detail.value,
        progressValue: formatMusicTime(e.detail.value),
        isSlider: false
      })
    },
    noShowCompoent() {
      console.log('收起组件')
      this.setData({
        defaultShow: true
      })
    },
    next_music (nextNum) {
      if(!this.properties.musicList[nextNum]) {
        wx.showToast({
          title: '已经到最后的曲目了',
          icon: 'none'
        })
      }else{
        this.triggerEvent('swicthPlay', {
          isplay: true,
          nowMusicMark: nextNum
        })
      }
    },
    play_music(item) {
      console.log(btnInfo)
      const btnInfo = item.currentTarget.dataset.item
      switch (btnInfo.mark) {
        case 'musicPlay': // 播放按钮
          console.log(this.properties.musicList[this.data.nowMusicMark].src)
          this.triggerEvent('swicthPlay', {
            isplay: !this.data.isPlay,
            nowMusicMark: this.data.nowMusicMark
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
          this.next_music(this.data.nowMusicMark + 1) 
          break
        case 'musicLeft': // 上一曲
          this.next_music(this.data.nowMusicMark - 1)
          break  
      }
    }
  }
})

// components/musicplay/musicplay.js
import { 
  formatMusicTime 
} from "../../utils/util"
let bgAudio = wx.getBackgroundAudioManager()
import { musicModel } from "../../models/musicListModel"
const MusicMode = new musicModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicList: {
      type: Array,
      value: []
    },
    picUrl: {
      type: String,
      value: '../../images/logo.png'
    },
    isShow: {
      type: Boolean,
      value: true
    },
    // 正在播放的音乐的下标  进行音频的切换播放
    nowMusicMark: {
      type: Number,
      value: -1,
      observer:function(val, oldVal) {
        console.log('回调')
        console.log(val, oldVal)
        this.data.darag = false
        if(this.data.musicList[val]){
          // 暂停上一曲音频 将下一曲音频的属性设置到播放器
          this.data.innerAudioContext.pause()
          // 清空缓存的音频播放时间数据
          this.data.localprogressAllTime = 0  
          this.data.localSum = 0
          this.triggerEvent('sendLocalAllTime', {
            localprogressAllTime: 0
          })
          this.data.innerAudioContext.title = this.data.musicList[val].videoName
          this.data.innerAudioContext.src = this.data.musicList[val].src
          console.log(this.data.innerAudioContext, '播放---')
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
    // 控制切换暂停和播放状态
    isSelectPlay: {
      type: Boolean,
      value: false,
      observer: function(val, oldVal) {
        console.log(val, oldVal)
        console.log('切换播放')
        switch (val) {
          case true:
              // this.data.innerAudioContext.pause()
              if(this.data.isStop || this.data.darag){
                this.data.innerAudioContext.title = this.data.musicList[this.data.nowMusicMark].videoName
                this.data.innerAudioContext.src = this.data.musicList[this.data.nowMusicMark].src
              }else{
                this.data.innerAudioContext.play()
              }
              console.log('播放开始', this.data.innerAudioContext)
              this.setData({
                isPlay: true,
                isStop: false
              })
            break;
          case false:
            console.log('暂停', new Date())
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
      // {src: '../../images/music/jumpLeftTime.png', mark: 'jumpTimeLeft',
      //   activeSrc: "../../images/music/jumpLeftTime.png"},
      {src: '../../images/music/musicLeft.png', mark: 'musicLeft',
        activeSrc: "../../images/music/musicLeft.png"},
      {src: '../../images/music/musicPlay.png', mark: 'musicPlay', 
        activeSrc: "../../images/music/musicParse.png"},
      {src: '../../images/music/musicRight.png', mark: 'musicRight',
        activeSrc: "../../images/music/musicRight.png"},
      // {src: '../../images/music/jumpRightTime.png', mark: 'jumpTimeRight',
      //   activeSrc: "../../images/music/jumpRightTime.png"}
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
      {src: '../../images/music/musicList.png', title: '列表', mark: 1},
      {src: '../../images/music/article.png', title: '文稿', mark: 2},
      {src: '../../images/music/collection.png', title: '收藏', mark: 3},
      // {src: '../../images/music/download.png', title: '下载'},
      {src: '../../images/music/musicShare.png', title: '分享', mark: 4},
    ],
    // 音乐最大时间
    musicAlltime: 0,
    // 音乐播放的进度条百分比
    progressValue: 0,
    // 音乐播放器的总时间
    progressAllTime: 0,
    // 缓存总时间 当自然结束 却没有下一曲进行播放的时候进行显示
    localprogressAllTime: 0,
    //  缓存标记
    localSum: 0,
    // 正在播放的音乐的下标
    // nowMusicMark: 1,
    // 音乐播放时间
    musicTime: 0,
    // 是否正在拖拽进度
    isSlider: false,
    // 是否为停止状态
    isStop: false,
    // 已经播放到最后了
    isEnd: false,
    // 记录是否是被拖拽状态
    darag: false
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
      if(this.data.darag){
        console.log('跳转')
        this.data.innerAudioContext.seek(this.data.darag)
        this.data.darag = false
      }
      // this.setData({
      //   isPlay: true,
      //   isStop: false
      // })
      // // 切换列表的播放视图
      this.triggerEvent('swicthPlay', {
        isplay:true,
        nowMusicMark: this.data.nowMusicMark
      })
    });
    innerAudioContext.onEnded((e) => {
      console.log('音频自然播放结束事件');
      // 发送请求改变状态
      this.triggerEvent('musicOver',{
        nowMusicMark: this.data.nowMusicMark
      })
      // 进行下一音频的自动播放
      this.next_music(this.data.nowMusicMark + 1, true)
    });
    innerAudioContext.onStop(() => {
      console.log('音频停止事件');
      this.setData({ // 停止时记录状态
        // isPlay: false,
        isStop: true,
        // isSelectPlay: false
      })
      // 记录是否为停止的状态
      // 切换列表的播放视图
      this.triggerEvent('swicthPlay', {
        isplay:false,
        close: true,
        nowMusicMark: this.data.nowMusicMark
      })
    });
    innerAudioContext.onPause(() => {
      console.log('暂停播放时间')
      this.setData({
        isPlay: false
      })
      // 切换列表的播放视图
      this.triggerEvent('swicthPlay', {
        isplay: false,
        nowMusicMark: this.data.nowMusicMark,
      })
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
      console.log(innerAudioContext.duration, '时间')
      // 如果没有拖拽进行更新  防止和拖拽事件冲突
      if(innerAudioContext.duration == 0) return
      if(!this.data.isSlider){
        this.setData({
          progressAllTime: formatMusicTime(innerAudioContext.duration),
          progressValue: formatMusicTime(innerAudioContext.currentTime),
          musicAlltime: innerAudioContext.duration,
          musicTime: innerAudioContext.currentTime,
        })
        console.log(this.data.currentTime, innerAudioContext.duration)
        // 缓存总时间
        if(this.data.localSum == 0) {
          this.setData({
            localprogressAllTime: innerAudioContext.duration
          })
          console.log(innerAudioContext.duration, '缓存时间')
          this.data.localSum += 1
        }
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
    closeBg() {
      console.log('关闭整个组件'),
      this.setData({
        isShow: false
      })
      this.triggerEvent('isShowList', false) 
      this.data.innerAudioContext.pause()
      this.triggerEvent('swicthPlay', {
        isplay: false,
        nowMusicMark: this.data.nowMusicMark,
        close: true
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
      if(this.data.isEnd){
        // this.data.innerAudioContext.title = this.data.musicList[this.data.nowMusicMark].videoName
        // this.data.innerAudioContext.src = this.data.musicList[this.data.nowMusicMark].src
        // this.data.innerAudioContext.play()
        // this.data.innerAudioContext.pause()
        console.log('结束后拖拽')
        this.data.darag = e.detail.value
      }
      this.data.innerAudioContext.seek(e.detail.value)
      this.setData({
        musicTime: e.detail.value,
        progressValue: formatMusicTime(e.detail.value),
        isSlider: false
      })

      if(!this.data.localprogressAllTime) return
      // 将缓存清空
      // this.triggerEvent('sendLocalAllTime', {
      //   localprogressAllTime: 0
      // })
      console.log('音频设置')
      // 重新设置音频 用来回听

      // this.data.innerAudioContext.pause()
    },
    noShowCompoent() {
      console.log('收起组件')
      this.setData({
        defaultShow: true
      })
    },
    next_music (nextNum, onEnded) {
      if(!this.properties.musicList[nextNum]) {
        wx.showToast({
          title: '已经到最后的曲目了',
          icon: 'none'
        })
        // 设置是否最后一曲的标记位
        this.data.isEnd = true
        // onEnded 区分是点击切换还是自然结束的标记
        console.log(onEnded)
        // 如果不是自然结束 不进行时间缓存
        if(!onEnded){
          return
        }
        // 缓存下总时间
        console.log(this.data.localprogressAllTime, '总时间')
        console.log(new Date())
        // 父元素保存作为标记 用来判断
        this.triggerEvent('swicthPlay', {
          isplay: !this.data.isPlay,
          nowMusicMark: this.data.nowMusicMark
        })
        this.triggerEvent('sendLocalAllTime', {
          localprogressAllTime: this.data.localprogressAllTime
        })
        console.log(this.data.musicAlltime, '总时间')
      }else{
        this.triggerEvent('swicthPlay', {
          isplay: true,
          nowMusicMark: nextNum
        })
      }
    },
    play_music(item) {
      const btnInfo = item.currentTarget.dataset.item

      switch (btnInfo.mark) {
        case 'musicPlay': // 播放按钮
          // console.log(this.properties.musicList[this.data.nowMusicMark].src)
          console.log(this.data.isPlay)
          this.triggerEvent('swicthPlay', {
            isplay: !this.data.isPlay,
            nowMusicMark: this.data.nowMusicMark,
            darag: this.data.darag
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
    },

    isShowList(e) {
      switch (e.currentTarget.dataset.mark) {
        case 1:
          this.triggerEvent('isShowList')   
          break;
        case 2: // 文稿
          console.log(this.data.musicList[this.data.nowMusicMark])
          wx.navigateTo({
            // url: `/pages/musicDetail/musicDetail?id=${this.data.musicList[this.data.nowMusicMark].videoId}`
            url: '/pages/classContent/classContent'
          })
        default:
          break;
      }
    }
  }
})

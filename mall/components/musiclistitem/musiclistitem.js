// components/musiclistitem/musiclistitem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    obj: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
    },
    nowMusicIndex: {
      type: Number,
      value: -1
    },
    isPlay: {
      type: Boolean,
      value: false,
      observer:function() {
        console.log('到了')
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playOrparuse: {
      // src: '../../images/music/flexStop.png',
      src: '../../images/music/play.svg',
      paruseSrc: '../../images/music/flexParuse.png'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    playMusic() {
      console.log('触发',this.data.index)
      this.triggerEvent('musicPlay', {
        index:this.data.index
      })
    },
    jumpMusicDetail() {
      console.log('跳转音乐详情')
      wx.navigateTo({
        url: `/pages/musicDetail/musicDetail?id=${this.data.obj.videoId}`
      })
    }
  }
})

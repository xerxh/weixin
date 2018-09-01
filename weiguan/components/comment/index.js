// components/comment/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentLabel:{
      type: Array,
      value : [
        {label:'干货满满',sum:'26'},
        { label: '细节很到位', sum: '12' },
        { label: '干货满满', sum: '' },        
      ]
    },
    scoreSum:{
      type: Array,
      value: new Array(5)
    },
    commentTitle: {
      type: String,
      value : '精彩评论'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  
  },
  created(){
    console.log(this.data.scoreSum)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    sendComment(){
      wx.showModal({
        title: '评论',
        content: '这是一个评论弹窗',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})

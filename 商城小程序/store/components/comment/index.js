// components/comment/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentLabel:{
      type: Array,
      value : []
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
      this.triggerEvent('showComment')
    }
  }
})

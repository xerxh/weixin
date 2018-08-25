// components/son1/index.js
var sendBehaver = require("../../utils/behaver.js")
console.log(sendBehaver)
Component({
  behaviors: [sendBehaver],
  relations:{
    '../parent/parent' : {
      type : 'ancestor'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick () {
      console.log(this._parent('../parent/parent'))
      var parent = this._parent('../parent/parent').getRelationNodes();
      console.log(parent)
      this._sibling('../son2/index').setData({
        likeStr: this._sibling('../son2/index').data.likeStr+"son1"
      })
    }
  },
  test(){

  }
})

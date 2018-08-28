// components/son1/index.js
var sendBehaver = require("../../utils/behaver.js")
console.log(sendBehaver)
Component({
  behaviors: [sendBehaver],
  relations:{
    '../parent/parent' : {
      type : 'parent'
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
      var sibling = this._sibling({url:'../son2/index', parentUrl:'../parent/parent'});
      sibling.setData({
        likeStr: sibling.data.likeStr+"son1"
      })
    }
  },
  test(){

  }
})

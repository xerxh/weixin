// components/son2/index.js
var sendBehaver = require("../../utils/behaver.js")
Component({
  behaviors: [sendBehaver],
  relations:{
    '../parent/parent':{
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
    likeStr:"啦啦,小明,"
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

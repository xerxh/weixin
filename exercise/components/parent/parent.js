// components/parent/parent.js
var sendBehaver = require("../../utils/behaver.js")
Component({
  behaviors: [sendBehaver],
  relations:{
    '../son1/index':{
      type: 'descendant'
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

  }
})

// components/parent/parent.js
var sendBehaver = require("../../utils/behaver.js")
Component({
  behaviors: [sendBehaver],
  relations:{
    '../son1/index':{
      type: 'child'
    },
    '../son2/index':{
      type: 'child'
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
    changeData () {
      let son1 = this._sibling({url:'../son1/index'});
      son1.setData({
        parent: 'parent'
      })
      console.log(this._parent('../son1/index'))
      
    }
  }
})

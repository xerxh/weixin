// components/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗标题
    title : {
      type : String,
      value : '标题'
    },
    // 弹窗内容
    content : {
      type : String,
      value : '弹窗内容'
    },
    // 弹窗取消按钮文字
    cancelText : {
      type : String,
      value : '取消'
    },
    // 弹窗确认按钮文字
    confirmText : {
      type : String,
      value : '确定'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow : true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 隐藏弹框
    hideDialog () {
      this.setData({
        isShow : !this.data.isShow
      })
    },
    // 展示弹框
    showDiaLog () {
      this.setData({
        isShow : !this.data.isShow
      })
    },
    // 触发取消回调
    _cancelEvent () {
      this.triggerEvent("cancelEvent")
    },
    // 触发确定回调
    _confirEvent () {
      this.triggerEvent("confirmEvent")
    }
    
  }
})

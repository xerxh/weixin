// pages/index/footerItem/footerItem.js
import { StoreModel } from '../../../models/storeIndex.js'
let storeModel = new StoreModel()
Component({
  externalClasses: ['my_style'],
  /**
   * 组件的属性列表
   */
  properties: {
    obj: {
      type: Object
    }
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
    jumpOut(guid) {
      if(this.data.obj.mark) { // 跳转到另一个小程序
        if(this.data.obj.mark == -1) return
        console.log('跳转小程序')
        wx.navigateToMiniProgram({
          appId: 'xxxxxxxxxxxxxxxxxx', // 要跳转的小程序的appid
          path: 'page/index/index', // 跳转的目标页面
          extarData: {
            open: 'auth'
          },
          success(res) {
            // 打开成功  
          }
        }) 
      }else{
        wx.navigateTo({
          url: `/pages/musicDetail/musicDetail?guid=${this.data.obj.guid}`
        })
      }
      // console.log('跳转出口')
      // storeModel.jumpOut(1)
      // .then(res => {
      //   console.log('跳转出口')
      // })
    }
  }
})

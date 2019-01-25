// components/userInfo/userInfo.js
const base_img_url = '../../images/my/'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: {
      type: Object,
      value: {},
      observer: function(val) {
        console.log(val)
      }
    },
    isShow: {
      type: Boolean,
      value: false,
      observer: function(val) {
        console.log(val, 'isShow')
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    memerImgMark: {
      3 : {
        src: `${base_img_url}/memerPlus.png`,
        name: '高级会员Plus'
      },
      2 : {
        src: `${base_img_url}/memer.png`,
        name: '普通会员'
      },
      1 : {
        src: `${base_img_url}/memer.png`,
        name: '体验会员'
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpBuy() {
      let userInfo = JSON.stringify(this.data.userInfo)
      wx.navigateTo({
        url: `/pages/buyMember/buyMember?userInfo=${userInfo}`
      })
    }
  }
})

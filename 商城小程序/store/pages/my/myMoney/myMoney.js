// pages/my/myMoney/myMoney.js
import { My } from "../../../models/my"
const my = new My()
const base_img_url = '../../../images/my'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    btnList: [
      {src: `${base_img_url}/getMoney.png`, name: '代言人收益', url: '/pages/plusCanGetMoney/plusCanGetMoney'},
      {src: `${base_img_url}/extractMoney.png`, name: '立即提现', url: '/pages/extractMoney/extractMoney'},
    ],
    // 账户信息
    myAccount: {}
  },

  created() {
    my.getMyAccount()
      .then(res => {
        console.log(res, '获取账号')
        console.log(this)
        this.setData({
          myAccount: res.data.data
        })
      })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jump(e) {
      // 进行账号是否被冻结判断
      if(this.data.myAccount.isValid){
        let myAccount = JSON.stringify(this.data.myAccount)
        wx.navigateTo({
          url: `${e.currentTarget.dataset.jumpurl}?myAccount=${myAccount}`,
        })
      }else{
        wx.showToast({
          title: '您的账户已经被冻结',
          duration: 1000,
          icon: 'none'
        })
      }
    }
  }
})

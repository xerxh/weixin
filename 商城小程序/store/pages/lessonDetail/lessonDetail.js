// pages/lessonDetail/lessonDetail.js
import { GoodsDetailModel } from '../../models/goodsDetail.js'
import { PurchaseModel } from '../../models/purchase.js'
import { config } from '../../config.js'
let goodsDetailModel = new GoodsDetailModel()
let purchaseModel = new PurchaseModel()
let util = require('../../utils/util.js')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginFlag: true,
    booleans: true,
    flag: true,
    showClassInfo: true,
    //课程信息对象
    course: {},

    navTitleName: [
      { name: '详情' },
      { name: '目录' },
      { name: '相关推荐' }
    ],
    // 未授课
    navTitle2: [
      { categoryname: '详情' },
    ],
    timeImg: '../../images/time.svg',
    // 类型 2.文章  1.课程
    type: 1,
    richText: [],
    videoTitle: '',
    discountPrice:'',
    // 购买人数
    virtualPurchases:'',
    // 图片
    picurl:'',
    videoUrl: '',
    videoPic: '',
    isAutoPlay: false,
    isHidden: false, //隐藏评论
    // 清晰度数组
    array: [
      { definition: 10, name: '流畅' },
      { definition: 20, name: '标清' },
      { definition: 30, name: '高清' },
    ],
    selectRange: ['流畅', '标清', '高清'],
    // 选中清晰度位置
    selectDefinition: 0,
    // 当前视频播放时间
    currentTime: 0,
    teacherList: [],
    // 富文本标记
    firstRender: [],
    renderMark: 0,
    playnum: 0,
    id: '',
    // 类型 1.已授  2.未授
    courseType: 1,
    isvideo: 0,
    // type: 1,
    // 文章id  默认为-1
    dataId: -1,
    btnName: [],
    // 订单id
    orderId:'',
    // 是否收藏
    iscollect: 0,
    // 当前选中目录
    selectIndex: 0,
    bottomNav: [],
    commentData: [],
    videoList: [],
    // 相关推荐
    listData: [],
    nowIndex: 0,
    // 是否显示老师列表
    isHiddenTeacher: false,
    // 是否显示订单界面
    isPanelHidden:true,
    curriculumId: '',
    tokens: '',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if(options) {
      this.setData({
        curriculumId: options.curriculumId
      })
    }else {
      wx.showToast({
        title: '页面出错,请刷新',
        icon: 'none',
      })
      return;
    }
    let token, 
    that = this;
    //获取缓存中的token
    this.getGoodsDetail()
  },
  getGoodsDetail:function(){
    // 获取基本信息
    goodsDetailModel.getGoodsBasicInfo(this.data.curriculumId).then(res=>{
      console.log(res,'商品基本信息')
      var data = res.data.data
      this.setData({
        course:data,
        // videoTitle: data.curriculumName,
        // discountPrice: data.discountPrice,
        // virtualPurchases: data.virtualPurchases,
        // picurl: data.picurl
      })
    });
    // 获取详细信息
    goodsDetailModel.getGoodsDetail(this.data.curriculumId).then(res => {
      let classInfo = res.data.data.split('_ueditor_page_break_tag_');
      this.setData({
        richText: classInfo,
        firstRender: [true],
        renderMark: ++this.data.renderMark,
        showClassInfo:false,
        // isHidden:false
      })
      this.renderFuc()
    
    }),
    // 获取老师列表
      goodsDetailModel.getTeacherInfo(this.data.curriculumId).then(res => {
      this.setData({
        teacherList: res.data.data
      })
    });
    // 获取用户状态
    goodsDetailModel.getUserStatus(wx.getStorageSync('token'), this.data.curriculumId,1).then(res => {
      console.log(res.data.data)
      this.setData({
        iscollect:res.data.data
      })
    });
    // 获取评论列表
    goodsDetailModel.getCommentList(this.data.curriculumId).then(res => {
      console.log(res.data.data,'评论列表')
      if(res.data.data.length==0){
        this.setData({
          commentData: res.data.data,
          isHidden:true
        })
      }
      this.setData({
        commentData:res.data.data,
        isHidden: false
      })
      console.log(this.data.commentData)
    });
  },

  // 对富文本渲染进行标记
  renderFuc() {
    if (this.data.renderMark <= this.data.richText.length) {
      setTimeout(() => {
        var arr = this.data.firstRender
        arr[this.data.renderMark] = true
        var _this = this
        this.setData({
          firstRender: arr,
          renderMark: ++this.data.renderMark
        })
        return this.renderFuc()
      }, 100)
    }
  },
  // 收藏
  collectionBtnClicked:function(){
    let id = this.data.curriculumId
    let token = wx.getStorageSync('token')
    let isCollect = this.data.iscollect
    if (token){
      goodsDetailModel.getAddCollect(id, !isCollect,token).then(res => {
        if(res.data.code == 0){
          var iscollect = this.data.iscollect
          this.setData({
            iscollect:!iscollect
          })
          wx.showToast({
            title: '操作成功'
          })
        }else{

          wx.showToast({
            title: '操作失败'
          })
        }
      })
    }else{

    }
  },
  // 购买
  purchaseBtnClicked:function(){
    console.log('购买')
    let that = this;
    var id = this.data.curriculumId;
    if(wx.getStorageSync('token')){
      if(this.data.booleans) {
        this.setData({
          booleans: false
        })
        goodsDetailModel.getGoodsPurchaseInfo(id, wx.getStorageSync('token')).then(res => {
          console.log(res, '这是购买？')
          if (res.data.code == 0) {
            // 显示订单界面
            that.setData({
              isPanelHidden: false,
              orderId: res.data.data.orderId,
              booleans: true
            })
          } else {
            that.reLogin()
          }
        })
      }
    }else{ //没有token
    if(this.data.loginFlag) {
      console.log(this.data.loginFlag)
      this.setData({
        loginFlag: false
      })
      this.reLogin()
    }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  //分享
  onShareAppMessage(res) {
    return util.share()
  },
  hiddenOrderPanel:function(e){
    console.log(e.target.id)
    if (e.target.id == "orderPanel"){
    this.setData({
        isPanelHidden: true
      })
    }
  },
  // 购买
  purchase:function(e){
    if(this.data.flag) {
      console.log(this.data.flag)
      this.setData({
        flag: false
      })
      purchaseModel.purchase(this.data.orderId, wx.getStorageSync('token')).then(res => {
        // console.log(res)
        let info = JSON.parse(res.data.data);
        var that = this
        console.log(info)
        // 调用微信支付
        wx.requestPayment(
          {
            'timeStamp': info.info.timeStamp,
            'nonceStr': info.info.nonceStr,
            'package': info.info.package,
            'signType': 'MD5',
            'paySign': info.info.sign,
            'success': function (res) {
              console.log('----AAAAA------')
              console.log(res)
              wx.showLoading({
                title: '支付中....',
              })
              purchaseModel.purchaseSuccess(info.orderNo).then(res => {
                console.log(res)
                wx.hideLoading()
                wx.showToast({
                  title: '购买成功',
                })
              })
            },
            'fail': function (res) {
              wx.showToast({
                title: '支付失败',
              })
            },
            'complete': function (res) {
              that.setData({
                flag: true,
                isPanelHidden: true
              })
            }
          })
      })
    }else {
      wx.showToast({
        title: '支付准备中···',
        icon: 'loading'
      })
    }
  },
  // 导航切换数据改变
  switchNav: function (event) {
    let nowIndex;
    console.log(event)
    event ? (nowIndex = event.detail) : (nowIndex = 0);
    this.setData({
      nowIndex: nowIndex,
      pageindex: 0,
      dataList: []
    });
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    if(event.detail == 1) {
      this.getCurriculumMenu()
    } else if (event.detail == 2) {
      this.getRecommend()
    }else {
      this.getGoodsDetail()
    }
  },
  //获取课程目录
  getCurriculumMenu: function() {
    let that = this;
    wx.request({
      url: config.api_blink_url + 'hart/api/curriculum/getCurriculumVidoeList',
      method: 'get',
      data: {
        curriculumId: that.data.curriculumId
      },
      success: function(res) {
        console.log(res, '获取课程目录ajax成功')
        if(res.data.code === 0) {
          if(res.data.data.length <= 0) {
            wx:wx.showToast({
              title: '暂无数据',
              icon: 'none',
            })
          }else {
            that.setData({
              videoList: res.data.data
            })
          }
        }
      },
      fail: function(res) {
        console.log(res, '获取课程目录ajax失败')
      }
    })
  },
  //获取相关推荐
  getRecommend: function() {
    let that = this;
    wx.request({
      url: config.api_blink_url + 'hart/api/curriculum/getKeRecdKeList',
      method: 'get',
      data: {
        curriculumId: that.data.curriculumId
      },
      success: function(res) {
        console.log(res, '相关推荐，成功')
        that.setData({
          listData: res.data.data
        })
      },
      fail: function(res) {
        console.log(res, '相关推荐，失败')
      }
    })
  },
  
    //重新登录
  reLogin() {
    console.log(this.data.loginFlag)    
    let that = this;
    wx.showModal({
      title: '登录已过期',
      content: '请重新登录',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '登录中',
          })
          util.loginAction().then(res=>{
            console.log(res)
            wx.hideLoading()
          })
        }
      }
    })
  },
  //相关推荐，点击跳转到详情
  goDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: '../lessonDetail/lessonDetail?curriculumId=' + e.detail.goodsID,
    })
  }
})
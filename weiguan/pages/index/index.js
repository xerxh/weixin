//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    nowIndex: 0,
    bottomIndex: 0,
    bottomNav: [
      { name: '主页', icon: '../../asset/images/nav/home.png', url: "../index/index" },
      { name: '问询', icon: '../../asset/images/nav/advisory.png', url: "../advisory/advisory" },
      { name: '课程', icon: '../../asset/images/nav/course.png', url: "../course/course" },
      { name: '收藏', icon: '../../asset/images/nav/Collection.png', url: "../collection/collection" },
      { name: '我的', icon: '../../asset/images/nav/my.png', url: "../my/my" }
    ],
    listData: [{
      title:'3333 认同值',
      img:"../../asset/images/list.png",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismodtincidunt ut laoreet dolore magna aliquam eratvolutpat.Ut wisi enim ad minim veniam, quisnostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.Duis"
    }],
    img: '../../asset/images/top.png',
    navData : ['杂志', '思考', '流程', '技能']
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShareAppMessage(res){
    console.log(res)
  },
  onLoad: function (options) {

    if(options.nowIndex){
      this.setData({
        nowIndex: options.nowIndex
      });
    };
    // 加载数据前先显示加载状态
    wx.showLoading({
      title: '加载中',
    })
    // 获取数据
    this.getData();
  },
  onShow () {
    app.getUser();
    console.log('主页');
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
      wx.showLoading({
        title: '刷新数据中...',
      })
    // 模拟异步延迟请求数据
    setTimeout(() => {
      this.getData();
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }, 2000);   
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '正在拼命加载中...',
    })
    var data = this.data.listData;
    var p = data;
    // 模拟异步延迟请求数据
    setTimeout(() => {
      this.setData({
        listData: data.concat(p)
      })
      wx.hideLoading();
    },2000);
    console.log('上拉加载中');
  },
  // 获取数据
  getData: function (event){

    // console.log(app.globalData)
    console.log(event)
    let nowIndex;
    event ? (nowIndex=event.detail) : (nowIndex=0);
    this.setData({
      nowIndex:nowIndex
    })
    let title = ['杂志', '思考', '流程', '技能'];
    let i = 0;
    let data = [{
      title: `${title[this.data.nowIndex]} 认同值`,
      img: "../../asset/images/list.png",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismodtincidunt ut laoreet dolore magna aliquam eratvolutpat.Ut wisi enim ad minim veniam, quisnostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.Duis"
    }];
    do{
      var array = data;
      data=data.concat(array);
      i++;
    }while(i<=2)
    this.setData({
      listData:data
    })
    wx.hideLoading();
  },
  navigatoDetail (e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../listDetail/listDetail?id=' + id
    })
  },
  jump() { // 搜索跳转
    wx.navigateTo({
      url: '../../pages/searchPage/index',
    })
  }
})

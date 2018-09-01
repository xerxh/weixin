//logs.js
const util = require('../../utils/util.js')
Page({
  data: {
    listData: [{
      id: 2,
      title: '3333 认同值',
      img: "../../asset/images/list.png",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismodtincidunt ut laoreet dolore magna aliquam eratvolutpat.Ut wisi enim ad minim veniam, quisnostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.Duis"
    }],
    navData : ['已授', '未授'],
    dateShow: false,
    bottomIndex: 0,
    bottomNav: [
      { name: '主页', icon: '../../asset/images/nav/home.png', url: "../index/index" },
      { name: '问询', icon: '../../asset/images/nav/advisory.png', url: "../advisory/advisory" },
      { name: '课程', icon: '../../asset/images/nav/course.png', url: "../course/course" },
      { name: '收藏', icon: '../../asset/images/nav/Collection.png', url: "../collection/collection" },
      { name: '我的', icon: '../../asset/images/nav/my.png', url: "../my/my" }
    ],
    isShow: false
  },
  onLoad: function (options) {
    // console.log('课程')
    // this.setData({
    //   nowIndex: options.nowIndex
    // });
    this.getData();
    this.getDateList(3);
  },
  onShow() {
    console.log('课程')
  },
  // 获取数据
  getData: function (event) {
    let title = ['已授', '未授'];
    console.log(event)
    let i;
    event ? (i=event.detail) : (i=0)
    let index = i;
    let data = [{
      title: `${title[i]} 一个“不正经”的鞋履设计史课程11`,
      img: "../../asset/images/list.png",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismodtincidunt ut laoreet dolore magna aliquam eratvolutpat.Ut wisi enim ad minim veniam, quisnostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.Duis"
    }];
    do {
      var array = data;
      data = data.concat(array);
      i++;
    } while (i <= 2)
    this.setData({
      listData: data,
      dateShow: (index?true:false)
    })
  },
  getDateList(days_count){
    let days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
        days_style.push({
          month: 'current', day: parseInt(Math.random() * 30), color: 'white',background: 'yellow'
        });
    }
    // days_style.push(
    //   { month: 'current', day: 12, color: 'white', background: '#b49eeb' },
    //   { month: 'current', day: 17, color: 'white', background: '#f5a8f0' },
    //   { month: 'current', day: 20, color: 'white', background: '#aad4f5' },
    //   { month: 'current', day: 25, color: 'white', background: '#84e7d0' },
    // ); 
    console.log(days_style)
    this.setData({
      days_style: days_style
    })
  },
  next (event) { //监听日历下月按钮
    console.log(event.detail);
    this.getDateList(4);
  },
  prev (event) { //监听日历上月按钮
    console.log(event.detail);
    this.getDateList(6);
  },
  changeShow () { // 是否显示日历组件
    console.log('显示');
    this.setData({
      isShow:!this.data.isShow
    })
  }
})

//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    navData : ['杂志', '思考', '经验', '技能','课程'],
    nowIndex: 0,
    listData: [{
      title:'3333 认同值',
      img:"../../asset/images/list.png",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismodtincidunt ut laoreet dolore magna aliquam eratvolutpat.Ut wisi enim ad minim veniam, quisnostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.Duis"
    }]
  },
  onLoad: function (options) {
    console.log(options)
    if(options.nowIndex){
        this.setData({
          nowIndex: options.nowIndex
        });
    }
    console.log('收藏')
    // 获取数据
    this.getData();
  },
  onShow () {
    console.log('收藏')
  },
   // 获取数据
   getData: function (event){

    // console.log(app.globalData)
    console.log(event)
    let nowIndex;
    event ? (nowIndex=event.detail) : (nowIndex=0);
    console.log(nowIndex)
    this.setData({
      nowIndex:nowIndex
    })
    let title = ['杂志', '思考', '经验', '技能','课程'];
    let i = 0;
    let data = [{
      title: `${title[this.data.nowIndex]} 认同值fkghdhgjhsdasdsadsdsfsdfsdfdfsdfsdf`,
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
  }
})

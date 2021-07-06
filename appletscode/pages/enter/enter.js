// pages/enter/enter.js
var app = getApp();
var util = require('../utils/time.js');
var md5 = require('../utils/md5.js');

Page({

  data: {
    showModal: true, // 显示modal弹窗
    single: false, // false 只显示一个按钮，如果想显示两个改为true即可
    friroomID:'',//来访者访问的房间号
  },

  onLoad: function (options) {
   var friroomid = app.globalData.friroomID
   this.setData({
     friroomID:'https://www.supremeproger.com/img/people_' +friroomid+ '.jpg', //在整体变量中获取来访者openID
   })
   console.log(this.data.friroomID)
  },
  // modalConfirm:function(event){
  //   if (app.data.client && app.data.client.connected) {
  //     // 开始构造json代码
  //     var info = new Object()
  //     info['8276e1aee751dbbc72cfdf1e9b1f129b'] = '95ee8ace1cde98e7e3f7c8b9ee8e00a3'
  //     info['c050596fd74ef3d2325420a9f6e59da6'] = key_1;
  //     app.data.client.publish('UPDATE', JSON.stringify(info), 0, false);
  // } else {
  //     console.log(
  //         '请先连接服务器'
  //     )
  // }
  // }
})
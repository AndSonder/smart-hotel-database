var app = getApp();
var md5 = require('../../utils/md5.js');
import mqtt from '../../utils/mqtt.js';
const host = 'wxs://www.supremeproger.com/mqtt';
var util = require('../../utils/time.js');

Page({

  /**
   * 页面的初始数据
   */

  data: {
    subTopic_8: '',
    subTopic_10: '',
    lock: '',
    roomid: '',
    openid: '',
    url: '',
    pagestatus: '',
    hiddenName: true,
    refresh_status: true,
    hieddenName: true,
    rooms: [{
      "id": 1,
      "number": 101,
      "people": '0',
      "electric-id": '',
      "roomTemperature": '26',
      "roomHumidity": '43',
    },
    {
      "id": 2,
      "number": 102,
      "people": '0',
      "electric-id": '',
      "roomTemperature": '27',
      "roomHumidity": '39',
    },
    {
      "id": 3,
      "number": 103,
      "people": '0',
      "electric-id": '',
      "roomTemperature": '24',
      "roomHumidity": '41',
    },
    ]
  },
  onLoad: function (optiopns) {

  },
  onShow: function (options) {
    var that = this;    
    wx.showModal({
      title: '授权',
      content: '确认身份',
      showCancel: true,
      cancelText: '拒绝',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#576B95',
      success: function (res) {
        if (res.confirm) {
          wx.login({ //先调用 wx.login() 获取 临时登录凭证code 
            success: res => {
              const code = res.code //获取到用户临时登录凭证code 
              wx.request({ //发送请求
                url: 'https://www.supremeproger.com/login?code=' + code, //携带code
                success: (res) => { //返回node请求到的OpenID与session_key
                  //const openid = res.data.openid;
                  var openid = that.data.openid;
                  console.log(openid)
                  var openid_1 = md5.hex_md5(res.data.openid);
                  that.setData({
                    openid: openid_1,
                  })
                  wx.setStorageSync("openid", openid)
                  // console.log(res)
                  var openID = that.data.openid;
                  //显示页面
                  that.setData({
                    hieddenName: !that.data.hiddenName,
                  })
                  wx.request({
                    url: 'https://www.supremeproger.com/identity',
                    data: {
                      "openID": openID,
                    },
                    header: {
                      'content-type': 'application/json'
                    },
                    success: (res) => {
                      console.log(res)
                      // success
                      if (res.data.data == "") {
                        that.setData({
                          lock: '申请进入',
                          pagestatus: 0,
                          roomInfo: [],
                          hiddenName:false,
                        })
                      } else {
                        switch (res.data.data[0].superUser) {
                          case 1:
                            if (app.data.client && app.data.client.connected) {
                              app.data.client.subscribe('ALL', function (err, granted) {
                                if (!err) {
                                  console.log('订阅ALL主题成功');
                                } else {
                                  console.log('订阅ALL主题失败');
                                }
                              })
                            }
                            that.setData({
                              lock: '门锁开关',
                              pagestatus: 1,
                              hiddenName:false,
                            })
                            break;
                          case 0:
                            that.setData({
                              lock: '申请进入',
                              pagestatus: 0,
                              hiddenName:false,
                            })
                            break;
                        }
                      }
                    },
                    fail: function (err) {
                      console.log('require super fail', err);
                    },
                  })
                  if (that.data.pagestatus == 1) {
                    console.log(app.globalData.num)
                    for (var i = 0; i < 3; i++) {
                      let num = 'rooms['+i+'].people';
                      let roomTemperature = 'rooms['+i+'].roomTemperature';
                      let roomHumidity = 'rooms['+i+'].roomHumidity';
                      var num_ = app.globalData.num;
                      var roomTemperature_ = app.globalData.roomTemperature;
                      var roomHumidity_ = app.globalData.roomHumidity;
                      that.setData({
                        [num]: num_,
                        [roomTemperature]: roomTemperature_,
                        [roomHumidity]: roomHumidity_,
                      })
                     }
                  }
                }
              })
            }
          })
        } else if (res.cancel) {
            wx.showToast({              //拒绝确认身份显示
              title: '您未确认身份，故数据不显示',
              icon: 'none',
          })
            that.setData({
              hiddenName:true,
            })
        }
      },
      fail: function (res) {
        console.log("确认身份失败", res);
      },
    })
  },
  roomLock: function (event) {
    var that = this;
    var key = event.currentTarget.dataset.id;
    console.log(event)
    var key_ = key + 'MANAGERmaninthestreet';
    var key_1 = md5.hex_md5(key_);
    if (that.data.pagestatus == 1) {
      // var info = new Object()
      // info['249d0ec6bbff32572f1dd272bdec0d20'] = '95ee8ace1cde98e7e3f7c8b9ee8e00a3'
      // app.data.client.publish('LOCK', JSON.stringify(info), 1, false);
      wx.showModal({
        title: '',
        content: '是否确定开锁', //避免误触造成的结果
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#576B95',
        success: function (res) {
          console.log(res)
          if (res.confirm) {
            that.setData({
            })
            if (app.data.client && app.data.client.connected) {
              // 开始构造json代码
              var info = new Object()
              info['249d0ec6bbff32572f1dd272bdec0d20'] = '95ee8ace1cde98e7e3f7c8b9ee8e00a3'
              info['c050596fd74ef3d2325420a9f6e59da6'] = key_1;
              console.log(key_1)
              console.log(info)
              app.data.client.publish('UPDATE', JSON.stringify(info), 0, false);
          } else {
              console.log(
                  '请先连接服务器'
              )
          }
          }
        }
      })
    }
    if (that.data.pagestatus == 0) {
     
      var id = event.currentTarget.dataset.id;
      var time = util.formatTime(new Date());
      var roomID = id;
      var subTopic_10_ = 'DEVICE' + roomID + 'FRIEND';
      app.globalData.friroomID = roomID;
      console.log(roomID)
      that.setData({
        roomid: roomID,
      })
      wx.showModal({
        title: '',
        content: '是否确定申请', //避免误触造成的结果
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#576B95',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: 'https://www.supremeproger.com/users',
              data: {
                "roomID": roomID,
                "time": time,
              },
              header: {
                'content-type': 'application/json'
              },
              success: (res) => {
                if (res.data.data == "") {
                  wx.showModal({
                    title: '拒绝访问',
                    content: '时间未到，请等待',
                    showCancel: false,
                    confirmText: '确定',
                    confirmColor: '#576B95',
                    success: function (res) { },
                    fail: function (res) { },
                    complete: function (res) { },
                  })
                } else {
                  var openID = that.data.openid;
                  // wx.getUserInfo({
                  //   success: function (res) {
                  //     app.globalData.nickName = res.userInfo.nickName;
                  //   }
                  // })
                  wx.request({
                    method: "POST",
                    url: 'https://www.supremeproger.com/enterUsers',
                    header: {
                      'content-type': 'application/json'
                    },
                    data: {
                      'wecharID': openID,
                      'roomID': '-' + roomID,
                      "startTime": time,
                      "endTime": time,
                    }
                  })
                  wx.request({
                    method: "POST",
                    url: 'https://www.supremeproger.com/enter',
                    header: {
                      'content-type': 'application/json'
                    },
                    data: {
                      'openid': openID,
                      'roomID': roomID,
                      'time': time,
                    }
                  })
                  if (app.data.client && app.data.client.connected) {
                    app.data.client.subscribe('REUPDATE', function (err, granted) {
                      if (!err) {
                        console.log(
                          '订阅REUPDAT主题成功'
                        )
                        var info = new Object()
                        info['79b360f6b6af80e92e5623c6855433ec'] = roomID;
                        info['5ed24c0c82feed200b23092faeb3e8df'] = openID;
                        info['8705b9962194d2baeca15d5a2a4e2ac1'] = time;
                        info['c050596fd74ef3d2325420a9f6e59da6'] = '0725cf7227b2fad550bca1fbb1448b93';
                        app.data.client.publish('REUPDATE', JSON.stringify(info), 0, false);
                      } else {
                        console.log(
                          '订阅REUPDAT主题失败'
                        )
                      }
                    })
                  }
                }
              }
            })
            // var info = new Object()
            // info['8276e1aee751dbbc72cfdf1e9b1f129b'] = '75d8c22d0e36a84e77122223e387dc8f';
            // info['63f4ef1b9a03b217b43be9ee622982dd'] = openID;
            // // info['67c1f754401986e1867ac6244ea895fe'] = this.data.nickName;
            // app.data.client.publish(that.data.subTopic_10, JSON.stringify(info), 0, false);
          } else if (res.cancel) { }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  // onPullDownRefresh: function(){
  //   var that = this;
  //   for (var i = 0; i < 3; i++) {
  //     let num = 'rooms[' + i + '].people';
  //     let roomTemperature = 'rooms[' + i + '].roomTemperature';
  //     let roomHumidity = 'rooms[' + i + '].roomHumidity';

  //     var num_ = app.globalData.num;
  //     var roomTemperature_ = app.globalData.roomTemperature;
  //     var roomHumidity_ = app.globalData.roomHumidity;
  //     that.setData({
  //       [num]: num_,
  //       [roomTemperature]: roomTemperature_,
  //       [roomHumidity]: roomHumidity_,
  //       refresh_status: false,
  //     })
  //   }
  //   if(!that.data.refresh_status){
  //     wx.stopPullDownRefresh();
  //   }
  // }
})
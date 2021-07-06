// pages/tpl/reservation/reservation.js
var app = getApp();
var nowTime = require('../../utils/time.js');
Page({
  data: {
    cancle_status: true,
    inputShowed: false,
    wecharID: '',
    //topImage: 'https://www.supremeproger.com/utils/img/reservation_backimg.png',
    topImage: '/images/reservation_backimg.png',
    lowerHalf: {
      height:1000,
    },
    bookedTime: [{
      "StartTime": '',
      "EndTime": '',
    }, ],
    peopleNumberList: [
      '单人间',
      '大床双人间',
      '双床双人间',
      '单人床双人间',
      '加大床双人间',
      '三人间',
      '四人间',
      '套房',
    ],
    timeStatus: false,
    //固定房间信息
    rooms: []
  },

  onLoad: function (options) {
    var that = this;
    //加载房间信息
    // for (let i in app.globalData.room_info) {
    //   switch (app.globalData.room_info[i].peopleNumber) {
    //     case 1:
    //       app.globalData.room_info[i].peopleNumber = "1人入住";
    //       break;
    //     case 2:
    //       app.globalData.room_info[i].peopleNumber = "2人入住";
    //       break;
    //     case 3:
    //       app.globalData.room_info[i].peopleNumber = "2人入住";
    //       break;
    //     case 4:
    //       app.globalData.room_info[i].peopleNumber = "4人入住";
    //       break;
    //   }

    // }
    that.setData({
      rooms: app.globalData.room_info,
    })
    //背景页高度填充
    var query = wx.createSelectorQuery(); //创建节点选择器
    //选择id
    query.select('#roomOverallHeight').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      //console.log(res);
      //取高度
      //console.log(res[0].height);
      that.setData({
        lowerHalf:{
          height:res[0].height + 100,
        }
      })
    })
    var time = nowTime.formatTime(new Date()); //获取当前时间
    //验证用户身份
    wx.getStorage({
      key: "verification", //从本地存储中获取加密后的openID
      success: function (res) {
        //验证本地存储中加密的openID是否在预订用户中。
        wx.request({
          url: 'https://www.supremeproger.com/verification_1',
          data: {
            'wecharID': res.data,
          },
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
            console.log(res);
            if (res.data.data != "") {

              var len = res.data.data.length;
              var i = 0;
              while (i < len) {
                if (res.data.data[i].endtime >= time) {
                  var wecharID = res.data.data[0].wecharID
                  app.globalData.wecharID = wecharID;
                  break;
                } else {
                  that.setData({
                    cancle_status: false,
                  })
                }
                i++;
              }
            }
          },
          fail: (res) => {
            console.log(res);
          }
        })
      },
    })
    //判断房间是否可以预订
    // wx.request({
    //   url: 'https://www.supremeproger.com/Check',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: (res) => {
    //     if (res.data.data != "") {
    //       var len = res.data.data.length;
    //       for (let i = 0; i < len; i++) {
    //         let id = res.data.data[i].id - 1;
    //         let roomsID = 'rooms[' + id + '].disabled';
    //         let roomsWord = 'rooms[' + id + '].buttonWord';
    //         this.setData({
    //           [roomsID]: 'true',
    //           [roomsWord]: "暂不开放",
    //         })
    //       }
    //     }
    //   }
    // })
    if (!that.data.cancle_status) {
      wx.request({
        url: 'https://www.supremeproger.com/verification_2',
        data: {
          'wecharID': that.data.wecharID,
        },
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          wx.removeStorage({
            key: 'verification',
            success: function (res) {
              console.log(res.data)
            },
          })
        }
      })
    }
  },

  // onPullDownRefresh: function(){ 
  //       wx.stopPullDownRefresh();
  // },
  showInput: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  search: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //“点我订房”按钮
  fillup: function (event) {
    wx.request({
      url: 'https://www.supremeproger.com/bandTime',
      data: {
        'roomID': event.currentTarget.dataset.id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.data.data != "") {
          var len = res.data.data.length;
          for (var i = 0; i < len; i++) {
            var newarrary = 'bookedTime[' + i + '].StartTime';
            var newarrary_1 = 'bookedTime[' + i + '].EndTime';
            this.setData({
              [newarrary]: res.data.data[i].startTime.slice(0, 4) + '/' + res.data.data[i].startTime.slice(5, 7) + '/' + res.data.data[i].startTime.slice(8, 10) + ' ' + res.data.data[i].startTime.slice(11, 19),
              [newarrary_1]: res.data.data[i].endTime.slice(0, 4) + '/' + res.data.data[i].endTime.slice(5, 7) + '/' + res.data.data[i].endTime.slice(8, 10) + ' ' + res.data.data[i].endTime.slice(11, 19),
            })
          }
          var bookedTime = JSON.stringify(this.data.bookedTime)
          wx.navigateTo({
            url: '/pages/fill/fill?id=' + event.currentTarget.dataset.id + "&bookedTime=" + bookedTime,
          })
        }
      }
    })
  },
})
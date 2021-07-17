// pages/room/room.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookingShow: false,
    roominfShow: false,
    hardwareShow: true,
    leftSwitchContent: '<',
    rightSwitchContent: '>',
    roomList:[],
  },

  onLoad: function (options) {
    var that = this;
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var per_roomsinf_jsonData = {
            resCode: res.code,
            currentTime: stamp,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/room/per_roomsinf/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(per_roomsinf_jsonData),
            success: function (res) {
              console.log('per_roomsinf---', res);
              var per_roomsinf_jsonStr = res.data;
              if (md5.hex_md5('room' + per_roomsinf_jsonStr.stamp + 'liuboge' == per_roomsinf_jsonStr.tableProve)) {
                var per_roomsinf_errorcode = per_roomsinf.errorcode;
                switch (per_roomsinf_errorcode) {
                  case "0":
                      that.setData({
                        roomList: per_roomsinf_jsonStr.datalist
                      })
                    break;
                  case "1":
                    that.setData({
                      bookingShow: true,
                      roominfShow: false,
                      hardwareShow: false,
                    })
                    break;
                  case "2":
                    that.setData({
                      bookingShow: true,
                      roominfShow: false,
                      hardwareShow: false,
                    })
                    break;
                }
              }
            }
          })
        }
      }
    })
  },
  turnRoomList(e) {
    wx.navigateTo({
      url: '/pages/roomlist/roomlist',
    })
  },
  confirmLive(e) {
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var per_orderinf_live_jsonData = {
            resCode: res.code,
            orderId: that.data.orderId,
            expLive: '',
            expAway: '',
            actLive: stamp,
            actAway: '',
            orderStatus: '0',
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/order/orderinf/resident/push',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(per_orderinf_live_jsonData),
            success: function (res) {
              console.log('per_orderinf_live---', res);
              var per_orderinf_live_jsonStr = res.data;
              if (md5.hex_md5('room' + per_orderinf_live_jsonStr.stamp + 'liuboge' == per_orderinf_live_jsonStr.tableProve)) {
                var per_orderinf_live_errorcode = per_orderinf_live.errorcode;
                switch (per_orderinf_live_errorcode) {
                  case "0":
                    wx.showToast({
                      title: '欢迎入住',
                      icon: 'success',
                    })
                    break;
                }
              }
            }
          })
        }
      }
    })
  }
})
// pages/room/room.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookingShow: true,
    roominfShow: false,
    hardwareShow: false,
    leftSwitchContent: '<',
    rightSwitchContent: '>',
  },

  onLoad: function (options) {

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
          var orderinfPush_jsonData = {
            resCode: res.code,
            orderId: that.data.orderId,
            expLive: that.data.startTimeContent + ':00',
            expAway: that.data.endTimeContent + ':00',
            actLive: '',
            actAway: '',
            orderStatus: '3',
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/order/orderinf/resident/push',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(orderinfPush_jsonData),
            success: function (res) {
              console.log('orderinfPush---', res);
              var orderinfPush_jsonStr = res.data;
              if (md5.hex_md5('room' + orderinfPush_jsonStr.stamp + 'liuboge' == orderinfPush_jsonStr.tableProve)) {
                var orderinfPush_errorcode = orderinfPush.errorcode;
                switch (orderinfPush_errorcode) {
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
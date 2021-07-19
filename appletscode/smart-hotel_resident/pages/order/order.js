const util = require('../../utils/util.js');
const md5 = require('../../utils/md5.js');
const app = getApp()

Page({
  data: {
    userShow: false,
    orderList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var identity_jsonData = {
            resCode: res.code,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/system/identity/user/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(identity_jsonData),
            success: function (res) {
              console.log('identity---', res);
              var identity_jsonStr = res.data;
              if (md5.hex_md5('user' + identity_jsonStr.stamp + 'liuboge' == identity_jsonStr.tableProve)) {
                var identity_errcode = identity_jsonStr.errcode;
                switch (identity_errcode) {
                  case 0:
                    if (identity_jsonStr.datalist[0].identity == 5) {
                      that.setData({
                        userShow: true,
                      })
                    }
                    break;
                }
              }
            }
          })
        }
      }
    })
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var ordersinf_jsonData = {
            resCode: res.code,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/order/ordersinf/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(ordersinf_jsonData),
            success: function (res) {
              console.log('ordersinf---', res);
              var ordersinf_jsonStr = res.data;
              if (md5.hex_md5('user' + ordersinf_jsonStr.stamp + 'liuboge' == ordersinf_jsonStr.tableProve)) {}
              var ordersinf_errcode = ordersinf_jsonStr.errcode;
              switch (ordersinf_errcode) {
                case 0:
                  var orderList = that.filterData('tag', ordersinf_jsonStr.datalist)
                  console.log("orderList---", orderList)
                  that.setData({
                    orderList: orderList
                  })
                  break;
              }
            }
          })
        }
      }
    })
  },
  onPullDownRefresh: function () {
    var that = this
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var identity_jsonData = {
            resCode: res.code,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/system/identity/user/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(identity_jsonData),
            success: function (res) {
              console.log('identity---', res);
              var identity_jsonStr = res.data;
              if (md5.hex_md5('user' + identity_jsonStr.stamp + 'liuboge' == identity_jsonStr.tableProve)) {
                var identity_errcode = identity_jsonStr.errcode;
                switch (identity_errcode) {
                  case 0:
                    if (identity_jsonStr.datalist[0].identity == 5) {
                      console.log("ad")
                      that.setData({
                        userShow: true,
                      })
                    }
                    break;
                }
              }
            }
          })
        }
      }
    })
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var ordersinf_jsonData = {
            resCode: res.code,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/order/ordersinf/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(ordersinf_jsonData),
            success: function (res) {
              console.log('ordersinf---', res);
              var ordersinf_jsonStr = res.data;
              if (md5.hex_md5('user' + ordersinf_jsonStr.stamp + 'liuboge' == ordersinf_jsonStr.tableProve)) {}
              var ordersinf_errcode = ordersinf_jsonStr.errcode;
              switch (ordersinf_errcode) {
                case 0:
                  var orderList = that.filterData('tag', ordersinf_jsonStr.datalist)
                  console.log("orderList---", orderList)
                  that.setData({
                    orderList: orderList
                  })
                  break;
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
  turnOrderInf(e) {
    wx.navigateTo({
      url: '/pages/orderInf/orderInf?orderId=' + e.currentTarget.dataset.orderid + "&roomId=" + e.currentTarget.dataset.roomid + "&orderStatus=" + e.currentTarget.dataset.orderstatus,
    })
  },
  //订单数组分组
  filterData(key, arr) {
    arr.forEach((item) => {
      item.tag = item.orderTime.slice(2, 10)
      item.orderTime = item.orderTime.slice(11, 16)
      switch (item.orderStatus) {
        case 0:
          item.orderUI = "green"
          break;
        case 1:
          item.orderUI = "red"
          break;
        case 2:
          item.orderUI = "grey"
          break;
        case 3:
          item.orderUI = "blue"
          break;
      }
    })
    let map = {},
      dest = [];
    for (var i = 0; i < arr.length; i++) {
      var ai = arr[i];
      if (!map[ai[key]]) {

        dest.push({
          [key]: ai[key],
          data: [ai]
        });
        map[ai[key]] = ai;
      } else {
        for (var j = 0; j < dest.length; j++) {
          var dj = dest[j];
          if (dj[key] == ai[key]) {
            dj.data.push(ai);
            break;
          }
        }
      }
    }
    return dest
  },

  IntordersInf(arr) {
    arr.forEach((item) => {
      item.orderId = Number(item.orderId)
      item.roomId = Number(item.roomId)
      item.orderStatus = Number(item.orderStatus)
    })
    return arr
  },
})
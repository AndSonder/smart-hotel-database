const util = require('../../utils/util.js');
const dataTime = require('../../utils/dataTime.js');
const md5 = require('../../utils/md5.js');
const app = getApp()
Page({
  data: {
    roomId:'',
    orderId:'',
    per_roominf:'',
    amountsPayList:'',
    amountsPayContent:'',
    amountsPayTotalContent:'',
  },
  onLoad: function (options) {
    that.setData({
      roomId: options.roomId,
      orderId: options.orderId,
    })
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var per_roominf_jsonData = {
            resCode: res.code,
            roomId: that.data.roomId,
            roomType: '',
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/room/per_roominf/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(per_roominf_jsonData),
            success: function (res) {
              console.log('per_roominf---', res);
              var per_roominf_jsonStr = res.data;
              if (md5.hex_md5('room' + per_roominf_jsonStr.stamp + 'liuboge' == per_roominf_jsonStr.tableProve)) {
                var per_roominf_errorcode = per_roominf_jsonStr.errorcode;
                switch (per_roominf_errorcode) {
                  case "0":
                    var per_roominf = that.IntroomInf(per_roominf_jsonStr.datelist)
                    var per_roominf = that.ChangeWindow(per_roominf, 'roomWindow')
                    that.setData({
                      per_roominf: per_roominf,
                    })
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
          var amountsPay_jsonData = {
            resCode: res.code,
            orderId: that.data.orderId,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/order/orderinf_amountsPay/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(amountsPay_jsonData),
            success: function (res) {
              console.log('amountsPay---', res);
              var amountsPay_jsonStr = res.data;
              if (md5.hex_md5('room' + amountsPay_jsonStr.stamp + 'liuboge' == amountsPay_jsonStr.tableProve)) {
                var amountsPay_errorcode = amountsPay_jsonStr.errorcode;
                switch (amountsPay_errorcode) {
                  case "0":
                    var amountsPayList = that.ChangeWindow(amountsPay_jsonStr.datelist, 'roomWindow')
                    that.setData({
                      amountsPayList: amountsPayList,
                      amountsPayContent:Nunmber(amountsPayList.amountsPay),
                      amountsPayTotalContent:Nunmber(amountsPayList.amountsPay + '00'),
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
  onSubmit(e){
    wx.showModal({
      title: '提示',
      content: '确定退房并支付吗',
      confirmColor: '#13c2c2',
      success(res) {
        var stamp = util.formatTime(new Date());
        wx.login({
          success(res) {
            if (res.code) {
              var orderinfGiveUp_jsonData = {
                resCode: res.code,
                orderId: that.data.orderId,
                expLive: '',
                expAway: '',
                actLive: '',
                actAway: stamp,
                orderStatus: 1,
                stamp: stamp,
                prove: md5.hex_md5(res.code + stamp + 'liuboge'),
              };
              wx.request({
                method: 'POST',
                url: 'https://www.supremeproger.com/order/orderinf/resident/push',
                header: {
                  'content-type': 'application/json'
                },
                data: JSON.stringify(orderinfGiveUp_jsonData),
                success: function (res) {
                  console.log('orderinfGiveUp---', res);
                  var orderinfGiveUp_jsonStr = res.data;
                  if (md5.hex_md5('room' + orderinfGiveUp_jsonStr.stamp + 'liuboge' == orderinfGiveUp_jsonStr.tableProve)) {
                    var orderinfGiveUp_errorcode = orderinfGiveUp.errorcode;
                    switch (orderinfGiveUp_errorcode) {
                      case 0:
                        wx.showToast({
                          title: '退订成功',
                          icon: 'success',
                        })
                        break;
                      case 1:
                        wx.showToast({
                          title: '退订失败',
                          icon: 'error',
                        })
                        break;
                      case 2:
                        wx.showToast({
                          title: '退订失败',
                          icon: 'error',
                        })
                        break;
                      case "3":
                        wx.showToast({
                          title: '退订失败',
                          icon: 'error',
                        })
                        break;
                      case "4":
                        wx.showToast({
                          title: '退订失败',
                          icon: 'error',
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
  },
  IntroomInf(arr){
    arr.forEach((item) => {
      item.roomId = Nunmber(item.roomId)
      item.roomArea = Nunmber(item.roomArea)
      item.maximum = Nunmber(item.maximum)
      item.roomWindow = Nunmber(item.roomWindow)
      item.roomPrice = Nunmber(item.roomPrice)
      item.roomTemp = Nunmber(item.roomTemp)
      item.roomHum = Nunmber(item.roomHum)
    })
    return arr
  },
  ChangeWindow(arr, name) {
    arr.forEach((item) => {
      if (item[`${name}`] === 1) {
        item.roomWindow = '有窗'
      } else {
        item.roomWindow = '无窗'
      }
    })
    return arr
  },
})
const util = require('../../utils/util.js');
const dataTime = require('../../utils/dataTime.js');
const md5 = require('../../utils/md5.js');
const imgUrl = require('../../utils/image.js');
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
    var that = this
    that.setData({
      roomId: options.roomId,
      orderId: options.orderId,
    })
    console.log(options)
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
              if (md5.hex_md5('user' + per_roominf_jsonStr.stamp + 'liuboge' == per_roominf_jsonStr.tableProve)) {
                var per_roominf_errcode = per_roominf_jsonStr.errcode;
                switch (per_roominf_errcode) {
                  case 0:
                    var per_roominf = that.IntroomInf(per_roominf_jsonStr.datalist)
                    var per_roominf = that.ChangeWindow(per_roominf, 'roomWindow')
                    var per_roominf = imgUrl.ImageNameGeneration(per_roominf)
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
              if (md5.hex_md5('user' + amountsPay_jsonStr.stamp + 'liuboge' == amountsPay_jsonStr.tableProve)) {
                var amountsPay_errcode = amountsPay_jsonStr.errcode;
                switch (amountsPay_errcode) {
                  case 0:
                    that.setData({
                      amountsPayList: amountsPay_jsonStr.datalist,
                      amountsPayContent:Number(amountsPay_jsonStr.datalist[0].amountsPay),
                      amountsPayTotalContent:Number(amountsPay_jsonStr.datalist[0].amountsPay + '00'),
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
                expLive: false,
                expAway: false,
                actLive: false,
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
                  if (md5.hex_md5('user' + orderinfGiveUp_jsonStr.stamp + 'liuboge' == orderinfGiveUp_jsonStr.tableProve)) {
                    var orderinfGiveUp_errcode = orderinfGiveUp.errcode;
                    switch (orderinfGiveUp_errcode) {
                      case 0:
                        wx.showToast({
                          title: '退房成功',
                          icon: 'success',
                        })
                        break;
                      case 1:
                        wx.showToast({
                          title: '退房失败',
                          icon: 'error',
                        })
                        break;
                      case 2:
                        wx.showToast({
                          title: '退房失败',
                          icon: 'error',
                        })
                        break;
                      case "3":
                        wx.showToast({
                          title: '退房失败',
                          icon: 'error',
                        })
                        break;
                      case "4":
                        wx.showToast({
                          title: '退房失败',
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
      item.roomId = Number(item.roomId)
      item.roomArea = Number(item.roomArea)
      item.maximum = Number(item.maximum)
      item.roomWindow = Number(item.roomWindow)
      item.roomPrice = Number(item.roomPrice)
      item.roomTemp = Number(item.roomTemp)
      item.roomHum = Number(item.roomHum)
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
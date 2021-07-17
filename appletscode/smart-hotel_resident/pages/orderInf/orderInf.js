const util = require('../../utils/util.js');
const dataTime = require('../../utils/dataTime.js');
const md5 = require('../../utils/md5.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId:'',
    orderId:'',
    orderInf:[],
    time: '2020-01-01 08:09',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      roomId:options.roomId,
      orderId:options.orderId,
    })
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var orderinf_jsonData = {
            resCode: res.code,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/order/orderinf/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(orderinf_jsonData),
            success: function (res) {
              console.log('orderinf---', res);
              var orderinf_jsonStr = res.data;
              if (md5.hex_md5('room' + orderinf_jsonStr.stamp + 'liuboge' == orderinf_jsonStr.tableProve)) {
                var orderinf_errorcode = orderinf_jsonStr.errorcode;
                switch (orderinf_errorcode) {
                  case "0":
                    var orderInf = that.ChangeWindow(orderinf_jsonStr.datelist, 'roomWindow')
                    that.setData({
                      orderInf: orderInf,
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
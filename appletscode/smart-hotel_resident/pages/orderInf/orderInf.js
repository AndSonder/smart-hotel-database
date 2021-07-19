const util = require('../../utils/util.js');
const dataTime = require('../../utils/dataTime.js');
const md5 = require('../../utils/md5.js');
const imgUrl = require('../../utils/image.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId: '',
    orderId: '',
    orderStatus: '',
    per_roominf: [],
    perinfo: [],
    orderinf: [],
    startTimeContent: '',
    endTimeContent: '',
    startTimeShow: false,
    endTimeShow: false,
    start_minDate: new Date(1990, 1, 1).getTime(),
    start_maxDate: new Date(2099, 12, 31).getTime(),
    start_currentDate: new Date().getTime(),
    end_minDate: new Date(1990, 1, 1).getTime(),
    end_maxDate: new Date(2099, 12, 31).getTime(),
    end_currentDate: new Date().getTime(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      roomId: options.roomId,
      orderId: options.orderId,
      orderStatus: options.orderStatus,
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
          var perinfo_jsonData = {
            resCode: res.code,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/user/perinfo/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(perinfo_jsonData),
            success: function (res) {
              console.log('perinfo---', res);
              var perinfo_jsonStr = res.data;
              if (md5.hex_md5('user' + perinfo_jsonStr.stamp + 'liuboge' == perinfo_jsonStr.tableProve)) {
                var perinfo_errcode = perinfo_jsonStr.errcode;
                switch (perinfo_errcode) {
                  case 0:
                    that.setData({
                      perinfo: perinfo_jsonStr.datalist,
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
          var orderinf_jsonData = {
            resCode: res.code,
            orderId: that.data.orderId,
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
              if (md5.hex_md5('user' + orderinf_jsonStr.stamp + 'liuboge' == orderinf_jsonStr.tableProve)) {
                var orderinf_errcode = orderinf_jsonStr.errcode;
                switch (orderinf_errcode) {
                  case 0:
                    that.setData({
                      orderinf: orderinf_jsonStr.datalist,
                      startTimeContent: orderinf_jsonStr.datalist[0].expLive.slice(0, 16),
                      endTimeContent: orderinf_jsonStr.datalist[0].expAway.slice(0, 16),
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
          var time_limit_jsonData = {
            resCode: res.code,
            orderId: that.data.orderId,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/system/time_limit/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(time_limit_jsonData),
            success: function (res) {
              console.log('time_limit---', res);
              var time_limit_jsonStr = res.data;
              if (md5.hex_md5('user' + time_limit_jsonStr.stamp + 'liuboge' == time_limit_jsonStr.tableProve)) {
                var time_limit_errcode = time_limit_jsonStr.errcode;
                switch (time_limit_errcode) {
                  case 0:
                    var startTime = time_limit_jsonStr.datalist[0].startTime
                    var endTime = time_limit_jsonStr.datalist[1].endTime
                    that.setData({
                      start_minDate: new Date(Number(startTime.slice(0, 4)), Number(startTime.slice(5, 7))-1, Number(startTime.slice(8, 10))).getTime(),
                      start_maxDate: new Date(Number(endTime.slice(0, 4)), Number(endTime.slice(5, 7))-1, Number(endTime.slice(8, 10))).getTime(),
                      end_minDate: new Date(Number(startTime.slice(0, 4)), Number(startTime.slice(5, 7))-1, Number(startTime.slice(8, 10))).getTime(),
                      end_maxDate: new Date(Number(endTime.slice(0, 4)), Number(endTime.slice(5, 7))-1, Number(endTime.slice(8, 10))).getTime(),
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
  choose_startTime(e) {
    this.setData({
      startTimeShow: true
    });
  },
  choose_endTime(e) {
    this.setData({
      endTimeShow: true
    });
  },
  onClose() {
    this.setData({
      startTimeShow: false,
      endTimeShow: false,
    });
  },
  onCancel(e) {
    this.setData({
      startTimeShow: false,
      endTimeShow: false,
    });
  },
  startTime_onConfirm(e) {
    this.setData({
      startTimeShow: false,
      startTimeContent: dataTime.msToDate(e.detail).hasTime,
    })
  },
  endTime_onConfirm(e) {
    this.setData({
      endTimeShow: false,
      endTimeContent: dataTime.msToDate(e.detail).hasTime,
    })
  },
  changeTime(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定修改吗',
      confirmColor: '#13c2c2',
      success(res) {
        var stamp = util.formatTime(new Date());
        wx.login({
          success(res) {
            if (res.code) {
              var orderinfPush_jsonData = {
                resCode: res.code,
                orderId: that.data.orderId,
                expLive: that.data.startTimeContent + ':00',
                expAway: that.data.endTimeContent + ':00',
                actLive: false,
                actAway: false,
                orderStatus: 3,
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
                  if (md5.hex_md5('user' + orderinfPush_jsonStr.stamp + 'liuboge' == orderinfPush_jsonStr.tableProve)) {
                    var orderinfPush_errcode = orderinfPush_jsonStr.errcode;
                    switch (orderinfPush_errcode) {
                      case 0:
                        wx.showToast({
                          title: '修改成功',
                          icon: 'success',
                        })
                        break;
                      case 1:
                        wx.showToast({
                          title: '修改失败',
                          icon: 'error',
                        })
                        break;
                      case 2:
                        wx.showToast({
                          title: '修改失败',
                          icon: 'error',
                        })
                        break;
                      case 3:
                        wx.showToast({
                          title: '修改失败',
                          icon: 'error',
                        })
                        break;
                      case 4:
                        wx.showToast({
                          title: '修改失败',
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
  Unsubscribe(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定退单吗',
      confirmColor: '#13c2c2',
      success(res) {
        var stamp = util.formatTime(new Date());
        wx.login({
          success(res) {
            if (res.code) {
              var orderinfGiveUp_jsonData = {
                resCode: res.code,
                orderId: that.data.orderId,
                expLive: that.data.startTimeContent + ':00',
                expAway: that.data.endTimeContent + ':00',
                actLive: false,
                actAway: false,
                orderStatus: 2,
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
                    var orderinfGiveUp_errcode = orderinfGiveUp_jsonStr.errcode;
                    switch (orderinfGiveUp_errcode) {
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
  IntuserInf(arr){
    arr.forEach((item) => {
      item.sex = Number(item.sex)
      item.phone = Number(item.phone)
    })
    return arr
  },
  ChangeWindow(arr, name) {
    arr.forEach((item) => {
      if (item[`${name}`] === '1') {
        item.roomWindow = '有窗'
      } else {
        item.roomWindow = '无窗'
      }
    })
    return arr
  },
})
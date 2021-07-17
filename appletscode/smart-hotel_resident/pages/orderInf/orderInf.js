const util = require('../../utils/util.js');
const dataTime = require('../../utils/dataTime.js');
const md5 = require('../../utils/md5.js');
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
                    var per_roominf = that.ChangeWindow(per_roominf_jsonStr.datelist, 'roomWindow')
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
              if (md5.hex_md5('room' + perinfo_jsonStr.stamp + 'liuboge' == perinfo_jsonStr.tableProve)) {
                var perinfo_errorcode = perinfo_jsonStr.errorcode;
                switch (perinfo_errorcode) {
                  case "0":
                    that.setData({
                      perinfo: perinfo,
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
              if (md5.hex_md5('room' + orderinf_jsonStr.stamp + 'liuboge' == orderinf_jsonStr.tableProve)) {
                var orderinf_errorcode = orderinf_jsonStr.errorcode;
                switch (orderinf_errorcode) {
                  case "0":
                    that.setData({
                      orderinf: orderinf_jsonStr.datelist,
                      startTimeContent: orderinf_jsonStr.datelist[0].actLive.slice(0, 16),
                      endTimeContent: orderinf_jsonStr.datelist[0].actAway.slice(0, 16),
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
              if (md5.hex_md5('room' + time_limit_jsonStr.stamp + 'liuboge' == time_limit_jsonStr.tableProve)) {
                var time_limit_errorcode = time_limit_jsonStr.errorcode;
                switch (time_limit_errorcode) {
                  case "0":
                    var startTime = time_limit_jsonStr.datelist[0].startTime
                    var endTime = time_limit_jsonStr.datelist[0].endTime
                    that.setData({
                      start_minDate: new Date(Number(startTime.slice(0, 4)), Number(startTime.slice(5, 7)), Number(startTime.slice(8, 10))).getTime(),
                      start_maxDate: new Date(Number(endTime.slice(0, 4)), Number(endTime.slice(5, 7)), Number(endTime.slice(8, 10))).getTime(),
                      end_minDate: new Date(Number(startTime.slice(0, 4)), Number(startTime.slice(5, 7)), Number(startTime.slice(8, 10))).getTime(),
                      end_maxDate: new Date(Number(endTime.slice(0, 4)), Number(endTime.slice(5, 7)), Number(endTime.slice(8, 10))).getTime(),
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
    wx.showModal({
      title: '提示',
      content: '确定修改吗',
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
                          title: '修改成功',
                          icon: 'success',
                        })
                        break;
                      case "1":
                        wx.showToast({
                          title: '修改失败',
                          icon: 'error',
                        })
                        break;
                      case "2":
                        wx.showToast({
                          title: '修改失败',
                          icon: 'error',
                        })
                        break;
                      case "3":
                        wx.showToast({
                          title: '修改失败',
                          icon: 'error',
                        })
                        break;
                      case "4":
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
    wx.showModal({
      title: '提示',
      content: '确定退单吗',
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
                actLive: '',
                actAway: '',
                orderStatus: '2',
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
                      case "0":
                        wx.showToast({
                          title: '退订成功',
                          icon: 'success',
                        })
                        break;
                      case "1":
                        wx.showToast({
                          title: '退订失败',
                          icon: 'error',
                        })
                        break;
                      case "2":
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
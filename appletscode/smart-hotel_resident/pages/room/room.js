const util = require('../../utils/util.js');
const dataTime = require('../../utils/dataTime.js');
const md5 = require('../../utils/md5.js');
const app = getApp()
var ind = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookingShow: false,
    roominfShow: false,
    hardwareShow: false,
    leftSwitchContent: '<',
    rightSwitchContent: '>',
    roomsList: [],
    roomList: [],
    airList: [],
    lightList: [],
    roomListLength: '',
    swipeLeftUI: 'cu-btn icon bg-white shadow',
    swipeRightUI: 'cu-btn icon bg-white shadow',
    swipeleftButton: false,
    swipeRightButton: false,
    roomId: '',
    orderId: '',
    currentDate: '08:00',
    minHour: 0,
    maxHour: 23,
    timeShow: false,
    timeContent: '',
  },

  onLoad: function (options) {
    var that = this;
    that.setData({
      swipeLeftUI: 'cu-btn icon line-blue shadow round',
      swipeLeftButton: true
    })
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
          console.log("per_roomsinf_jsonData---", per_roomsinf_jsonData)
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
              if (md5.hex_md5('user' + per_roomsinf_jsonStr.stamp + 'liuboge' == per_roomsinf_jsonStr.tableProve)) {
                var per_roomsinf_errcode = per_roomsinf_jsonStr.errcode;
                switch (per_roomsinf_errcode) {
                  case 0:
                    // var roomsList = that.IntroomsInf(per_roomsinf_jsonStr.datalist)
                    that.setData({
                      roomsList: per_roomsinf_jsonStr.datalist,
                      roomList: that.data.roomList.concat(per_roomsinf_jsonStr.datalist[0]),
                      roomListLength: per_roomsinf_jsonStr.datalist.length,
                      roomId: per_roomsinf_jsonStr.datalist[0].roomId,
                      orderId: per_roomsinf_jsonStr.datalist[0].orderId,
                    })
                    that.chooseRoom(per_roomsinf_jsonStr.datalist[0].orderStatus)
                    break;
                  case 1:
                    that.setData({
                      bookingShow: true,
                      roominfShow: false,
                      hardwareShow: false,
                    })
                    break;
                  case 2:
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
  chooseRoom(e){
    var that = this;
    switch (e) {
      case 0:
        that.setData({
          bookingShow: false,
          roominfShow: false,
          hardwareShow: true,
        })
        var stamp = util.formatTime(new Date());
        wx.login({
          success(res) {
            if (res.code) {
              var air_jsonData = {
                resCode: res.code,
                roomId: that.data.roomId,
                stamp: stamp,
                prove: md5.hex_md5(res.code + stamp + 'liuboge'),
              };
              wx.request({
                method: 'POST',
                url: 'https://www.supremeproger.com/hardware/air_condition/resident/get',
                header: {
                  'content-type': 'application/json'
                },
                data: JSON.stringify(air_jsonData),
                success: function (res) {
                  console.log('air---', res);
                  var air_jsonStr = res.data;
                  if (md5.hex_md5('user' + air_jsonStr.stamp + 'liuboge' == air_jsonStr.tableProve)) {
                    var air_errcode = air_jsonStr.errcode;
                    switch (air_errcode) {
                      case 0:
                        // var airList = that.IntairInf(air_jsonStr.datalist)
                        var airList = that.ChangeAir(air_jsonStr.datalist, 'airStatus', 'airMode')
                        that.setData({
                          airList: airList
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
              var light_jsonData = {
                resCode: res.code,
                roomId: that.data.roomId,
                stamp: stamp,
                prove: md5.hex_md5(res.code + stamp + 'liuboge'),
              };
              wx.request({
                method: 'POST',
                url: 'https://www.supremeproger.com/hardware/light/resident/get',
                header: {
                  'content-type': 'application/json'
                },
                data: JSON.stringify(light_jsonData),
                success: function (res) {
                  console.log('light---', res);
                  var light_jsonStr = res.data;
                  if (md5.hex_md5('user' + light_jsonStr.stamp + 'liuboge' == light_jsonStr.tableProve)) {
                    var light_errcode = light_jsonStr.errcode;
                    switch (light_errcode) {
                      case 0:
                        // var lightList = that.IntlightInf(light_jsonStr.datalist)
                        var lightList = that.ChangeLight(light_jsonStr.datalist, 'lightStatus', 'lightMode')
                        that.setData({
                          lightList: lightList
                        })
                        break;
                    }
                  }
                }
              })
            }
          }
        })
        break;
      case 3:
        that.setData({
          bookingShow: false,
          roominfShow: true,
          hardwareShow: false,
        })
        break;
    }
  },
  turnRoomList(e) {
    wx.navigateTo({
      url: '/pages/roomlist/roomlist',
    })
  },
  confirmLive(e) {
    var orderId = e.currentTarget.dataset.orderid
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var per_orderinf_live_jsonData = {
            resCode: res.code,
            orderId: orderId,
            expLive: false,
            expAway: false,
            actLive: stamp,
            actAway: false,
            orderStatus: 0,
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
              if (md5.hex_md5('user' + per_orderinf_live_jsonStr.stamp + 'liuboge' == per_orderinf_live_jsonStr.tableProve)) {
                var per_orderinf_live_errcode = per_orderinf_live_jsonStr.errcode;
                switch (per_orderinf_live_errcode) {
                  case 0:
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
  },
  swipeLeft(e) {
    console.log(ind)
    var that = this;
    var roomId = e.currentTarget.dataset.roomId
      that.setData({
        swipeRightUI: 'cu-btn icon bg-white shadow round',
        swipeRightButton: false
      })
      if ((ind-1) >= 0) {
        ind--
        var room = 'roomList['+ 0 +']'
        that.setData({
          [room]: that.data.roomsList[ind]
        })
      if (that.data.roomsList[ind].orderStatus == 0) {
        that.setData({
          bookingShow: false,
          roominfShow: false,
          hardwareShow: true,
        })
        var stamp = util.formatTime(new Date());
        wx.login({
          success(res) {
            if (res.code) {
              var air_jsonData = {
                resCode: res.code,
                roomId: roomId,
                stamp: stamp,
                prove: md5.hex_md5(res.code + stamp + 'liuboge'),
              };
              wx.request({
                method: 'POST',
                url: 'https://www.supremeproger.com/hardware/air_condition/resident/get',
                header: {
                  'content-type': 'application/json'
                },
                data: JSON.stringify(air_jsonData),
                success: function (res) {
                  console.log('air---', res);
                  var air_jsonStr = res.data;
                  if (md5.hex_md5('user' + air_jsonStr.stamp + 'liuboge' == air_jsonStr.tableProve)) {
                    var air_errcode = air_jsonStr.errcode;
                    switch (air_errcode) {
                      case 0:
                        // var airList = that.IntairInf(air_jsonStr.datalist)
                        var airList = that.ChangeAir(air_jsonStr.datalist, 'airStatus', 'airMode')
                        that.setData({
                          airList: airList
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
              var light_jsonData = {
                resCode: res.code,
                roomId: roomId,
                stamp: stamp,
                prove: md5.hex_md5(res.code + stamp + 'liuboge'),
              };
              wx.request({
                method: 'POST',
                url: 'https://www.supremeproger.com/hardware/light/resident/get',
                header: {
                  'content-type': 'application/json'
                },
                data: JSON.stringify(light_jsonData),
                success: function (res) {
                  console.log('light---', res);
                  var light_jsonStr = res.data;
                  if (md5.hex_md5('user' + light_jsonStr.stamp + 'liuboge' == light_jsonStr.tableProve)) {
                    var light_errcode = light_jsonStr.errcode;
                    switch (light_errcode) {
                      case 0:
                        // var lightList = that.IntlightInf(light_jsonStr.datalist)
                        var lightList = that.ChangeLight(light_jsonStr.datalist, 'lightStatus', 'lightMode')
                        that.setData({
                          lightList: lightList
                        })
                        break;
                    }
                  }
                }
              })
            }
          }
        })
      } else if (that.data.roomsList[ind].orderStatus == 3) {
        that.setData({
          bookingShow: false,
          roominfShow: true,
          hardwareShow: false,
        })
    }
    }
    if (ind == 0) {
      that.setData({
        swipeLeftUI: 'cu-btn icon line-blue shadow round',
        swipeLeftButton: true
      })
    }
  },
  swipeRight(e) {
    console.log(ind)
    var that = this;
    var roomId = e.currentTarget.dataset.roomId
    that.setData({
      swipeLeftUI: 'cu-btn icon bg-white shadow round',
      swipeLeftButton: false
    })
    if ((ind+1) != (that.data.roomListLength)) {
      ind++
      var room = 'roomList['+ 0 +']'
      that.setData({
        [room]: that.data.roomsList[ind]
      })
      if (that.data.roomsList[ind].orderStatus == 0) {
        that.setData({
          bookingShow: false,
          roominfShow: false,
          hardwareShow: true,
        })
        var stamp = util.formatTime(new Date());
        wx.login({
          success(res) {
            if (res.code) {
              var air_jsonData = {
                resCode: res.code,
                roomId: roomId,
                stamp: stamp,
                prove: md5.hex_md5(res.code + stamp + 'liuboge'),
              };
              wx.request({
                method: 'POST',
                url: 'https://www.supremeproger.com/hardware/air_condition/resident/get',
                header: {
                  'content-type': 'application/json'
                },
                data: JSON.stringify(air_jsonData),
                success: function (res) {
                  console.log('air---', res);
                  var air_jsonStr = res.data;
                  if (md5.hex_md5('user' + air_jsonStr.stamp + 'liuboge' == air_jsonStr.tableProve)) {
                    var air_errcode = air_jsonStr.errcode;
                    switch (air_errcode) {
                      case 0:
                        // var airList = that.IntairInf(air_jsonStr.datalist)
                        var airList = that.ChangeAir(air_jsonStr.datalist, 'airStatus', 'airMode')
                        that.setData({
                          airList: airList
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
              var light_jsonData = {
                resCode: res.code,
                roomId: roomId,
                stamp: stamp,
                prove: md5.hex_md5(res.code + stamp + 'liuboge'),
              };
              wx.request({
                method: 'POST',
                url: 'https://www.supremeproger.com/hardware/light/resident/get',
                header: {
                  'content-type': 'application/json'
                },
                data: JSON.stringify(light_jsonData),
                success: function (res) {
                  console.log('light---', res);
                  var light_jsonStr = res.data;
                  if (md5.hex_md5('user' + light_jsonStr.stamp + 'liuboge' == light_jsonStr.tableProve)) {
                    var light_errcode = light_jsonStr.errcode;
                    switch (light_errcode) {
                      case 0:
                        var lightList = that.ChangeLight(light_jsonStrr.datalist, 'airStatus', 'airMode')
                        that.setData({
                          lightList: lightList
                        })
                        break;
                    }
                  }
                }
              })
            }
          }
        })
      } else if (that.data.roomsList[ind].orderStatus == 3) {
        that.setData({
          bookingShow: false,
          roominfShow: true,
          hardwareShow: false,
        })
      }
    }
    if (ind == (that.data.roomListLength - 1)) {
      that.setData({
        swipeRightUI: 'cu-btn icon line-blue shadow round',
        swipeRightButton: true,
      })
    }
  },
  openDoor(e) {
    var that = this;
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var lock_jsonData = {
            resCode: res.code,
            roomId: that.data.roomId,
            lockStatus: 0,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/hardware/lock/user/push',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(lock_jsonData),
            success: function (res) {
              console.log('lock---', res);
              var lock_jsonStr = res.data;
              if (md5.hex_md5('user' + lock_jsonStr.stamp + 'liuboge' == lock_jsonStr.tableProve)) {
                var lock_errcode = lock_jsonStr.errcode;
                switch (lock_errcode) {
                  case 0:
                    wx.showToast({
                      title: '门锁已开',
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
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var lockRecord_jsonData = {
            resCode: res.code,
            roomId: that.data.roomId,
            openTime: stamp,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/record/unlock/user/post',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(lockRecord_jsonData),
            success: function (res) {
              console.log('lockRecord---', res);
              var lockRecord_jsonStr = res.data;
              if (md5.hex_md5('user' + lockRecord_jsonStr.stamp + 'liuboge' == lockRecord_jsonStr.tableProve)) {
                var lockRecord_errcode = lockRecord_jsonStr.errcode;
                switch (lockRecord_errcode) {
                  case 0:
                    break;
                }
              }
            }
          })
        }
      }
    })
  },
  controlAir(e) {
    var that = this
    var airList = that.ReturnAir(that.data.airList, 'airStatus', 'airMode')
    var airList = JSON.stringify(airList)
    wx.navigateTo({
      url: '/pages/airCondition/airCondition?roomId=' + that.data.roomId + '&airList=' + airList,
    })
  },
  controlLight(e) {
    var lightList = this.ReturnLight(this.data.lightList, 'lightStatus', 'lightMode')
    var lightList = JSON.stringify(lightList)
    wx.navigateTo({
      url: '/pages/light/light?roomId=' + this.data.roomId + '&lightList=' + lightList
    })
  },
  wakeServer(e) {
    this.setData({
      timeShow: true
    });
  },
  cleanServer(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定呼叫保洁吗？',
      confirmColor: '#13c2c2',
      success(res) {
        if (res.confirm) {
          console.log('住户确定呼叫保洁')
          var stamp = util.formatTime(new Date());
          wx.login({
            success(res) {
              if (res.code) {
                var clean_jsonData = {
                  resCode: res.code,
                  roomId: that.data.roomId,
                  stamp: stamp,
                  prove: md5.hex_md5(res.code + stamp + 'liuboge'),
                };
                wx.request({
                  method: 'POST',
                  url: 'https://www.supremeproger.com/server/call_cleaning/resident/post',
                  header: {
                    'content-type': 'application/json'
                  },
                  data: JSON.stringify(clean_jsonData),
                  success: function (res) {
                    console.log('clean---', res);
                    var clean_jsonStr = res.data;
                    if (md5.hex_md5('user' + clean_jsonStr.stamp + 'liuboge' == clean_jsonStr.tableProve)) {
                      var clean_errcode = clean_jsonStr.errcode;
                      switch (clean_errcode) {
                        case 0:
                          wx.showToast({
                            title: '成功呼叫',
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
        } else if (res.cancel) {
          console.log('住户取消呼叫保洁')
        }
      }
    })
  },
  time_onConfirm(e) {
    var that = this
    that.setData({
      timeShow: false,
      timeContent: dataTime.msToDate(e.detail).justTime,
    })
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var wake_jsonData = {
            resCode: res.code,
            roomId: that.data.roomId,
            wakeTime: that.data.timeContent,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/server/wake/resident/post',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(wake_jsonData),
            success: function (res) {
              console.log('wake---', res);
              var wake_jsonStr = res.data;
              if (md5.hex_md5('user' + wake_jsonStr.stamp + 'liuboge' == wake_jsonStr.tableProve)) {
                var wake_errcode = wake_jsonStr.errcode;
                switch (wake_errcode) {
                  case 0:
                    wx.showToast({
                      title: '服务预订成功',
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
  },
  onCancel(e) {
    this.setData({
      timeShow: false,
    })
  },
  checkoutServer(e) {
    wx.navigateTo({
      url: '/pages/checkOut/checkOut?roomId=' + this.data.roomId + '&orderId=' + this.data.orderId,
    })
  },
  urgencyServer(e) {
    wx.makePhoneCall({
      phoneNumber: '18178346924'
    })
  },
  feedbackServer(e) {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  },
  ChangeAir(arr, status, mode) {
    arr.forEach((item) => {
      if (item[`${status}`] == 1) {
        item.airStatus = '已开启'
      } else {
        item.airStatus = '已关闭'
      }
      switch (item[`${mode}`]) {
        case 0:
          item.airmMode = '吹风'
          break;
        case 1:
          item.airMode = '制热'
          break;
        case 2:
          item.airMode = '制冷'
          break;
      }
    })
    return arr
  },
  ChangeLight(arr, status, mode) {
    arr.forEach((item) => {
      if (item[`${status}`] == 1) {
        item.lightStatus = '已开启'
      } else {
        item.lightStatus = '已关闭'
      }
      switch (item[`${mode}`]) {
        case 0:
          item.lightMode = '标准'
          break;
        case 1:
          item.lightMode = '夜间'
          break;
        case 2:
          item.lightMode = '睡眠'
          break;
        case 3:
          item.lightMode = '起夜'
          break;
        case 4:
          item.lightMode = '影院'
          break;
      }
    })
    return arr
  },
  ReturnAir(arr, status, mode) {
    arr.forEach((item) => {
      if (item[`${status}`] == '已开启') {
        item.airStatus = 1
      } else {
        item.airStatus = 0
      }
      switch (item[`${mode}`]) {
        case '吹风':
          item.airmMode = 0
          break;
        case '制热':
          item.airMode = 1
          break;
        case '制冷':
          item.airMode = 2
          break;
      }
    })
    return arr
  },
  ReturnLight(arr, status, mode) {
    arr.forEach((item) => {
      if (item[`${status}`] == '已开启') {
        item.lightStatus = 1
      } else {
        item.lightStatus = 0
      }
      switch (item[`${mode}`]) {
        case '标准':
          item.lightMode = 0
          break;
        case '夜间':
          item.lightMode = 1
          break;
        case '睡眠':
          item.lightMode = 2
          break;
        case '起夜':
          item.lightMode = 3
          break;
        case '影院':
          item.lightMode = 4
          break;
      }
    })
    return arr
  },
  IntroomsInf(arr) {
    arr.forEach((item) => {
      item.orderId = Number(item.orderId)
      item.roomId = Number(item.roomId)
      item.lockStatus = Number(item.lockStatus)
      item.orderStatus = Number(item.orderStatus)
      item.roomTemp = Number(item.roomTemp)
      item.roomHum = Number(item.roomHum)
    })
    return arr
  },
  IntairInf(arr) {
    arr.forEach((item) => {
      item.airStatus = Number(item.airStatus)
      item.airMode = Number(item.airMode)
      item.airValue = Number(item.airValue)
    })
    return arr
  },
  IntlightInf(arr) {
    arr.forEach((item) => {
      item.lightStatus = Number(item.lightStatus)
      item.lightMode = Number(item.lightMode)
      item.lightValue = Number(item.lightValue)
    })
    return arr
  },
})
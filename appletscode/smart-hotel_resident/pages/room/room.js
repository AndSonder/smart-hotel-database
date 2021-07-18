const util = require('../../utils/util.js');
const dataTime = require('../../utils/dataTime.js');
const md5 = require('../../utils/md5.js');
const app = getApp()
const index = 0
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
    roomsList: [],
    roomList: [],
    airList: [],
    lightList: [],
    roomListLength: '',
    swipeLeftUI: '',
    swipeRightUI: '',
    roomId: '',
    orderId: '',
    currentDate: '08:00',
    minHour: 0,
    maxHour: 23,
    timeShow:false,
    timeContent:'',
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
                var per_roomsinf_errorcode = per_roomsinf_jsonStr.errorcode;
                var roomsList = IntroomsInf(per_roomsinf_jsonStr.datalist)
                switch (per_roomsinf_errorcode) {
                  case "0":
                    that.setData({
                      roomsList: roomsList,
                      roomList: that.data.roomList.push(roomsList[0]),
                      roomListLength: roomsList.length,
                      roomId: roomsList[0].roomId,
                      orderId: roomsList[0].orderId,
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
    var orderId = e.currentTarget.dataset.orderId
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var per_orderinf_live_jsonData = {
            resCode: res.code,
            orderId: orderId,
            expLive: '',
            expAway: '',
            actLive: stamp,
            actAway: '',
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
              if (md5.hex_md5('room' + per_orderinf_live_jsonStr.stamp + 'liuboge' == per_orderinf_live_jsonStr.tableProve)) {
                var per_orderinf_live_errorcode = per_orderinf_live_jsonStr.errorcode;
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
  },
  swipeLeft(e) {
    if (index != 0) {
      var that = this;
      var roomId = e.currentTarget.dataset.roomId
      that.setData({
        roomList: that.data.roomsList[index + 1]
      })
      if (that.data.roomList.orderStatus == '0') {
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
                  if (md5.hex_md5('room' + air_jsonStr.stamp + 'liuboge' == air_jsonStr.tableProve)) {
                    var air_errorcode = air_jsonStr.errorcode;
                    switch (air_errorcode) {
                      case "0":
                        var airList = that.IntairInf(air_jsonStr.datalist)
                        var airList = that.ChangeAir(airList,'airStatus','airMode')
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
                  if (md5.hex_md5('room' + light_jsonStr.stamp + 'liuboge' == light_jsonStr.tableProve)) {
                    var light_errorcode = light_jsonStr.errorcode;
                    switch (light_errorcode) {
                      case "0":
                        var lightList = that.IntlightInf(light_jsonStr.datalist)
                        var lightList = that.ChangeAir(light_jsonStr.datalist,'lightStatus','lightMode')
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
      }
    }
    if (index == 0) {
      that.setData({
        swipeLeftUI: 'cu-btn icon bg-white shadow block',
      })
    }
  },
  swipeRight(e) {
    if (index != (this.data.roomListLength - 1)) {
      var that = this;
      var roomId = e.currentTarget.dataset.roomId
      that.setData({
        roomList: that.data.roomsList[index - 1]
      })
      if (that.data.roomList.orderStatus == '0') {
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
                  if (md5.hex_md5('room' + air_jsonStr.stamp + 'liuboge' == air_jsonStr.tableProve)) {
                    var air_errorcode = air_jsonStr.errorcode;
                    switch (air_errorcode) {
                      case "0":
                        var airList = that.IntairInf(air_jsonStr.datalist)
                        var airList = that.ChangeAir(airList,'airStatus','airMode')
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
                  if (md5.hex_md5('room' + light_jsonStr.stamp + 'liuboge' == light_jsonStr.tableProve)) {
                    var light_errorcode = light_jsonStr.errorcode;
                    switch (light_errorcode) {
                      case "0":
                        var lightList = that.IntlightInf(light_jsonStr.datalist)
                        var lightList = that.ChangeAir(light_jsonStr.datalist,'lightStatus','lightMode')
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
      }
    }
    if (index == (roomListLength - 1)) {
      that.setData({
        swipeRightUI: 'cu-btn icon bg-white shadow block',
      })
    }
  },
  openDoor(e){
    var that =this;
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var lock_jsonData = {
            cerCode: res.code,
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
              if (md5.hex_md5('room' + lock_jsonStr.stamp + 'liuboge' == lock_jsonStr.tableProve)) {
                var lock_errorcode = lock_jsonStr.errorcode;
                switch (lock_errorcode) {
                  case "0":
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
            cerCode: res.code,
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
              if (md5.hex_md5('room' + lockRecord_jsonStr.stamp + 'liuboge' == lockRecord_jsonStr.tableProve)) {
                var lockRecord_errorcode = lockRecord_jsonStr.errorcode;
                switch (lockRecord_errorcode) {
                  case "0":
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
  },
  controlAir(e){
    var airList = ReturnAir(this.data.airList)
    var airList = JSON.stringify(airList)
    wx.navigateTo({
      url: '/pages/airCondition/airCondition?roomId=' + this.data.roomId + '&airList=' + airList,
    })
  },
  controlLight(e){
    var lightList = this.ReturnLight(this.data.lightList)
    var lightList = JSON.stringify(lightList)
    wx.navigateTo({
      url: '/pages/light/light?roomId=' + this.data.roomId + '&lightList=' + lightList
    })
  },
  wakeServer(e){
    this.setData({
      timeShow: true
    });
  },
  cleanServer(e){
    wx.showModal({
      title: '提示',
      content: '确定呼叫保洁吗？',
      confirmColor: '#13c2c2',
      success (res) {
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
              if (md5.hex_md5('room' + clean_jsonStr.stamp + 'liuboge' == clean_jsonStr.tableProve)) {
                var clean_errorcode = clean_jsonStr.errorcode;
                switch (clean_errorcode) {
                  case "0":
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
  time_onConfirm(e){
    this.setData({ 
      timeShow: false, 
      timeContent: dataTime.msToDate(e.detail).justTime,
    })
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var wake_jsonData = {
            resCode: res.code,
            roomId: roomId,
            wakeTime: that.data.timeContent,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.comserver/wake/resident/post',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(wake_jsonData),
            success: function (res) {
              console.log('wake---', res);
              var wake_jsonStr = res.data;
              if (md5.hex_md5('room' + wake_jsonStr.stamp + 'liuboge' == wake_jsonStr.tableProve)) {
                var wake_errorcode = wake_jsonStr.errorcode;
                switch (wake_errorcode) {
                  case "0":
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
  onCancel(e){
    this.setData({ 
      timeShow: false, 
    })
  },
  checkoutServer(e){
    wx.navigateTo({
      url: '/pages/checkOut/checkOut?roomId=' + this.data.roomId + '&orderId=' + this.data.orderId,
    })
  },
  urgencyServer(e){
    wx.makePhoneCall({
      phoneNumber: '18178346924'
    })
  },
  feedbackServer(e){
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  },
  ChangeAir(arr, status, mode) {
    arr.forEach((item) => {
      if (item[`${status}`] === 1) {
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
      if (item[`${status}`] === 1) {
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
      if (item[`${status}`] === '已开启') {
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
      if (item[`${status}`] === '已开启') {
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
  IntroomsInf(arr){
    arr.forEach((item) => {
      item.orderId = Nunmber(item.orderId)
      item.roomId = Nunmber(item.roomId)
      item.lockStatus = Nunmber(item.lockStatus)
      item.orderStatus = Nunmber(item.orderStatus)
      item.roomTemp = Nunmber(item.roomTemp)
      item.roomHum = Nunmber(item.roomHum)
    })
    return arr
  },
  IntairInf(arr){
    arr.forEach((item) => {
      item.airStatus = Nunmber(item.airStatus)
      item.airMode = Nunmber(item.airMode)
      item.airValue = Nunmber(item.airValue)
    })
    return arr
  },
  IntlightInf(arr){
    arr.forEach((item) => {
      item.lightStatus = Nunmber(item.lightStatus)
      item.lightMode = Nunmber(item.lightMode)
      item.lightValue = Nunmber(item.lightValue)
    })
    return arr
  },
})
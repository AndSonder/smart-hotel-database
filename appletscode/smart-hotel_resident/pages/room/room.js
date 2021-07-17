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
                switch (per_roomsinf_errorcode) {
                  case "0":
                    that.setData({
                      roomsList: per_roomsinf_jsonStr.datalist,
                      roomList: that.data.roomList.push(datalist[0]),
                      roomListLength: per_roomsinf_jsonStr.datalist.length,
                      roomId: per_roomsinf_jsonStr.datalist[0].roomId,
                      orderId: per_roomsinf_jsonStr.datalist[0].orderId,
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
                        var airList = that.ChangeAir(air_jsonStr.datalist,'airStatus','airMode')
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
                        var airList = that.ChangeAir(air_jsonStr.datalist,'airStatus','airMode')
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
            roomId: roomId,
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
  },
  controlAir(e){
    var airList = JSON.stringify(this.data.airList)
    wx.navigateTo({
      url: '/pages/airCondition/airCondition?roomId=' + this.data.roomId + '&airList=' + airList,
    })
  },
  controlLight(e){
    var lightList = JSON.stringify(this.data.lightList)
    wx.navigateTo({
      url: '/pages/light/light?roomId=' + this.data.roomId + '&lightList=' + lightList
    })
  },
  ChangeAir(arr, status, mode) {
    arr.forEach((item) => {
      if (item[`${status}`] === '1') {
        item.airStatus = '已开启'
      } else {
        item.airStatus = '已关闭'
      }
      switch (item[`${mode}`]) {
        case '0':
          item.airmMode = '吹风'
          break;
        case '1':
          item.airMode = '制热'
          break;
        case '2':
          item.airMode = '制冷'
          break;
      }
    })
    return arr
  },
  ChangeLight(arr, status, mode) {
    arr.forEach((item) => {
      if (item[`${status}`] === '1') {
        item.lightStatus = '已开启'
      } else {
        item.lightStatus = '已关闭'
      }
      switch (item[`${mode}`]) {
        case '0':
          item.lightMode = '标准'
          break;
        case '1':
          item.lightMode = '夜间'
          break;
        case '2':
          item.lightMode = '睡眠'
          break;
        case '3':
          item.lightMode = '起夜'
          break;
        case '4':
          item.lightMode = '影院'
          break;
      }
    })
    return arr
  },
})
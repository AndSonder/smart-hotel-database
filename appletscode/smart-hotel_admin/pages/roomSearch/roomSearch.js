const util = require('../../utils/util.js');
const md5 = require('../../utils/md5.js');
const app = getApp()
Page({
  data: {
    super_adminShow: false,
    managerShow: false,
    receptionShow: false,
    securityShow: false,
    cleanerShow: false,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 1,
    scrollLeft: 0,
    rtypeContent: '全选',
    startTimeContent: 'display-all',
    endTimeContent: 'display-all',
    searchContent: '订单号',
    rtypeShow: false,
    startTimeShow: false,
    endTimeShow: false,
    searchShow: false,
    justShow: false,
    RoomList: [],
    airInf: [],
    lightInf: [],
    userInf: [],
    orderInf: [],
    extra_roomsInf: [],
    rtypeList: [{
        name: '主题特色大床房',
      },
      {
        name: '温馨大床房',
      },
      {
        name: '如意标准间',
      },
      {
        name: '豪华大床房',
      },
      {
        name: '如意三人房',
      },
      {
        name: '团圆家庭房',
      },
      {
        name: '情侣套房',
      },
      {
        name: '商务套房',
      },
      {
        name: '全选',
      },
    ],
    searchList: [{
      name: '订单号',
    }, ],
    liveRoomList: [],
    notliveRoomList: [],
    start_minDate: new Date(1990, 1, 1).getTime(),
    start_maxDate: new Date(2099, 12, 31).getTime(),
    start_currentDate: new Date().getTime(),
    end_minDate: new Date(1990, 1, 1).getTime(),
    end_maxDate: new Date(2099, 12, 31).getTime(),
    end_currentDate: new Date().getTime(),
    inputValue: '', //点击结果项之后替换到文本框的值
  },
  onLoad(options) {
    var that = this;
    that.setData({
      rtypeContent: options.rtype,
      startTimeContent: options.startTime,
      endTimeContent: options.endTime,
    })
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
                    switch (identity_jsonStr.datalist[0].identity) {
                      case 0:
                        that.setData({
                          super_adminShow: true,
                        })
                        break;
                      case 1:
                        that.setData({
                          managerShow: true,
                        })
                        break;
                      case 2:
                        that.setData({
                          receptionShow: true,
                        })
                        break;
                      case 3:
                        that.setData({
                          securityShow: true,
                        })
                        break;
                      case 4:
                        that.setData({
                          cleanerShow: true,
                        })
                        break;
                    }
                    break;
                }
              }
            }
          })
        }
      }
    })
  },
  choose_rtype(e) {
    this.setData({
      rtypeShow: true
    });
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
  choose_search(e) {
    this.setData({
      searchShow: true
    });
  },
  onClose() {
    this.setData({
      rtypeShow: false,
      startTimeShow: false,
      endTimeShow: false,
      searchShow: false,
    });
  },
  onCancel(e) {
    this.setData({
      rtypeShow: false,
      startTimeShow: false,
      endTimeShow: false,
      searchShow: false,
    });
  },
  rtype_onSelect(event) {
    this.setData({
      rtypeContent: event.detail.name
    });
  },
  search_onSelect(event) {
    this.setData({
      searchContent: event.detail.name
    });
  },
  startTime_onConfirm(e) {
    this.setData({
      startTimeShow: false,
      startTimeContent: this.msToDate(e.detail).hasTime,
    })
  },
  endTime_onConfirm(e) {
    this.setData({
      endTimeShow: false,
      endTimeContent: this.msToDate(e.detail).hasTime,
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showModal(e) {
    var that = this;
    var roomId = e.currentTarget.dataset.roomid;
    var orderId = e.currentTarget.dataset.orderid;
    that.setData({
      modalName: e.currentTarget.dataset.target
    })
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var room_jsonData = {
            adminCode: res.code,
            roomId: roomId,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/room/roominf/admin/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(room_jsonData),
            success: function (res) {
              console.log('room---', res);
              var room_jsonStr = res.data;
              var room_errcode = room_jsonStr.errcode;
              switch (room_errcode) {
                case 0:
                  var roomInf = that.IntroomInf(room_jsonStr.datalist)
                  var roomInf = that.ChangeWindow(roomInf, 'roomWindow')
                  that.setData({
                    roomInf: roomInf,
                  })
                  break;
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
          var air_jsonData = {
            adminCode: res.code,
            roomId: roomId,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/hardware/air_condition/admin/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(air_jsonData),
            success: function (res) {
              console.log('air---', res);
              var air_jsonStr = res.data;
              var air_errcode = air_jsonStr.errcode;
              switch (air_errcode) {
                case 0:
                  var airInf = that.IntairInf(air_jsonStr.datalist)
                  var airInf = that.ChangeAir(airInf, 'airStatus', 'airMode')
                  that.setData({
                    airInf: airInf
                  })
                  break;
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
            adminCode: res.code,
            roomId: roomId,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/hardware/light/admin/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(light_jsonData),
            success: function (res) {
              console.log('light---', res);
              var light_jsonStr = res.data;
              var light_errcode = light_jsonStr.errcode;
              switch (light_errcode) {
                case 0:
                  var lightInf = that.IntlightInf(light_jsonStr.datalist)
                  var lightInf = that.ChangeLight(lightInf, 'lightStatus', 'lightMode')
                  that.setData({
                    lightInf: lightInf
                  })
                  break;
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
          var user_jsonData = {
            adminCode: res.code,
            orderId: orderId,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/user/perinf/admin/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(user_jsonData),
            success: function (res) {
              console.log('user---', res);
              var user_jsonStr = res.data;
              var user_errcode = user_jsonStr.errcode;
              switch (user_errcode) {
                case 0:
                  var userInf = that.IntuserInf(user_jsonStr.datalist)
                  that.setData({
                    userInf: userInf,
                  })
                  break;
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
          var order_jsonData = {
            adminCode: res.code,
            orderId: orderId,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/order/orderinf/admin/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(order_jsonData),
            success: function (res) {
              console.log('order---', res);
              var order_jsonStr = res.data;
              var order_errcode = order_jsonStr.errcode;
              switch (order_errcode) {
                case 0:
                  that.setData({
                    orderInf: order_jsonStr.datalist,
                  })
                  break;
              }
            }
          })
        }
      }
    })
  },
  showModal_just(e) {
    var that = this;
    var roomId = e.currentTarget.dataset.roomId;
    that.setData({
      modalName: e.currentTarget.dataset.target
    })
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var room_jsonData = {
            adminCode: res.code,
            roomId: roomId,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/room/roominf/admin/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(room_jsonData),
            success: function (res) {
              console.log('room---', res);
              var room_jsonStr = res.data;
              var room_errcode = room_jsonStr.errcode;
              switch (room_errcode) {
                case 0:
                  var roomInf = that.IntroomInf(room_jsonStr.datalist)
                  var roomInf = that.ChangeWindow(roomInf, 'roomWindow')
                  that.setData({
                    roomInf: roomInf,
                  })
                  break;
              }
            }
          })
        }
      }
    })
  },
  openDoor(e) {
    var that = this;
    var roomId = e.currentTarget.dataset.roomId;
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var lock_jsonData = {
            resCode: res.code,
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
            roomId: roomId,
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
              if (md5.hex_md5('door_opening_record' + lockRecord_jsonStr.stamp + 'liuboge' == lockRecord_jsonStr.tableProve)) {
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
  turnToAir(e) {
    var airList = this.ReturnAir(this.data.airInf)
    var airList = JSON.stringify(airList)
    wx.navigateTo({
      url: '/pages/airCondition/airCondition?roomId=' + this.data.roomId + '&airList=' + airList,
    })
  },
  turnToLight(e) {
    var lightList = this.ReturnLight(this.data.lightInf)
    var lightList = JSON.stringify(lightList)
    wx.navigateTo({
      url: '/pages/light/light?roomId=' + this.data.roomId + '&lightList=' + lightList
    })
  },
  //搜索部分
  //当键盘输入时，触发input事件
  bindput: function (e) {
    this.setData({
      inputValue: e.detail.value,
    })
    console.log(e.detail.value)
  },
  cancelsearch: function (e) {
    this.setData({
      inputValue: '',
    })
  },
  bindsearch: function (e) {
    var that = this;
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var extra_roomsinf_jsonData = {
            adminCode: res.code,
            roomType: that.data.rtypeContent,
            startTime: that.data.startTimeContent,
            endTime: that.data.endTimeContent,
            orderId: that.data.inputValue,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/room/extra_roomsinf/admin/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(extra_roomsinf_jsonData),
            success: function (res) {
              console.log('extra_roomsinf---', res);
              var extra_roomsinf_jsonStr = res.data;
              var extra_roomsinf_errcode = extra_roomsinf_jsonStr.errcode;
              switch (extra_roomsinf_errcode) {
                case 0:
                  var RoomList = that.ChangeHardware(extra_roomsinf_jsonStr.datalist)
                  that.setData({
                    RoomList: extra_roomsinf_jsonStr.datalist,
                  })
                  break;
              }
            }
          })
        }
      }
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      startTimeContent: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  time(time = +new Date()) {
    var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
    return date.toJSON().substr(0, 19).replace('T', ' ');
  },
  dateToMs(date) {
    let result = new Date(date).getTime();
    return result;
  },
  msToDate(msec) {
    let datetime = new Date(msec);
    let year = datetime.getFullYear();
    let month = datetime.getMonth();
    let date = datetime.getDate();
    let hour = datetime.getHours();
    let minute = datetime.getMinutes();
    let second = datetime.getSeconds();
    let result1 = year +
      '-' +
      ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
      '-' +
      ((date + 1) < 10 ? '0' + date : date) +
      ' ' +
      ((hour + 1) < 10 ? '0' + hour : hour) +
      ':' +
      ((minute + 1) < 10 ? '0' + minute : minute) +
      ':' +
      ((second + 1) < 10 ? '0' + second : second);
    let result2 = year +
      '-' +
      ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
      '-' +
      ((date + 1) < 10 ? '0' + date : date);
    let result = {
      hasTime: result1,
      withoutTime: result2
    };
    return result;
  },
  formatDate(date) {
    let taskStartTime
    if (date.getMonth() < 9) {
      taskStartTime = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-"
    } else {
      taskStartTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
    }
    if (date.getDate() < 10) {
      taskStartTime += "0" + date.getDate()
    } else {
      taskStartTime += date.getDate()
    }
    taskStartTime += " " + date.getHours() + ":" + date.getMinutes()
    this.setData({
      taskStartTime: taskStartTime,
    })
    return taskStartTime;
  },
  IntroomsList(arr) {
    arr.forEach((item) => {
      item.orderId = Number(item.orderId)
      item.roomId = Number(item.roomId)
      item.roomTemp = Number(item.roomTemp)
      item.roomHum = Number(item.roomHum)
      item.lockStatus = Number(item.lockStatus)
      item.airStatus = Number(item.orderStatus)
      item.lightStatus = Number(item.lightStatus)
    })
    return arr
  },
  IntroomInf(arr) {
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
  IntextraroomsList(arr) {
    arr.forEach((item) => {
      item.roomId = Number(item.roomId)
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
  IntuserInf(arr) {
    arr.forEach((item) => {
      item.phone = Number(item.phone)
      item.idCard = Number(item.idCard)
    })
    return arr
  },
  IntorderInf(arr) {
    arr.forEach((item) => {
      item.orderId = Number(item.phone)
      item.deposit = Number(item.deposit)
      item.amountsPay = Number(item.amountsPay)
    })
    return arr
  },
  ChangeHardware(arr) {
    arr.forEach((item) => {
      if (item.airStatus === 1) {
        item.airStatus = '开'
      } else {
        item.airStatus = '关'
      }
      if (item.lightStatus === 1) {
        item.lightStatus = '开'
      } else {
        item.lightStatus = '关'
      }
      if (item.lockStatus === 0) {
        item.lockStatus = '开'
      } else {
        item.lockStatus = '关'
      }
    })
    return arr
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
})
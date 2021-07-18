const util = require('../../utils/util.js');
const md5 = require('../../utils/md5.js');
const app = getApp()

Page({
  data: {
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
    rtypeShow: false,
    startTimeShow: false,
    endTimeShow: false,
    roomList1: [{
      "orderId": 123,
      "roomId": 123,
      "roomTemp": 26,
      "roomHum": 45,
      "lockStatus": 1,
      "airStatus": 1,
      "lightStatus": 1,
    }],
    roomList2: [],
    airInf:[],
    lightInf:[],
    userInf:[],
    orderInf:[],
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
    liveRoomList: [],
    notliveRoomList: [],
    start_minDate: new Date(1990, 1, 1).getTime(),
    start_maxDate: new Date(2099, 12, 31).getTime(),
    start_currentDate: new Date().getTime(),
    end_minDate: new Date(1990, 1, 1).getTime(),
    end_maxDate: new Date(2099, 12, 31).getTime(),
    end_currentDate: new Date().getTime(),
  },
  onLoad(e) {
    var that = this;
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var roomlist_jsonData = {
            adminCode: res.code,
            roomType: that.data.rtypeContent,
            strartTime: that.data.startTimeContent,
            endTime: that.data.endTimeContent,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/room/roomsinf/admin/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(roomlist_jsonData),
            success: function (res) {
              console.log('roomlist---', res);
              var roomlist_jsonStr = res.data;
              var roomlist_errorcode = roomlist_jsonStr.errorcode;
              switch (roomlist_errorcode) {
                case "0":
                  var roomList1 = that.ChangeHardware(roomlist_jsonStr.processList)
                  var roomList2 = that.ChangeHardware(roomlist_jsonStr.unprocessList)
                  that.setData({
                    roomList1: roomList1,
                    roomList2: roomList2,
                  })
                  break;
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
  onClose() {
    this.setData({
      rtypeShow: false,
      startTimeShow: false,
      endTimeShow: false,
    });
  },
  onCancel(e) {
    this.setData({
      rtypeShow: false,
      startTimeShow: false,
      endTimeShow: false,
    });
  },
  onSelect(event) {
    this.setData({
      rtypeContent: event.detail.name
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
  turn_search(e) {
    wx.navigateTo({
      url: '/pages/roomSearch/roomSearch?rtype=' + e.currentTarget.dataset.rtype + '&startTime=' + e.currentTarget.dataset.startTime + '&endTime=' + e.currentTarget.dataset.endTime,
    })
  },
  showModal(e) {
    var that = this;
    var roomId = e.currentTarget.dataset.roomId;
    var orderId = e.currentTarget.dataset.orderId;
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
            url: '',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(room_jsonData),
            success: function (res) {
              console.log('room---', res);
              var room_jsonStr = res.data;
              var room_errorcode = room_jsonStr.errorcode;
              switch (room_errorcode) {
                case "0":
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
            url: '',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(air_jsonData),
            success: function (res) {
              console.log('air---', res);
              var air_jsonStr = res.data;
              var air_errorcode = air_jsonStr.errorcode;
              switch (air_errorcode) {
                case "0":
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
            roomId: 'roomId',
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: '',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(light_jsonData),
            success: function (res) {
              console.log('light---', res);
              var light_jsonStr = res.data;
              var light_errorcode = light_jsonStr.errorcode;
              switch (light_errorcode) {
                case "0":
                  var lightInf = that.IntlightInf(light_jsonStr.datalist)
                  var lightInf = that.ChangeAir(lightInf, 'lightStatus', 'lightMode')
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
            roomId: orderId,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: '',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(user_jsonData),
            success: function (res) {
              console.log('user---', res);
              var user_jsonStr = res.data;
              var user_errorcode = user_jsonStr.errorcode;
              switch (user_errorcode) {
                case "0":
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
            url: '',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(order_jsonData),
            success: function (res) {
              console.log('order---', res);
              var order_jsonStr = res.data;
              var order_errorcode = order_jsonStr.errorcode;
              switch (order_errorcode) {
                case "0":
                  var orderInf = that.IntorderInf(order_jsonStr.datalist)
                  that.setData({
                    orderInf: orderInf,
                  })
                  break;
              }
            }
          })
        }
      }
    })
  },
  turnToAir(e){
    var airList = this.ReturnAir(this.data.airInf)
    var airList = JSON.stringify(airList)
    wx.navigateTo({
      url: '/pages/airCondition/airCondition?roomId=' + this.data.roomId + '&airList=' + airList,
    })
  },
  turnToLight(e){
    var lightList = this.ReturnLight(this.data.lightInf)
    var lightList = JSON.stringify(lightList)
    wx.navigateTo({
      url: '/pages/light/light?roomId=' + this.data.roomId + '&lightList=' + lightList
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
      ((date + 1) <= 10 ? '0' + date : date) +
      ' ' +
      ((hour + 1) <= 10 ? '0' + hour : hour) +
      ':' +
      ((minute + 1) <= 10 ? '0' + minute : minute)
    // ':' +
    // ((second + 1) < 10 ? '0' + second : second);
    let result2 = year +
      '-' +
      ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
      '-' +
      ((date + 1) <= 10 ? '0' + date : date);
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
  ChangeHardware(arr, status1, status2) {
    arr.forEach((item) => {
      if (item[`${status1}`] === 1) {
        item.airStatus = '开'
      } else {
        item.airStatus = '关'
      }
      if (item[`${status2}`] === 1) {
        item.lightStatus = '开'
      } else {
        item.lightStatus = '关'
      }

    })
    return arr
  },
  IntroomsList(arr) {
    arr.forEach((item) => {
      item.orderId = Nunmber(item.orderId)
      item.roomId = Nunmber(item.roomId)
      item.roomTemp = Nunmber(item.roomTemp)
      item.roomHum = Nunmber(item.roomHum)
      item.lockStatus = Nunmber(item.lockStatus)
      item.airStatus = Nunmber(item.orderStatus)
      item.lightStatus = Nunmber(item.lightStatus)
    })
    return arr
  },
  IntroomInf(arr) {
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
  IntairInf(arr) {
    arr.forEach((item) => {
      item.airStatus = Nunmber(item.airStatus)
      item.airMode = Nunmber(item.airMode)
      item.airValue = Nunmber(item.airValue)
    })
    return arr
  },
  IntlightInf(arr) {
    arr.forEach((item) => {
      item.lightStatus = Nunmber(item.lightStatus)
      item.lightMode = Nunmber(item.lightMode)
      item.lightValue = Nunmber(item.lightValue)
    })
    return arr
  },
  IntuserInf(arr) {
    arr.forEach((item) => {
      item.phone = Nunmber(item.phone)
      item.idCard = Nunmber(item.idCard)
    })
    return arr
  },
  IntorderInf(arr) {
    arr.forEach((item) => {
      item.orderId = Nunmber(item.phone)
      item.deposit = Nunmber(item.deposit)
      item.amountsPay = Nunmber(item.amountsPay) 
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
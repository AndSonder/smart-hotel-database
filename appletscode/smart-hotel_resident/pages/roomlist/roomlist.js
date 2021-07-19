const util = require('../../utils/util.js');
const dataTime = require('../../utils/dataTime.js');
const md5 = require('../../utils/md5.js');
const imgUrl = require('../../utils/image.js');
const app = getApp()

Page({
  data: {
    currentDate: [], //父页传值
    minDate: new Date(2021, 6, 16).getTime(),
    maxDate: new Date(2021, 8, 16).getTime(),
    show: false,
    startDate: app.globalData.startDate,
    endDate: app.globalData.endDate,
    rtypeContent: '全选',
    rtypeShow: false,
    maximumContent: '全选',
    maximumShow: false,
    rtypeContentShow: '房间类型：',
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
    maximumList: [{
        name: '4',
      },
      {
        name: '3',
      },
      {
        name: '2',
      },
      {
        name: '1',
      },
      {
        name: '全选',
      },
    ],
    List: [{
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
    roomList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      startDate: options.startDate,
      endDate: options.endDate,
    })
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var roomsinf_jsonData = {
            resCode: res.code,
            roomType: that.data.rtypeContent,
            maximum: that.data.maximumContent,
            startTime: that.data.startDate + ' ' + '06:00:00',
            endTime: that.data.endDate + ' ' + '15:00:00',
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/room/roomsinf/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(roomsinf_jsonData),
            success: function (res) {
              console.log('roomsinf---', res);
              var roomsinf_jsonStr = res.data;
              if (md5.hex_md5('user' + roomsinf_jsonStr.stamp + 'liuboge') == roomsinf_jsonStr.tableProve) {
                var roomsinf_errcode = roomsinf_jsonStr.errcode;
                switch (roomsinf_errcode) {
                  case 0:
                    var roomList = that.Introomlist(roomsinf_jsonStr.datalist)
                    console.log(roomList)
                    var roomList = that.ChangeWindow(roomList, 'roomWindow')
                    console.log(roomList)
                    var roomList = imgUrl.ImageNameGeneration(roomList)
                    console.log(roomList)
                    that.setData({
                      roomList: roomList,
                    })
                    break;
                  case 2:
                    that.setData({
                      roomList: [],
                    })
                    wx.showToast({
                      title: '无符合条件的房间',
                      icon: 'none',
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
  choose_rtype(e) {
    this.setData({
      rtypeShow: true
    });
  },
  choose_num(e) {
    this.setData({
      maximumShow: true
    });
  },
  onCancel(e) {
    this.setData({
      rtypeShow: false,
      maximumShow: false,
    });
  },
  rtype_onSelect(event) {
    var that = this;
    that.setData({
      rtypeContent: event.detail.name,
      rtypeContentShow: '',
    });
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var roomsinf_jsonData = {
            resCode: res.code,
            roomType: that.data.rtypeContent,
            maximum: that.data.maximumContent,
            startTime: that.data.startDate + ' ' + '06:00:00',
            endTime: that.data.endDate + ' ' + '15:00:00',
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/room/roomsinf/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(roomsinf_jsonData),
            success: function (res) {
              console.log('roomsinf_rtype---', res);
              var roomsinf_jsonStr = res.data;
              if (md5.hex_md5('user' + roomsinf_jsonStr.stamp + 'liuboge') == roomsinf_jsonStr.tableProve) {
                var roomsinf_errcode = roomsinf_jsonStr.errcode;
                switch (roomsinf_errcode) {
                  case 0:
                    var roomList = that.Introomlist(roomsinf_jsonStr.datalist)
                    var roomList = that.ChangeWindow(roomList, 'roomWindow')
                    var roomList = imgUrl.ImageNameGeneration(roomList)
                    console.log('roomList---', roomList)
                    that.setData({
                      roomList: roomList,
                    })
                    break;
                  case 2:
                    that.setData({
                      roomList: [],
                    })
                    wx.showToast({
                      title: '无符合条件的房间',
                      icon: 'none',
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
  maximum_onSelect(event) {
    var that = this;
    that.setData({
      maximumContent: event.detail.name
    });
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var roomsinf_jsonData = {
            resCode: res.code,
            roomType: that.data.rtypeContent,
            maximum: that.data.maximumContent,
            startTime: that.data.startDate + ' ' + '06:00:00',
            endTime: that.data.endDate + ' ' + '15:00:00',
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/room/roomsinf/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(roomsinf_jsonData),
            success: function (res) {
              console.log('roomsinf_maximum---', res);
              var roomsinf_jsonStr = res.data;
              if (md5.hex_md5('user' + roomsinf_jsonStr.stamp + 'liuboge') == roomsinf_jsonStr.tableProve) {
                var roomsinf_errcode = roomsinf_jsonStr.errcode;
                switch (roomsinf_errcode) {
                  case 0:
                    var roomList = that.Introomlist(roomsinf_jsonStr.datalist)
                    var roomList = that.ChangeWindow(roomList, 'roomWindow')
                    var roomList = imgUrl.ImageNameGeneration(roomList)
                    that.setData({
                      roomList: roomList,
                    })
                    break;
                  case 2:
                    that.setData({
                      roomList: [],
                    })
                    wx.showToast({
                      title: '无符合条件的房间',
                      icon: 'none',
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
  onDisplay() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false,
      rtypeShow: false,
      maximumShow: false,
    });
  },
  onConfirm(event) {
    var that = this
    const [start, end] = event.detail;
    that.setData({
      show: false,
      startDate: dataTime.msToDate(start).normalDate,
      endDate: dataTime.msToDate(end).normalDate,
    });
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var roomsinf_jsonData = {
            resCode: res.code,
            roomType: that.data.rtypeContent,
            maximum: that.data.maximumContent,
            startTime: that.data.startDate + ' ' + '06:00:00',
            endTime: that.data.endDate + ' ' + '15:00:00',
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/room/roomsinf/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(roomsinf_jsonData),
            success: function (res) {
              console.log('roomsinf_maximum---', res);
              var roomsinf_jsonStr = res.data;
              if (md5.hex_md5('user' + roomsinf_jsonStr.stamp + 'liuboge') == roomsinf_jsonStr.tableProve) {
                var roomsinf_errcode = roomsinf_jsonStr.errcode;
                switch (roomsinf_errcode) {
                  case 0:
                    var roomList = that.Introomlist(roomsinf_jsonStr.datalist)
                    var roomList = that.ChangeWindow(roomList, 'roomWindow')
                    var roomList = imgUrl.ImageNameGeneration(roomList)
                    that.setData({
                      roomList: roomList,
                    })
                    break;
                  case 2:
                    that.setData({
                      roomList: [],
                    })
                    wx.showToast({
                      title: '无符合条件的房间',
                      icon: 'none',
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
  trunBooking(e) {
    wx.navigateTo({
      url: '/pages/booking/booking?roomType=' + e.currentTarget.dataset.roomtype + '&roomPrice=' + e.currentTarget.dataset.roomprice + '&startDate=' + this.data.startDate + '&endDate=' + this.data.endDate,
    })
  },
  Introomlist(arr) {
    arr.forEach((item) => {
      item.maximum = Number(item.maximum)
      item.roomPrice = Number(item.roomPrice)
      item.roomWindow = Number(item.roomWindow)
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
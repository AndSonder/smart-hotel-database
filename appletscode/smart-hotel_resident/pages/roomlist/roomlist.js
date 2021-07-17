const util = require('../../utils/util.js');
const dataTime = require('../../utils/dataTime.js');
const md5 = require('../../utils/md5.js');
const app = getApp()
Page({
  data: {
    currentDate: '', //父页传值
    minDate: new Date(2021, 6, 16).getTime(),
    maxDate: new Date(2021, 7, 16).getTime(),
    show: false,
    startDate: '',
    endDate: '',
    rtypeContent: '全选',
    rtypeShow: false,
    maximumContent: '全选',
    maximumShow: false,
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
        name: '4 人',
      },
      {
        name: '3 人',
      },
      {
        name: '2 人',
      },
      {
        name: '1 人',
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
    roomList: [{
      "roomType": "豪华大床房",
      "bedType": "特大床",
      "maximum": 3,
      "roomPrice": 400
    }, {
      "roomType": "豪华大床房",
      "bedType": "特大床",
      "maximum": 3,
      "roomPrice": 400,
    }, ],
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
            endime: that.data.endDate + ' ' + '15:00:00',
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
              if (md5.hex_md5('room' + roomsinf_jsonStr.stamp + 'liuboge') == roomsinf_jsonStr.tableProve) {
                var roomsinf_errorcode = roomsinf_jsonStr.errorcode;
                switch (roomsinf_errorcode) {
                  case "0":
                    var roomList = that.ChangeWindow(roomsinf_jsonStr.datelist, 'roomWindow')
                    that.setData({
                      roomList: roomList,
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
      rtypeContent: event.detail.name
    });
    wx.login({
      success(res) {
        if (res.code) {
          var roomsinf_jsonData = {
            resCode: res.code,
            roomType: that.data.rtypeContent,
            maximum: that.data.maximumContent,
            startTime: that.data.startDate + ' ' + '06:00:00',
            endime: that.data.endDate + ' ' + '15:00:00',
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
              if (md5.hex_md5('room' + roomsinf_jsonStr.stamp + 'liuboge') == roomsinf_jsonStr.tableProve) {
                var roomsinf_errorcode = roomsinf_jsonStr.errorcode;
                switch (roomsinf_errorcode) {
                  case "0":
                    var roomList = that.ChangeWindow(roomsinf_jsonStr.datelist, 'roomWindow')
                    that.setData({
                      roomList: roomList,
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
    const [start, end] = event.detail;
    this.setData({
      show: false,
      startDate: dataTime.msToDate(start).normalDate,
      endDate: dataTime.msToDate(end).normalDate,
    });
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
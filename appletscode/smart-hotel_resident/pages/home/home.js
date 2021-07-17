const util = require('../../utils/util.js');
const dataTime = require('../../utils/dataTime.js');
const md5 = require('../../utils/md5.js');
const app = getApp()
Page({
  data: {
    backImage: '/images/reservation_backimg.png',
    startDate: '',
    endDate: '',
    start:'',
    end:'',
    minDate: new Date(2021, 6, 16).getTime(),
    maxDate: new Date(2021, 7, 16).getTime(),
    show: false,
    roomList: [] //精品推荐房间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      startDate: dataTime.msToDate(new Date().getTime()).justDate,
      endDate: dataTime.msToDate(new Date().getTime()).justendDate,
      start: dataTime.msToDate(new Date().getTime()).justDate.replace('月','/').replace('日',''),
      end: dataTime.msToDate(new Date().getTime()).justendDate.replace('月','/').replace('日',''),
    })
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var roomsinfBoutique_jsonData = {
            resCode: res.code,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/room/roomsinf-boutique/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(roomsinfBoutique_jsonData),
            success: function (res) {
              console.log('roomsinfBoutique---', res);
              var roomsinfBoutique_jsonStr = res.data;
              if (md5.hex_md5('room' + roomsinfBoutique_jsonStr.stamp + 'liuboge' == roomsinfBoutique_jsonStr.tableProve)) {
                var roomsinfBoutique_errorcode = roomsinfBoutique_jsonStr.errorcode;
                switch (roomsinfBoutique_errorcode) {
                  case "0":
                    var roomList = that.ChangeWindow(roomsinfBoutique_jsonStr.datelist, 'roomWindow')
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
  onDisplay() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    this.setData({
      show: false,
      startDate: dataTime.msToDate(start).justData,
      endDate: dataTime.msToDate(end).justData,
    });
  },
  roomlist(e) {
    wx.navigateTo({
      url: '/pages/roomlist/roomlist?startDate=' + this.data.start + '&endDate=' + this.data.end,
    })
  },
  callServer(e){
    wx.makePhoneCall({
      phoneNumber: '18178346924'
    })
  },
  trunBooking(e){
    wx.navigateTo({
      url: '/pages/booking/booking?roomType=' + e.currentTarget.dataset.roomType + '&roomPrice=' + e.currentTarget.dataset.roomPrice + '&startDate=' + this.data.start + '&endDate=' + this.data.end,
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
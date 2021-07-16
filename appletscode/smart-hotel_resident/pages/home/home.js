const util = require('../../utils/util.js');
const md5 = require('../../utils/md5.js');
const app = getApp()
Page({
  data: {
    backImage: '/images/reservation_backimg.png',
    startDate: '',
    endData: '',
    minDate: new Date(2021, 6, 16).getTime(),
    maxDate: new Date(2021, 7, 16).getTime(),
    show: false,
    roomlist:[]   //精品推荐房间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      startDate: this.msToDate(new Date().getTime()).justData,
      endData: this.msToDate(new Date().getTime()).justendData,
    })
    var that = this
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var roomsinfBoutique_jsonData = {
            resCode: res.code,
            stamp: stamp,
            prove: md5.hex_md5(res.code+stamp+'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: '/room/roomsinf-boutique/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(roomsinfBoutique_jsonData),
            success: function (res) {
              console.log('roomsinfBoutique---', res);
              var roomsinfBoutique_jsonStr = res.data;
              var roomsinfBoutique_errorcode = roomsinfBoutique_jsonStr.errorcode;
              switch (roomsinfBoutique_errorcode){
                case "0":
                  that.setData({
                    roomlist:roomsinfBoutique_jsonStr.datelist,
                  })
                  break;
              }
            }
          })
        }
      }
    })
    wx.login({
      success(res) {
        if (res.code) {
          var roomlist_jsonData = {
            adminCode: res.code,
            stamp: stamp,
            prove: md5.hex_md5(res.code+stamp+'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: '',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(roomlist_jsonData),
            success: function (res) {
              console.log('roomlist---', res);
              var roomlist_jsonStr = res.data;
              var roomlist_errorcode = roomlist_jsonStr.errorcode;
              switch (roomlist_errorcode){
                case "0":
                  break;
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
      startDate: this.msToDate(start).justData,
      endData: this.msToDate(end).justData,
    });
  },
  roomlist (e) {
    wx.navigateTo({
      url: '/pages/roomlist/roomlist',
    })
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
      ((minute + 1) < 10 ? '0' + minute : minute)
    // ':' +
    // ((second + 1) < 10 ? '0' + second : second);
    let result2 = year +
      '-' +
      ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
      '-' +
      ((date + 1) < 10 ? '0' + date : date);
    let result3 = ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
      '月' +
      ((date + 1) < 10 ? '0' + date : date) + '日';
    let result4 = ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
      '月' +
      ((date + 1) < 10 ? '0' + (date + 1) : (date + 1) ) + '日';
    let result = {
      hasTime: result1,
      withoutTime: result2,
      justData: result3,
      justendData: result4,
    };
    return result;
  },
})
const util = require('../../utils/util.js')
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
    startTimeContent:'display-all',
    endTimeContent:'display-all',
    rtypeShow: false,
    startTimeShow: false,
    endTimeShow: false,
    rtypeList: [
      {
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
    start_minDate: new Date(1990, 1, 1).getTime(),
    start_maxDate: new Date(2099, 12, 31).getTime(),
    start_currentDate: new Date().getTime(),
    end_minDate: new Date(1990, 1, 1).getTime(),
    end_maxDate: new Date(2099, 12, 31).getTime(),
    end_currentDate: new Date().getTime(),
  },
  onLoad(e) {
    
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
      startTimeContent: this.formatDate(new Date(e.detail)),
    })
  },
  endTime_onConfirm(e) {
    this.setData({ 
      endTimeShow: false,
      endTimeContent: this.formatDate(new Date(e.detail)),
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
    this.setData({
      modalName: e.currentTarget.dataset.target
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
})
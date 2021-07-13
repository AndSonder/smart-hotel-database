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
    rtypeShow: false,
    startTimeShow: false,
    endTimeShow: false,
    rtypeList: [{
        name: '无窗家庭房',
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
        name: '商务套房',
      },
      {
        name: '全选',
      },
    ],
    start_minDate: new Date().getTime(),
    start_maxDate: new Date(2019, 10, 1).getTime(),
    start_currentDate: '',
  },
  onLoad(e) {
    var DATE = util.formatTime(new Date());
    this.setData({
      start_currentDate:DATE
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
  onClose() {
    this.setData({
      rtypeShow: false
    });
  },
  onCancel(e) {
    this.setData({
      rtypeShow: false
    });
  },
  onSelect(event) {
    this.setData({
      rtypeContent: event.detail.name
    });
    console.log(event.detail);
  },
  start_onInput(e) {
    this.setData({
      start_currentDate: e.detail,
    });
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
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
})
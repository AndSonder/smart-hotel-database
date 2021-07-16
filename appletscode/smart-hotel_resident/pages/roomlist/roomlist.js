// pages/roomlist/roomlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate: '', //父页传值
    minDate: new Date(2021, 6, 16).getTime(),
    maxDate: new Date(2021, 7, 16).getTime(),
    show: false,
    now: '07/17-08/18',
    rtypeContent: '全选',
    rtypeShow: false,
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

  },
  choose_rtype(e) {
    this.setData({
      rtypeShow: true
    });
  },
  onCancel(e) {
    this.setData({
      rtypeShow: false,
    });
  },
  rtype_onSelect(event) {
    this.setData({
      rtypeContent: event.detail.name
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
    });
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    this.setData({
      show: false,
      date: `${this.msToDate(start).justData} - ${this.msToDate(end).justData}`,
    });
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
      '/' +
      ((date + 1) < 10 ? '0' + date : date);
    let result4 = ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
      '月' +
      ((date + 1) < 10 ? '0' + (date + 1) : (date + 1)) + '日';
    let result = {
      hasTime: result1,
      withoutTime: result2,
      justData: result3,
      justendData: result4,
    };
    return result;
  },
})
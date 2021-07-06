// pages/search/search.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: [],
    keyWord: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  hideInput: function () {
    this.setData({
      inputVal: "",
    });
    wx.navigateBack({
      delta: 2,
    })
    // getList(this);
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      keyWord: "",
    });
    // getList(this);
  },

  //输入时实施调用搜索方法
  inputTyping: function (e) {
    this.search(e.detail.value)
  },

  //软键盘搜索按钮（maybe 有问题）
  confirmTyping: function (e) {
    this.search(e.detail.value)
  },

  //搜索
  search: function (key) {
    var that = this;
    var room_info = new Array(app.globalData.room_info);
    var Key = RegExp(key);
    var arr = [] //临时数据库 存放匹配搜索字段的数据
    for (let i in room_info[0]) {
      room_info[0][i].isShow = false; //所有数据隐藏
      if (Key.test(room_info[0][i].roomID)) {
        room_info[0][i].isShow = true; //匹配到的数据显示
        arr.push(room_info[0][i])
      }
      console.log(room_info[0])
      that.setData({
        inputVal: room_info[0],
        keyWord: key,
      })
    }
    console.log(that.data.inputVal)
    if (arr.length == 0) {
      wx.showToast({
        title: '查无此房间',
        icon: 'none',
      })
    }
  },

  //“点我订房”按钮
  fillup: function (event) {
    wx.request({
      url: 'https://www.supremeproger.com/bandTime',
      data: {
        'roomID': event.currentTarget.dataset.id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.data.data != "") {
          var len = res.data.data.length;
          for (var i = 0; i < len; i++) {
            var newarrary = 'bookedTime[' + i + '].StartTime';
            var newarrary_1 = 'bookedTime[' + i + '].EndTime';
            this.setData({
              [newarrary]: res.data.data[i].startTime.slice(0, 4) + '/' + res.data.data[i].startTime.slice(5, 7) + '/' + res.data.data[i].startTime.slice(8, 10) + ' ' + res.data.data[i].startTime.slice(11, 19),
              [newarrary_1]: res.data.data[i].endTime.slice(0, 4) + '/' + res.data.data[i].endTime.slice(5, 7) + '/' + res.data.data[i].endTime.slice(8, 10) + ' ' + res.data.data[i].endTime.slice(11, 19),
            })
          }
          var bookedTime = JSON.stringify(this.data.bookedTime)
          wx.navigateTo({
            url: '/pages/fill/fill?id=' + event.currentTarget.dataset.id + "&bookedTime=" + bookedTime,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
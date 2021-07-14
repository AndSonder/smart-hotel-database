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
    startTimeContent:'display-all',
    endTimeContent:'display-all',
    searchContent: '房间号',
    rtypeShow: false,
    startTimeShow: false,
    endTimeShow: false,
    searchShow: false,
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
    searchList:[
      {
        name: '住户姓名',
      },
      {
        name: '订单号',
      },
      {
        name: '房间号',
      },
    ],
    liveRoomList:[],
    notliveRoomList:[],
    start_minDate: new Date(1990, 1, 1).getTime(),
    start_maxDate: new Date(2099, 12, 31).getTime(),
    start_currentDate: new Date().getTime(),
    end_minDate: new Date(1990, 1, 1).getTime(),
    end_maxDate: new Date(2099, 12, 31).getTime(),
    end_currentDate: new Date().getTime(),
    inputValue: '', //点击结果项之后替换到文本框的值
    // adapterSource: ["weixin", "wechat", "android", "Android", "IOS", "java", "javascript", "微信小程序", "微信公众号", "微信开发者工具"], //本地匹配源
    adapterSource: [{
        name: '中国',
        value: 'China'
      },
      {
        name: '俄罗斯',
        value: 'Russia'
      },
      {
        name: '美国',
        value: 'America'
      },
      {
        name: '澳大利亚',
        value: 'Australia'
      },
      {
        name: '巴西',
        value: 'Brazil'
      },
      {
        name: '韩国',
        value: 'Korea'
      },
      {
        name: '朝鲜',
        value: 'North Korea'
      },
      {
        name: '英国',
        value: 'Britain'
      },
      {
        name: '德国',
        value: 'Germany'
      },
      {
        name: '加拿大',
        value: 'Canada'
      },
      {
        name: '非洲',
        value: 'New Zealand'
      }
    ],
    bindSource: [], //绑定到页面的数据，根据用户输入动态变化
    hideScroll: false,
    color: '', //`取消`按钮的颜色
    opacity: '', //`取消`按钮的透明度
    bookinf: [],
  },
  onLoad(options) {
    this.setData({
      rtypeContent: options.rtype,
      startTimeContent: options.startTime,
      endTimeContent: options.endTime,
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
  choose_search(e){
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
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var room_jsonData = {
            adminCode: res.code,
            roomId: roomId,
            stamp: stamp,
            prove: md5.hex_md5(res.code+stamp+'liuboge'),
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
              switch (room_errorcode){
                case "0":
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
          var air_jsonData = {
            adminCode: res.code,
            roomId: roomId,
            stamp: stamp,
            prove: md5.hex_md5(res.code+stamp+'liuboge'),
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
              switch (air_errorcode){
                case "0":
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
          var light_jsonData = {
            adminCode: res.code,
            roomId: roomId,
            stamp: stamp,
            prove: md5.hex_md5(res.code+stamp+'liuboge'),
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
              switch (light_errorcode){
                case "0":
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
          var order_jsonData = {
            adminCode: res.code,
            orderId: orderId,
            stamp: stamp,
            prove: md5.hex_md5(res.code+stamp+'liuboge'),
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
              switch (order_errorcode){
                case "0":
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
  dateToMs (date) {
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
  //搜索部分
  //当键盘输入时，触发input事件
  bindsearch: function (e) {
    var that = this
    //用户实时输入值
    var prefix = e.detail.value
    //匹配的结果
    var newSource = []
    var bookinf = that.data.bookinf
    var bookinf = []
    if (prefix != "") {
      // 对于数组array进行遍历，功能函数中的参数 `e`就是遍历时的数组元素值。
      that.data.adapterSource.forEach(function (e) {
        // 用户输入的字符串如果在数组中某个元素中出现，将该元素存到newSource中
        if (e.name.indexOf(prefix) != -1) {
          console.log(e);
          bookinf.push(e)
          newSource.push(e.name)
        }
        that.setData({
          bookinf:bookinf,
        })
      })
      console.log(that.data.bookinf)
    };
    // 如果匹配结果存在，那么将其返回，相反则返回空数组
    if (newSource.length != 0) {
      this.setData({
        // 匹配结果存在，显示自动联想词下拉列表
        hideScroll: false,
        bindSource: newSource,
        arrayHeight: newSource.length * 100
      })
    } else {
      this.setData({
        // 匹配无结果，不显示下拉列表
        hideScroll: true,
        bindSource: []
      })
    }
  },

  // 用户点击选择某个联想字符串时，获取该联想词，并清空提醒联想词数组
  itemtap: function (e) {
    var booklogo = e.currentTarget.id
    this.setData({
      // .id在wxml中被赋值为{{item}}，即当前遍历的元素值
      inputValue: booklogo,
      // 当用户选择某个联想词，隐藏下拉列表
      hideScroll: true,
      bindSource: []
    })
    this.data.bookinf.forEach(function (e) {
      // 用户输入的字符串如果在数组中某个元素中出现，将该元素存到newSource中
      if (e.name.indexOf(booklogo) != -1) {
        console.log(e);
        wx.navigateTo({
          url: '/pages/bookinf/bookinf?bookid=' + e.bookid + "&name=" + e.name + "&author=" + e.author + "&introduction=" + e.introduction + "&cnt=" + e.availiable_cnt,
        })
      }
    })
  },
  cancelsearch: function (e) {
    wx.navigateBack({
      //返回上一级
      delta: 1,
    })
    this.setData({
      color: "rgb(58, 56, 56)",
      opacity: "0.9",
    })
  }
})
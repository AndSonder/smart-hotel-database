const util = require('../../utils/util.js');
const dataTime = require('../../utils/dataTime.js');
const md5 = require('../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    gradientColor: {},
    roomId: '',
    lightContent: '',
    lightList: [],
    lightStatus: '',
    lightMode: '',
    lightValue: '',
    illuminationUI: '',
    nightUI: '',
    sleepUI: '',
    getUpNightUI: '',
    cinemaUI: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var lightList = JSON.parse(options.lightList)
    that.setData({
      roomId: options.roomId,
      lightList: lightList,
      lightStatus: lightList[0].lightStatus,
      lightMode: lightList[0].lightMode,
      lightValue: lightList[0].lightValue,
      value: lightList[0].lightValue * 10,
    })
    console.log(options)
    that.chooseUI()
  },
  chooseUI(){
    var that = this
    if (that.data.lightStatus == 1) {
      that.setData({
        lightContent: '关',
        gradientColor: {
          '0%': '#0081ff',
          '100%': '#1cbbb4',
        },
      })
      switch (that.data.lightMode) {
        case 0:
          that.setData({
            illuminationUI: 'background-color: #aaaaaa;opacity: 0.8;',
            nightUI: '',
            sleepUI: '',
            getUpNightUI: '',
            cinemaUI: '',
          })
          break;
        case 1:
          that.setData({
            illuminationUI: '',
            nightUI: 'background-color: #aaaaaa;opacity: 0.8;',
            sleepUI: '',
            getUpNightUI: '',
            cinemaUI: '',
          })
          break;
        case 2:
          that.setData({
            illuminationUI: '',
            nightUI: '',
            sleepUI: 'background-color: #aaaaaa;opacity: 0.8;',
            getUpNightUI: '',
            cinemaUI: '',
          })
          break;
        case 3:
          that.setData({
            illuminationUI: '',
            nightUI: '',
            sleepUI: '',
            getUpNightUI: 'background-color: #aaaaaa;opacity: 0.8;',
            cinemaUI: '',
          })
          break;
        case 4:
          that.setData({
            illuminationUI: '',
            nightUI: '',
            sleepUI: '',
            getUpNightUI: '',
            cinemaUI: 'background-color: #aaaaaa;opacity: 0.8;',
          })
          break;
      }
    } else {
      that.setData({
        illuminationUI: '',
        nightUI: '',
        sleepUI: '',
        getUpNightUI: '',
        cinemaUI: '',
        lightContent: '开',
        gradientColor: {
          '0%': 'gray',
          '100%': 'black',
        }
      })
    }
  },
  chooseIllumination(e) {
    if (this.data.lightStatus == 1) {
      var that = this
      that.setData({
        illuminationUI: 'background-color: #aaaaaa;opacity: 0.8;',
        nightUI: '',
        sleepUI: '',
        getUpNightUI: '',
        cinemaUI: '',
        lightMode: 0,
      })
      var stamp = util.formatTime(new Date());
      wx.login({
        success(res) {
          if (res.code) {
            var light_jsonData = {
              resCode: res.code,
              roomId: that.data.roomId,
              lightStatus: that.data.lightStatus,
              lightMode: that.data.lightMode,
              lightValue: that.data.lightValue,
              stamp: stamp,
              prove: md5.hex_md5(res.code + stamp + 'liuboge'),
            };
            wx.request({
              method: 'POST',
              url: 'https://www.supremeproger.com/hardware/light/user/push',
              header: {
                'content-type': 'application/json'
              },
              data: JSON.stringify(light_jsonData),
              success: function (res) {
                console.log('light---', res);
                var light_jsonStr = res.data;
                if (md5.hex_md5('user' + light_jsonStr.stamp + 'liuboge' == light_jsonStr.tableProve)) {
                  var light_errcode = light_jsonStr.errcode;
                  switch (light_errcode) {
                    case 0:
                      wx.showToast({
                        title: '标准照明',
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
    }
  },
  chooseNight(e) {
    if (this.data.lightStatus == 1) {
      var that = this
      that.setData({
        illuminationUI: '',
        nightUI: 'background-color: #aaaaaa;opacity: 0.8;',
        sleepUI: '',
        getUpNightUI: '',
        cinemaUI: '',
        lightMode: 1,
      })
      var stamp = util.formatTime(new Date());
      wx.login({
        success(res) {
          if (res.code) {
            var light_jsonData = {
              resCode: res.code,
              roomId: that.data.roomId,
              lightStatus: that.data.lightStatus,
              lightMode: that.data.lightMode,
              lightValue: that.data.lightValue,
              stamp: stamp,
              prove: md5.hex_md5(res.code + stamp + 'liuboge'),
            };
            wx.request({
              method: 'POST',
              url: 'https://www.supremeproger.com/hardware/light/user/push',
              header: {
                'content-type': 'application/json'
              },
              data: JSON.stringify(light_jsonData),
              success: function (res) {
                console.log('light---', res);
                var light_jsonStr = res.data;
                if (md5.hex_md5('user' + light_jsonStr.stamp + 'liuboge' == light_jsonStr.tableProve)) {
                  var light_errcode = light_jsonStr.errcode;
                  switch (light_errcode) {
                    case 0:
                      wx.showToast({
                        title: '夜间模式',
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
    }
  },
  chooseSleep(e) {
    if (this.data.lightStatus == 1) {
      var that = this
      that.setData({
        illuminationUI: '',
        nightUI: '',
        sleepUI: 'background-color: #aaaaaa;opacity: 0.8;',
        getUpNightUI: '',
        cinemaUI: '',
        lightMode: 2,
      })
      var stamp = util.formatTime(new Date());
      wx.login({
        success(res) {
          if (res.code) {
            var light_jsonData = {
              resCode: res.code,
              roomId: that.data.roomId,
              lightStatus: that.data.lightStatus,
              lightMode: that.data.lightMode,
              lightValue: that.data.lightValue,
              stamp: stamp,
              prove: md5.hex_md5(res.code + stamp + 'liuboge'),
            };
            wx.request({
              method: 'POST',
              url: 'https://www.supremeproger.com/hardware/light/user/push',
              header: {
                'content-type': 'application/json'
              },
              data: JSON.stringify(light_jsonData),
              success: function (res) {
                console.log('light---', res);
                var light_jsonStr = res.data;
                if (md5.hex_md5('user' + light_jsonStr.stamp + 'liuboge' == light_jsonStr.tableProve)) {
                  var light_errcode = light_jsonStr.errcode;
                  switch (light_errcode) {
                    case 0:
                      wx.showToast({
                        title: '睡眠模式',
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
    }
  },
  choosegetUpNight(e) {
    if (this.data.lightStatus == 1) {
      var that = this
      that.setData({
        illuminationUI: '',
        nightUI: '',
        sleepUI: '',
        getUpNightUI: 'background-color: #aaaaaa;opacity: 0.8;',
        cinemaUI: '',
        lightMode: 3,
      })
      var stamp = util.formatTime(new Date());
      wx.login({
        success(res) {
          if (res.code) {
            var light_jsonData = {
              resCode: res.code,
              roomId: that.data.roomId,
              lightStatus: that.data.lightStatus,
              lightMode: that.data.lightMode,
              lightValue: that.data.lightValue,
              stamp: stamp,
              prove: md5.hex_md5(res.code + stamp + 'liuboge'),
            };
            wx.request({
              method: 'POST',
              url: 'https://www.supremeproger.com/hardware/light/user/push',
              header: {
                'content-type': 'application/json'
              },
              data: JSON.stringify(light_jsonData),
              success: function (res) {
                console.log('light---', res);
                var light_jsonStr = res.data;
                if (md5.hex_md5('user' + light_jsonStr.stamp + 'liuboge' == light_jsonStr.tableProve)) {
                  var light_errcode = light_jsonStr.errcode;
                  switch (light_errcode) {
                    case 0:
                      wx.showToast({
                        title: '起夜模式',
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
    }
  },
  chooseCinema(e) {
    if (this.data.lightStatus == 1) {
      var that = this
      that.setData({
        illuminationUI: '',
        nightUI: '',
        sleepUI: '',
        getUpNightUI: '',
        cinemaUI: 'background-color: #aaaaaa;opacity: 0.8;',
        lightMode: 4,
      })
      var stamp = util.formatTime(new Date());
      wx.login({
        success(res) {
          if (res.code) {
            var light_jsonData = {
              resCode: res.code,
              roomId: that.data.roomId,
              lightStatus: that.data.lightStatus,
              lightMode: that.data.lightMode,
              lightValue: that.data.lightValue,
              stamp: stamp,
              prove: md5.hex_md5(res.code + stamp + 'liuboge'),
            };
            wx.request({
              method: 'POST',
              url: 'https://www.supremeproger.com/hardware/light/user/push',
              header: {
                'content-type': 'application/json'
              },
              data: JSON.stringify(light_jsonData),
              success: function (res) {
                console.log('light---', res);
                var light_jsonStr = res.data;
                if (md5.hex_md5('user' + light_jsonStr.stamp + 'liuboge' == light_jsonStr.tableProve)) {
                  var light_errcode = light_jsonStr.errcode;
                  switch (light_errcode) {
                    case 0:
                      wx.showToast({
                        title: '影院模式',
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
    }
  },
  controlStatus(e) {
    var that = this
    if (that.data.lightStatus == 1) {
      that.setData({
        illuminationUI: '',
        nightUI: '',
        sleepUI: '',
        getUpNightUI: '',
        cinemaUI: '',
        lightStatus: 0,
        lightContent:'开'
      })
      var stamp = util.formatTime(new Date());
      wx.login({
        success(res) {
          if (res.code) {
            var light_jsonData = {
              resCode: res.code,
              roomId: that.data.roomId,
              lightStatus: that.data.lightStatus,
              lightMode: that.data.lightMode,
              lightValue: that.data.lightValue,
              stamp: stamp,
              prove: md5.hex_md5(res.code + stamp + 'liuboge'),
            };
            wx.request({
              method: 'POST',
              url: 'https://www.supremeproger.com/hardware/light/user/push',
              header: {
                'content-type': 'application/json'
              },
              data: JSON.stringify(light_jsonData),
              success: function (res) {
                console.log('light---', res);
                var light_jsonStr = res.data;
                if (md5.hex_md5('user' + light_jsonStr.stamp + 'liuboge' == light_jsonStr.tableProve)) {
                  var light_errcode = light_jsonStr.errcode;
                  switch (light_errcode) {
                    case 0:
                      wx.showToast({
                        title: '已关闭',
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
    } else {
      that.setData({
        lightStatus: 1,
        lightContent:'关',
      })
      that.chooseUI()
      var stamp = util.formatTime(new Date());
      wx.login({
        success(res) {
          if (res.code) {
            var light_jsonData = {
              resCode: res.code,
              roomId: that.data.roomId,
              lightStatus: that.data.lightStatus,
              lightMode: that.data.lightMode,
              lightValue: that.data.lightValue,
              stamp: stamp,
              prove: md5.hex_md5(res.code + stamp + 'liuboge'),
            };
            wx.request({
              method: 'POST',
              url: 'https://www.supremeproger.com/hardware/light/user/push',
              header: {
                'content-type': 'application/json'
              },
              data: JSON.stringify(light_jsonData),
              success: function (res) {
                console.log('light---', res);
                var light_jsonStr = res.data;
                if (md5.hex_md5('user' + light_jsonStr.stamp + 'liuboge' == light_jsonStr.tableProve)) {
                  var light_errcode = light_jsonStr.errcode;
                  switch (light_errcode) {
                    case 0:
                      wx.showToast({
                        title: '已开启',
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
    }
  },
  down(e) {
    var that = this;
    if (that.data.lightValue > 0) {
      that.setData({
        lightValue: that.data.lightValue - 1,
        value: (that.data.lightValue - 1) * 10,
        lightContent: that.data.lightValue - 1
      })
      var stamp = util.formatTime(new Date());
      wx.login({
        success(res) {
          if (res.code) {
            var light_jsonData = {
              resCode: res.code,
              roomId: that.data.roomId,
              lightStatus: that.data.lightStatus,
              lightMode: that.data.lightMode,
              lightValue: that.data.lightValue,
              stamp: stamp,
              prove: md5.hex_md5(res.code + stamp + 'liuboge'),
            };
            wx.request({
              method: 'POST',
              url: 'https://www.supremeproger.com/hardware/light/user/push',
              header: {
                'content-type': 'application/json'
              },
              data: JSON.stringify(light_jsonData),
              success: function (res) {
                console.log('light---', res);
                var light_jsonStr = res.data;
                if (md5.hex_md5('user' + light_jsonStr.stamp + 'liuboge' == light_jsonStr.tableProve)) {
                  var light_errcode = light_jsonStr.errcode;
                  switch (light_errcode) {
                    case 0:
                      break;
                  }
                }
              }
            })
          }
        }
      })
    }
  },
  up(e) {
    var that = this;
    if (that.data.lightValue < 10) {
      that.setData({
        lightValue: that.data.lightValue + 1,
        value: (that.data.lightValue + 1) * 10,
        lightContent: that.data.lightValue + 1
      })
      var stamp = util.formatTime(new Date());
      wx.login({
        success(res) {
          if (res.code) {
            var light_jsonData = {
              resCode: res.code,
              roomId: that.data.roomId,
              lightStatus: that.data.lightStatus,
              lightMode: that.data.lightMode,
              lightValue: that.data.lightValue,
              stamp: stamp,
              prove: md5.hex_md5(res.code + stamp + 'liuboge'),
            };
            wx.request({
              method: 'POST',
              url: 'https://www.supremeproger.com/hardware/light/user/push',
              header: {
                'content-type': 'application/json'
              },
              data: JSON.stringify(light_jsonData),
              success: function (res) {
                console.log('light---', res);
                var light_jsonStr = res.data;
                if (md5.hex_md5('user' + light_jsonStr.stamp + 'liuboge' == light_jsonStr.tableProve)) {
                  var light_errcode = light_jsonStr.errcode;
                  switch (light_errcode) {
                    case 0:
                      break;
                  }
                }
              }
            })
          }
        }
      })
    }
  },
})
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
    roomId:'',
    airContent: '',
    airList: [],
    airStatus: '',
    airMode: '',
    airValue: '',
    hotUI: '',
    windUI: '',
    coldUI: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var airList = JSON.parse(options.airList)
    that.setData({
      roomId: options.roomId,
      airList: airList,
      airStatus: airList[0].airStatus,
      airMode: airList[0].airMode,
      airValue: airList[0].airValue,
      value: airList[0].airValue*6.25,
    })
    if (airList[0].airStatus == 1) {
      that.setData({
        airContent: '开',
        gradientColor: {
          '0%': '#0081ff',
          '100%': '#1cbbb4',
        },
      })
      switch (airList[0].airMode) {
        case 0:
          that.setData({
            hotUI: '',
            windUI: 'background-color: #aaaaaa;opacity: 0.8;',
            coldUI: '',
          })
          break;
        case 1:
          that.setData({
            hotUI: 'background-color: #aaaaaa;opacity: 0.8;',
            windUI: '',
            coldUI: '',
          })
          break;
        case 2:
          that.setData({
            hotUI: '',
            windUI: '',
            coldUI: 'background-color: #aaaaaa;opacity: 0.8;',
          })
          break;
      }
    } else {
      that.setData({
        hotUI: '',
        windUI: '',
        coldUI: '',
        airContent: '关',
        gradientColor: {
          '0%': 'gray',
          '100%': 'black',
        }
      })
    }
  },
  chooseHot(e) {
    if (this.data.airStatus == 1) {
      var that = this
      that.setData({
        hotUI: 'background-color: #aaaaaa;opacity: 0.8;',
        windUI: '',
        coldUI: '',
        airMode: 1,
      })
      var stamp = util.formatTime(new Date());
      wx.login({
        success(res) {
          if (res.code) {
            var air_jsonData = {
              resCode: res.code,
              roomId:that.data.roomId,
              airStatus: that.data.airStatus,
              airMode: that.data.airMode,
              airValue: that.data.airValue,
              stamp: stamp,
              prove: md5.hex_md5(res.code + stamp + 'liuboge'),
            };
            wx.request({
              method: 'POST',
              url: 'https://www.supremeproger.com/hardware/air_condition/user/push',
              header: {
                'content-type': 'application/json'
              },
              data: JSON.stringify(air_jsonData),
              success: function (res) {
                console.log('air---', res);
                var air_jsonStr = res.data;
                if (md5.hex_md5('air_conditioning' + air_jsonStr.stamp + 'liuboge' == air_jsonStr.tableProve)) {
                  var air_errorcode = air_jsonStr.errorcode;
                  switch (air_errorcode) {
                    case "0":
                      wx.showToast({
                        title: '制热模式',
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
  chooseWind(e) {
    if (this.data.airStatus == 1) {
      var that = this
      that.setData({
        hotUI: '',
        windUI: 'background-color: #aaaaaa;opacity: 0.8;',
        coldUI: '',
        airMode: 0,
      })
      var stamp = util.formatTime(new Date());
      wx.login({
        success(res) {
          if (res.code) {
            var air_jsonData = {
              resCode: res.code,
              roomId:that.data.roomId,
              airStatus: that.data.airStatus,
              airMode: that.data.airMode,
              airValue: that.data.airValue,
              stamp: stamp,
              prove: md5.hex_md5(res.code + stamp + 'liuboge'),
            };
            wx.request({
              method: 'POST',
              url: 'https://www.supremeproger.com/hardware/air_condition/user/push',
              header: {
                'content-type': 'application/json'
              },
              data: JSON.stringify(air_jsonData),
              success: function (res) {
                console.log('air---', res);
                var air_jsonStr = res.data;
                if (md5.hex_md5('air_conditioning' + air_jsonStr.stamp + 'liuboge' == air_jsonStr.tableProve)) {
                  var air_errorcode = air_jsonStr.errorcode;
                  switch (air_errorcode) {
                    case "0":
                      wx.showToast({
                        title: '吹风模式',
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
  chooseCold(e) {
    if (this.data.airStatus == 1) {
      var that = this
      that.setData({
        hotUI: '',
        windUI: '',
        coldUI: 'background-color: #aaaaaa;opacity: 0.8;',
        airMode: 2,
      })
      var stamp = util.formatTime(new Date());
      wx.login({
        success(res) {
          if (res.code) {
            var air_jsonData = {
              resCode: res.code,
              roomId:that.data.roomId,
              airStatus: that.data.airStatus,
              airMode: that.data.airMode,
              airValue: that.data.airValue,
              stamp: stamp,
              prove: md5.hex_md5(res.code + stamp + 'liuboge'),
            };
            wx.request({
              method: 'POST',
              url: 'https://www.supremeproger.com/hardware/air_condition/user/push',
              header: {
                'content-type': 'application/json'
              },
              data: JSON.stringify(air_jsonData),
              success: function (res) {
                console.log('air---', res);
                var air_jsonStr = res.data;
                if (md5.hex_md5('air_conditioning' + air_jsonStr.stamp + 'liuboge' == air_jsonStr.tableProve)) {
                  var air_errorcode = air_jsonStr.errorcode;
                  switch (air_errorcode) {
                    case "0":
                      wx.showToast({
                        title: '制冷模式',
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
    if (that.data.airStatus == 1) {
      that.setData({
        hotUI: '',
        windUI: '',
        coldUI: '',
        airStatus: 0,
      })
      var stamp = util.formatTime(new Date());
      wx.login({
        success(res) {
          if (res.code) {
            var air_jsonData = {
              resCode: res.code,
              roomId:that.data.roomId,
              airStatus: that.data.airStatus,
              airMode: that.data.airMode,
              airValue: that.data.airValue,
              stamp: stamp,
              prove: md5.hex_md5(res.code + stamp + 'liuboge'),
            };
            wx.request({
              method: 'POST',
              url: 'https://www.supremeproger.com/hardware/air_condition/user/push',
              header: {
                'content-type': 'application/json'
              },
              data: JSON.stringify(air_jsonData),
              success: function (res) {
                console.log('air---', res);
                var air_jsonStr = res.data;
                if (md5.hex_md5('air_conditioning' + air_jsonStr.stamp + 'liuboge' == air_jsonStr.tableProve)) {
                  var air_errorcode = air_jsonStr.errorcode;
                  switch (air_errorcode) {
                    case "0":
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
    }else{
      that.setData({
        hotUI: 'background-color: #aaaaaa;opacity: 0.8;',
        windUI: 'background-color: #aaaaaa;opacity: 0.8;',
        coldUI: 'background-color: #aaaaaa;opacity: 0.8;',
        airStatus: 1,
      })
      var stamp = util.formatTime(new Date());
      wx.login({
        success(res) {
          if (res.code) {
            var air_jsonData = {
              resCode: res.code,
              roomId:that.data.roomId,
              airStatus: that.data.airStatus,
              airMode: that.data.airMode,
              airValue: that.data.airValue,
              stamp: stamp,
              prove: md5.hex_md5(res.code + stamp + 'liuboge'),
            };
            wx.request({
              method: 'POST',
              url: 'https://www.supremeproger.com/hardware/air_condition/user/push',
              header: {
                'content-type': 'application/json'
              },
              data: JSON.stringify(air_jsonData),
              success: function (res) {
                console.log('air---', res);
                var air_jsonStr = res.data;
                if (md5.hex_md5('air_conditioning' + air_jsonStr.stamp + 'liuboge' == air_jsonStr.tableProve)) {
                  var air_errorcode = air_jsonStr.errorcode;
                  switch (air_errorcode) {
                    case "0":
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
  down(e){
    var that = this;
    if(that.data.airValue > 16){
      that.data({
        airValue: that.data.airValue-1,
        value: (that.data.airValue-1)*6.25,
        airContent: (that.data.airValue-1)*6.25
      })
      var stamp = util.formatTime(new Date());
      wx.login({
        success(res) {
          if (res.code) {
            var air_jsonData = {
              resCode: res.code,
              roomId:that.data.roomId,
              airStatus: that.data.airStatus,
              airMode: that.data.airMode,
              airValue: that.data.airValue,
              stamp: stamp,
              prove: md5.hex_md5(res.code + stamp + 'liuboge'),
            };
            wx.request({
              method: 'POST',
              url: 'https://www.supremeproger.com/hardware/air_condition/user/push',
              header: {
                'content-type': 'application/json'
              },
              data: JSON.stringify(air_jsonData),
              success: function (res) {
                console.log('air---', res);
                var air_jsonStr = res.data;
                if (md5.hex_md5('air_conditioning' + air_jsonStr.stamp + 'liuboge' == air_jsonStr.tableProve)) {
                  var air_errorcode = air_jsonStr.errorcode;
                  switch (air_errorcode) {
                    case "0":
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
  up(e){
    var that = this;
    if(that.data.airValue < 33){
      that.data({
        airValue: that.data.airValue+1,
        value: (that.data.airValue+1)*6.25,
        airContent: (that.data.airValue+1)*6.25
      })
      var stamp = util.formatTime(new Date());
      wx.login({
        success(res) {
          if (res.code) {
            var air_jsonData = {
              resCode: res.code,
              roomId:that.data.roomId,
              airStatus: that.data.airStatus,
              airMode: that.data.airMode,
              airValue: that.data.airValue,
              stamp: stamp,
              prove: md5.hex_md5(res.code + stamp + 'liuboge'),
            };
            wx.request({
              method: 'POST',
              url: 'https://www.supremeproger.com/hardware/air_condition/user/push',
              header: {
                'content-type': 'application/json'
              },
              data: JSON.stringify(air_jsonData),
              success: function (res) {
                console.log('air---', res);
                var air_jsonStr = res.data;
                if (md5.hex_md5('air_conditioning' + air_jsonStr.stamp + 'liuboge' == air_jsonStr.tableProve)) {
                  var air_errorcode = air_jsonStr.errorcode;
                  switch (air_errorcode) {
                    case "0":
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
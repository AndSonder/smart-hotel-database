// pages/index/index.js
var app = getApp();
import mqtt from '../utils/mqtt.js';
var md5 = require('../utils/md5.js');
const host = 'wxs://www.supremeproger.com/mqtt';
Page({
  data: {
    gradientColor: {
      '0%': '#ffd01e',
      '100%': '#ee0a24'
    },
    roomID: '',
    roomTemperature: '',
    roomHumidity: '',
    airTemperature:'',
    airStatus: '',
    airPattern:'',
    ledLight:'',
    ledStatus:'',
    subTopic_1: '',
    adjustStatus:0,
    key:'',
    value: {
      humlogo: '/images/humd.png',
      humvalue: 0,
      temlogo: '/images/temp.png',
      temvalue: 0,
    },
    LampValue: [{
      Lamplogo: '/images/LED_gray.png',
      ButtonFlag: true,
    }],
    AirValue: [{
      Airlogo: '/images/air.png',
      AirSwitch: false,
      AirStatus: 'nature'
    }]
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    console.log(options);
    var subTopic_1_ = 'PEOPLE_' + '101';
    let key_ = options.id + "PEOPLEmaninthestreet";
    var key_1 = md5.hex_md5(key_);
    console.log(key_1)
    this.setData({
      roomID: options.id,
      ledLight:options.bright,
      ledStatus:options.ledStatus,
      roomTemperature: options.roomTemperature,
      roomHumidity: options.roomHumidity,
      airTemperature: options.airTemperature,
      airStatus: options.airStatus,
      airPattern:options.airPattern,
      subTopic_1: subTopic_1_,
      key:key_1,
    })
    //判断空调开关状态以决定模式
    if(options.airStatus == 'ON'){
      this.setData({
        "AirValue[0].AirSwitch": true,
      })
      switch(options.airPattern){
        case 'COOL':
          this.setData({
            "AirValue[0].AirStatus": 'cool',
            "AirValue[0].Airlogo": '/images/air_cool.png',
          })
          break;
        case 'NATURE':
          this.setData({
            "AirValue[0].AirStatus": 'nature',
            "AirValue[0].Airlogo": '/images/air_nature.png',
          })
          break;
        case 'HEAT':
          this.setData({
            "AirValue[0].AirStatus": 'warm',
            "AirValue[0].Airlogo": '/images/air_warm.png',
          })
      }
    }else{
      this.setData({
        'AirValue[0].AirSwitch': false,
        "AirValue[0].Airlogo": '/images/air.png',
      })
    }
    //判断灯的开关状态
    if(options.ledStatus == 'ON'){
      this.setData({
        'LampValue[0].ButtonFlag': false,
        "LampValue[0].Lamplogo": '/images/LED_red.png',
        adjustStatus:1,
      })
    }else{
      this.setData({
        'LampValue[0].ButtonFlag': true,
        "LampValue[0].Lamplogo": '/images/LED_gray.png',
        adjustStatus:0,
      })
    }
    
 
  },
  onChange(event) {
    console.log(event.detail);
  },
  onLamp: function (event) {
    wx.showToast({
      icon: 'none',
      title: `当前亮度等级：${event.detail}`,
    });
    app.globalData.bright = event.detail;
    if (app.data.client && app.data.client.connected&&this.data.adjustStatus == 1) {
      var info = new Object()
      info['8276e1aee751dbbc72cfdf1e9b1f129b'] = 'faa989c74ad023a468b999d5393b7780';
      info['478a67e87bb7c38888656bad3dcc04b1'] = event.detail;
      info['c050596fd74ef3d2325420a9f6e59da6'] = this.data.key;
      app.data.client.publish("PEOPLE_101", JSON.stringify(info), 1, false);
    } else {
      console.log(
        '请先连接服务器'
      )
    }
  },
  //调节空调温度
  onAir(event) {
    var that = this;
    console.log(that.data.airTemperature);
    if (event.detail > that.data.airTemperature) {
      this.setData({
        airTemperature: event.detail,
      })
      app.globalData.airTemperature = event.detail;
      if (app.data.client && app.data.client.connected) {//升温
        var info = new Object()
        info['8276e1aee751dbbc72cfdf1e9b1f129b'] = '0a56fe9a197d559acc6efca0ebd768b7';
        info['19e605b464ab6dda66f333921d34065a'] = '1a95a8ec55467c7bd1649de3096cbc49';
        info['c050596fd74ef3d2325420a9f6e59da6'] = that.data.key;
        app.data.client.publish("PEOPLE_101", JSON.stringify(info), 0, false);
      } else {
        console.log(
          '请先连接服务器'
        )
      }
    } else {
      that.setData({
        airTemperature: event.detail,
      })
      app.globalData.airTemperature = event.detail;
      if (app.data.client && app.data.client.connected) {//降温
        var info = new Object()
        info['8276e1aee751dbbc72cfdf1e9b1f129b'] = '0a56fe9a197d559acc6efca0ebd768b7';
        info['19e605b464ab6dda66f333921d34065a'] = 'd7228b627dd5efd0ccc1a46b99485d76';
        info['c050596fd74ef3d2325420a9f6e59da6'] =that.data.key;
        app.data.client.publish("PEOPLE_101", JSON.stringify(info), 0, false);
      } else {
        console.log(
          '请先连接服务器'
        )
      }
    }
  
  },


  AirControl: function (e) {
    if (!this.data.AirValue[0].AirSwitch) {
      this.setData({
        'AirValue[0].AirSwitch': true,
        "AirValue[0].Airlogo": '/images/air_nature.png',
      })
      app.globalData.airPattern = "NATURE";
      app.globalData.airStatus = "ON";
      if (app.data.client && app.data.client.connected) {
        var info = new Object()
        info['8276e1aee751dbbc72cfdf1e9b1f129b'] = '0a56fe9a197d559acc6efca0ebd768b7';
        info['675acff3d9441e5c0e1b0333000e8369'] = '1ae0e709f8c464612151ef4e9a82ab41';
        info['c050596fd74ef3d2325420a9f6e59da6'] =this.data.key;
        console.log(this.data.key)
        console.log(info)
        app.data.client.publish("PEOPLE_101", JSON.stringify(info), 0, false);
      } else {
        console.log(
          '请先连接服务器'
        )
      }
    } else {
      this.setData({
        'AirValue[0].AirSwitch': false,
        "AirValue[0].Airlogo": '/images/air.png',
      })
      app.globalData.airStatus = "OFF";
      if (app.data.client && app.data.client.connected) {
        var info = new Object()
        info['8276e1aee751dbbc72cfdf1e9b1f129b'] = '0a56fe9a197d559acc6efca0ebd768b7';
        info['675acff3d9441e5c0e1b0333000e8369'] = '89eab8a9179b10ae51e37294685a1da3';
        info['c050596fd74ef3d2325420a9f6e59da6'] =this.data.key;
        app.data.client.publish("PEOPLE_101", JSON.stringify(info), 0, false);
      } else {
        console.log(
          '请先连接服务器'
        )
      }
    }
  },
  clickCoolAir: function (e) {
    app.globalData.airPattern = "COOL";
    if (this.data.AirValue[0].AirSwitch) {
      if (this.data.AirValue[0].AirStatus != 'cool') {
        this.setData({
          "AirValue[0].AirStatus": 'cool',
          "AirValue[0].Airlogo": '/images/air_cool.png',
        })
        if (app.data.client && app.data.client.connected) {
          var info = new Object()
          info['8276e1aee751dbbc72cfdf1e9b1f129b'] = '0a56fe9a197d559acc6efca0ebd768b7';
          info['7ecfb285d06e3798f3d0c9165cbd61a0'] = 'fdd990ab0b92f64d79924fbc2590377b';
          info['c050596fd74ef3d2325420a9f6e59da6'] =this.data.key;
          app.data.client.publish("PEOPLE_101", JSON.stringify(info), 0, false);
        } else {
          console.log(
            '请先连接服务器'
          )
        }
      } else {
        this.setData({
          // "AirValue[0].AirStatus": 'nature',
         // "AirValue[0].Airlogo": '/images/air_nature.png',
        })
      }
    }
  },
  clickNatureAir: function (e) {
    app.globalData.airPattern = "NATURE";
    if (this.data.AirValue[0].AirSwitch) {
      if (this.data.AirValue[0].AirStatus != 'nature') {
        this.setData({
          "AirValue[0].AirStatus": 'nature',
          "AirValue[0].Airlogo": '/images/air_nature.png',
        })
        if (app.data.client && app.data.client.connected) {
          var info = new Object()
          info['8276e1aee751dbbc72cfdf1e9b1f129b'] = '0a56fe9a197d559acc6efca0ebd768b7';
          info['7ecfb285d06e3798f3d0c9165cbd61a0'] = '8c8f31cd23b773a891024035c1706f2c';
          info['c050596fd74ef3d2325420a9f6e59da6'] =this.data.key;
          app.data.client.publish("PEOPLE_101", JSON.stringify(info), 0, false);
        } else {
          console.log(
            '请先连接服务器'
          )
        }
      } else {
        this.setData({
          // "AirValue[0].AirStatus": 'nature',
         // "AirValue[0].Airlogo": '/images/air_nature.png',
        })
      }
    }
  },
  clickWarmAir: function (e) {
    app.globalData.airPattern = "HEAT";
    if (this.data.AirValue[0].AirSwitch) {
      if (this.data.AirValue[0].AirStatus != 'warm') {
        this.setData({
          "AirValue[0].AirStatus": 'warm',
          "AirValue[0].Airlogo": '/images/air_warm.png',
        })
        if (app.data.client && app.data.client.connected) {
          var info = new Object()
          info['8276e1aee751dbbc72cfdf1e9b1f129b'] = '0a56fe9a197d559acc6efca0ebd768b7';
          info['7ecfb285d06e3798f3d0c9165cbd61a0'] = '7d795952f8a1530f5fbf2b544f26317a';
          info['c050596fd74ef3d2325420a9f6e59da6'] =this.data.key;
          app.data.client.publish("PEOPLE_101", JSON.stringify(info), 0, false);
        } else {
          console.log(
            '请先连接服务器'
          )
        }
      } else {
        this.setData({
          // "AirValue[0].AirStatus": 'nature',
         // "AirValue[0].Airlogo": '/images/air_nature.png',
        })
      }
    }
  },
  LampControl: function (e) {
    if (this.data.LampValue[0].ButtonFlag) {
      this.setData({
        'LampValue[0].ButtonFlag': false,
        "LampValue[0].Lamplogo": '/images/LED_red.png',
        adjustStatus:1,
      })
      app.globalData.ledStatus = "ON";
      if (app.data.client && app.data.client.connected) {
        var info = new Object()
        info['8276e1aee751dbbc72cfdf1e9b1f129b'] = 'faa989c74ad023a468b999d5393b7780';
        info['70ada932e71aad20270f3451a9ac98a9'] = '237d2c0656db7383b1fc77b1eea9a105';
        info['c050596fd74ef3d2325420a9f6e59da6'] = this.data.key;
        app.data.client.publish("PEOPLE_101", JSON.stringify(info), 0, false);
      } else {
        console.log(
          '请先连接服务器'
        )
      }
      // that.data.client.publish(that.data.topic.LampcontrolTopic, "TurnOn", {
      //   qos: 1
      // });
    } else {
      this.setData({
        'LampValue[0].ButtonFlag': true,
        "LampValue[0].Lamplogo": '/images/LED_gray.png',
        adjustStatus:0,
      })
      app.globalData.ledStatus = "OFF";
      if (app.data.client && app.data.client.connected) {
        var info = new Object()
        info['8276e1aee751dbbc72cfdf1e9b1f129b'] = 'faa989c74ad023a468b999d5393b7780';
        info['70ada932e71aad20270f3451a9ac98a9'] = '63eed23e0eb39b784fb338d0c101a13d';
        info['c050596fd74ef3d2325420a9f6e59da6'] = this.data.key;
        app.data.client.publish("PEOPLE_101", JSON.stringify(info), 0, false);
      } else {
        console.log(
          '请先连接服务器'
        )
      }
      // that.data.client.publish(that.data.topic.LampcontrolTopic, "TurnOff", {
      //   qos: 1
      // });
    }
  },

  //退房
  clickCheck: function(e){
    var that = this;
    wx.showModal({
      title: '',
      content: '是否确定退房',
      showCancel: true,
      cancelText: '拒绝',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#576B95',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.supremeproger.com/verification_2',
              data: {
                'wecharID':app.globalData.wecharID,
              },
              header: {
                'content-type': 'application/json'
              },
              success: (res) => {
                wx.removeStorage({
                  key: 'verification',
                  success:function(res){
                    console.log(res.data)
                  },
                })
              }
          })
        } else if (res.cancel) {
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
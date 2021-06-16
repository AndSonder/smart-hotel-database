import mqtt from '/pages/utils/mqtt.js';
var app = getApp();
App({
  globalData: {
    server_domain: "wss://www.supremeproger.com/mqtt",
    host: 'wxs://www.supremeproger.com/mqtt',
    room_info:[],         //房间基本信息
    roomTemperature: '',  //房间温度
    roomHumidity: '',     //房间湿度
    num: '',              //房间人数
    airTemperature: '',   //空调温度
    airStatus: '',        //空调开关状态
    airPattern: '',       //空调模式状态
    ledStatus: '',        //灯的开关状态
    bright: '',           //灯的亮度
    wecharID:false,         //预订用户的加密openID
    friroomID: '',        //来访用户的加密openID
  //nickName:'',          //来访用户的微信昵称
    navBarHeight: 0, // 导航栏高度
    menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
    topic:'', //房间号
  },
  data: {
    client: null,
    //记录重连的次数
    reconnectCounts: 0,
    //MQTT连接的配置
    options: {
      protocolVersion: 4, //MQTT连接协议版本
      clientId: Math.ceil(Math.random() * 10) * 10000,
      clean: false,
      password: 'Guet0215',
      username: 'ubuntu',
      reconnectPeriod: 1000, //1000毫秒，两次重新连接之间的间隔
      connectTimeout: 30 * 1000, //1000毫秒，两次重新连接之间的间隔
      resubscribe: true //如果连接断开并重新连接，则会再次自动订阅已订阅的主题（默认true）
    },

  },
  // 启动小程序时自动连接服务器
  onLaunch: function () {
    //加载房间基本信息
    wx.request({
      url: 'https://www.supremeproger.com/roominfo',
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        if (res.data.data != "") {
          this.globalData.room_info = res.data.data;
        }
      }
    })
    this.roomPost();
    var that = this;
    //开始连接
    this.data.client = mqtt.connect(this.globalData.host, this.data.options);
    this.data.client.on('connect', function (connack) {
      console.log('连接成功');
    })
    that.setNavBarInfo()
    //收到服务器发送的消息的回调
    that.data.client.on("message", function (topic, payload) {
      // 开始解析收到的python字符串
      var info = JSON.parse(payload);
      var device = info['8276e1aee751dbbc72cfdf1e9b1f129b'];
      that.globalData.topic = topic
      //判别mqtt字段名称
      switch (device) {
        case '0b92f84a68b615c435ac1cf2c4237222':  //T&W字段   T&W ==> PEOPLE and T&W ==> ALL
          let roomTemperature = info['83af065e2f500111328da91be3361872'];
          let roomHumidity = info['979a02b371a8c5be7ce7f71e4696ac3f'];
          that.globalData.roomTemperature = roomTemperature;
          that.globalData.roomHumidity = roomHumidity;
          break;
        case '5d5095854bf7006fc4100f2cb6520f0f':  //ERROR字段 CARMER ==> PEOPLE
          let carmerCode = info['2bc0feee86c167c0b38126545284b522'];
          let data = info['282a8f61deb60e237d579e84e52410ad'];
          wx.showToast({    
            title: data,
            icon: 'none',
        })
          break;
        case '0567fe766d2affaed84283750e0ea68d':  //IR字段    IR ==>PEOPLE
          let num = info['04064535f365116b5518992e7ea5ae79'];
          let action = info['5c3388045e8b442d86ee3866ce0a70b3'];
          that.globalData.num = num;
          that.globalData.action = action;
          console.log(that.globalData.num)
          break;
        case '0a56fe9a197d559acc6efca0ebd768b7':  //AIR字段   AIR ==> PEOPLE and AIR == >ALL
          let airTemperature = info['314d7941e84e91fcbec82ff587b1f399'];
          let airStatus = info['cb012e420d12c0badea30d426754bfb5'];
          let airPattern = info['6e0ebe1f718b0d20f70e7953142aeb8f'];
          that.globalData.airTemperature = airTemperature;
          that.globalData.airPattern = airPattern;
          if(airStatus == '53ce1f79ec026bb55e15bc7f6b6ab969'){
            that.globalData.airStatus = 'OFF';
          }else{
            that.globalData.airStatus = 'ON';
          }
          switch(airPattern){
            case 'f7beedb5320fc2c1bef3c4d07d7e4e4c':
            that.globalData.airPattern = 'nature';
            break;
            case '99ef072db061f69ff1038f84db116474':
            that.globalData.airPattern = 'cool';
            break;
            case '1a0691e7829597c7d9265c8d1d194621':
            that.globalData.airPattern = 'warm';
            break;
          }
          break;
        case 'faa989c74ad023a468b999d5393b7780':  //LED字段   LED ==> PEOPLE and LED ==> ALL
          let ledStatus = info['44770b5a68314487fbaee50f63b35e41'];
          let bright = info['478a67e87bb7c38888656bad3dcc04b1'];
          that.globalData.bright = bright;
          if(ledStatus == '53ce1f79ec026bb55e15bc7f6b6ab969'){
            that.globalData.airStatus = 'OFF';
          }else{
            that.globalData.airStatus = 'ON';
          }
          console.log(bright)
          break;
        case '7f0059f21051a55e639dd868902260b3':  //ENTER字段 SERVER ==> PEOPLE
          let friendCode = info['86e7318a5d4123362db9b910192ba74f'];
          let openID = info['5ed24c0c82feed200b23092faeb3e8df'];
          if (openID == that.globalData.wecharID) {
            console.log(that.globalData.friroomID)
            //好友来访弹窗
            wx.showModal({
              title: '',
              content: '您有好友来访，请求进入',
              showCancel: true,
              cancelText: '拒绝',
              cancelColor: '#000000',
              confirmText: '查看',
              confirmColor: '#576B95',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/enter/enter',
                  })
                } else if (res.cancel) {
                }
              },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
          break;
        case '5e37cc4cbde188a9bee17784182a6d63':  //PAY字段 PAY ==> PEOPLE
          let openid = info['63f4ef1b9a03b217b43be9ee622982dd'];
          let key = info['5e37cc4cbde188a9bee17784182a6d63'];
          that.globalData.money += 50;
          console.log(that.globalData.wecharID)
          if (openid == that.globalData.wecharID) {
            //支付弹窗
            wx.showModal({
              title: '支付',
              content: '您有一笔50元的消费，是否支付？',
              showCancel: true,
              cancelText: '否',
              cancelColor: '#000000',
              confirmText: '是',
              confirmColor: '#576B95',
              success: function (res) {
                if (res.confirm) {
                  wx.request({
                    method: "POST",
                    url: 'https://www.supremeproger.com/pay',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                      "openid": openid,
                      "money": 50,
                    }
                  })
                } else if (res.cancel) {
                }
              },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
          break;
      }

      //上传数据到rooms表

      console.log(" 收到 topic:" + topic + " , payload :" + payload);
    })
    //服务器连接异常的回调
    that.data.client.on("error", function (error) {
      console.log(" 服务器 error 的回调" + error)
    })
    //服务器重连连接异常的回调
    that.data.client.on("reconnect", function () {
      console.log(" 服务器 reconnect的回调")
    })
    //服务器连接异常的回调
    that.data.client.on("offline", function (errr) {
      console.log(" 服务器offline的回调")
    })
  },
  roomPost:function (){
  wx.request({
    method: "POST",
    url: 'https://www.supremeproger.com/rooms',
    data: {
      "roomID": this.globalData.topic.slice(7, 10),
      "peopleNum": this.globalData.peopleNum,
      "roomTemperature": this.globalData.roomTemperature,
      "roomHumidity": this.globalData.roomHumidity,
      "airTemperature": this.globalData.airTemperature,
      "airStatus": this.globalData.airStatus,
      "airPattern": this.globalData.airPattern,
      "wecharID": this.globalData.wecharID,
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: (res) => {
      console.log("上传到rooms：" + res)
    },
    fail: (res) =>{
      console.log (res);
    }
  })
  //eerrMsg: "request:fail timeout"setTimeout(this.roomPost,1000);
},
  setNavBarInfo () {
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    this.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    this.globalData.menuHeight = menuButtonInfo.height;
    },
    
})
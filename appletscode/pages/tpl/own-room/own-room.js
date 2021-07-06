// pages/tpl/own-room/own-room.js
var app = getApp();
var nowTime = require('../../utils/time.js');
Page({
  data: {
    loadLine:0,
    length: '',       //同一个用户预订的房间数目
    roomInfo: '',   
    nowTime:'',  //同一个用户预订的房间的房间信息
    hiddenName: true,//界面显示状态
    //界面图片信息
    value: {
      humlogo: '/images/humd.png',
      temlogo: '/images/temp.png',
      airlogo: '/images/air_.png',
    },
  },

    onShow:function (options){
      var that = this;
    
    if(!app.globalData.wecharID) {
      wx.showModal({
        content:'您还未预订房间，故房间数据不显示',
        showCancel: false,
        confirmText: '确认',
        confirmColor: '#576B95',
      })
    }
    //判断用户所预订的房间的预定时间范围是否包括当前时间，以此来决定是否显示房间
    var time = nowTime.formatTime(new Date());  //获取当前时间
    that.setData({
      nowTime:time,
    })
    //获取用户预订的房间信息
    wx.request({
      url: 'https://www.supremeproger.com/rooms',
      data: {
        "wecharID": app.globalData.wecharID,
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        var roominfo = res.data.data;
        var len = roominfo.length;
        that.setData({
          loadLine:1,
          roomInfo: roominfo,
          length: len,
        })
        for (var i = 0; i < that.data.length; i++) {
          wx.request({
            url: 'https://www.supremeproger.com/hiddenusers',
            data: {
              "time": that.data.nowTime,
              "roomID": that.data.roomInfo[i].id,
            },
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              if (res.data){
                that.setData({
                  hiddenName: false,
                })
              }else{
              }
            },
            fail: (res) =>{
              console.log(res)
              wx.showModal({
                content: '对不起，预订时间未到，部分房间数据未加载',
                showCancel: false,
                confirmText: '确认',
                confirmColor: '#576B95',
              })
            },
            complete:(res) =>{
              console.log(res)
            }
          })
      }
      },
      fail: function (err) {
        console.log('require fail', err);
      },
    })
  }, 

  //下拉刷新页面
  onPullDownRefresh: function(){ 
    //判断用户所预订的房间的预定时间范围是否包括当前时间，以此来决定是否显示房间
    var that = this;
    var time = nowTime.formatTime(new Date());  //获取当前时间
    that.setData({
      nowTime:time,
    })
    //获取用户预订的房间信息
    wx.request({
      url: 'https://www.supremeproger.com/rooms',
      data: {
        "wecharID": app.globalData.wecharID,
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        var roominfo = res.data.data;
        var len = roominfo.length;
        that.setData({
          loadLine: true,
          roomInfo: roominfo,
          length: len,
        })
        for (var i = 0; i < that.data.length; i++) {
        wx.request({
          url: 'https://www.supremeproger.com/hiddenusers',
          data: {
            "time": that.data.nowTime,
            "roomID": that.data.roomInfo[i].roomID,
          },
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
            if (res.data)
              that.setData({
                hiddenName: true,
              })
          },
          complete:function(res){
            wx.stopPullDownRefresh();
          }
        })
      }
      },
      fail: function (err) {
        // fail
        console.log('require fail', err);
      },
    })

  },
  //进入房间管理页面
  onroomClick: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '/pages/index/index?id=' + event.currentTarget.dataset.id  + "&roomTemperature=" + event.currentTarget.dataset.roomtemperature + "&roomHumidity=" + event.currentTarget.dataset.roomhumidity + "&airTemperature=" + event.currentTarget.dataset.airtemperature  + "&airStatus=" + event.currentTarget.dataset.airstatus + "&airPattern=" + event.currentTarget.dataset.airpattern + "&bright=" + event.currentTarget.dataset.bright + "&ledStatus=" + event.currentTarget.dataset.ledstatus,
    })
  },
})
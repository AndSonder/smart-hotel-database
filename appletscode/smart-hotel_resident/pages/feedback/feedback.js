const util = require('../../utils/util.js');
const dataTime = require('../../utils/dataTime.js');
const md5 = require('../../utils/md5.js');
const app = getApp()
var count = 8 //设置倒计时最大值
Page({
  data: {
    textareaBValue: '',
    buttonContent: '提交',
    countNum: '',
    buttonUI: 'cu-btn lg round shadow bg-cyanblue',
    buttonButton: false,
  },
  onLoad: function (options) {

  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },
  countdown(e) {
    var that = this;
    if (that.data.buttonContent == '提交') {
      var time = setInterval(function () {
        count--;
        that.setData({
          buttonContent: '撤销',
          countNum: count,
        })
        if (count == 0) {
          clearInterval(time); //到时间取消执行
          that.setData({
            buttonUI: 'cu-btn lg round shadow line-blue',
            buttonButton: true,
            countNum: '',
          })
          if (that.data.buttonContent == '撤销') {
            var stamp = util.formatTime(new Date());
            wx.login({
              success(res) {
                if (res.code) {
                  var feedback_jsonData = {
                    resCode: res.code,
                    message: that.data.textareaBValue,
                    message_time: stamp,
                    stamp: stamp,
                    prove: md5.hex_md5(res.code + stamp + 'liuboge'),
                  };
                  wx.request({
                    method: 'POST',
                    url: 'https://www.supremeproger.com/server/feedback/resident/post',
                    header: {
                      'content-type': 'application/json'
                    },
                    data: JSON.stringify(feedback_jsonData),
                    success: function (res) {
                      console.log('feedback---', res);
                      var feedback_jsonStr = res.data;
                      if (md5.hex_md5('user' + feedback_jsonStr.stamp + 'liuboge' == feedback_jsonStr.tableProve)) {
                        var feedback_errcode = feedback_jsonStr.errcode;
                        switch (feedback_errcode) {
                          case 0:
                            wx.showToast({
                              title: '提交成功',
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
        }
      }, 1000); //每1000毫秒执行一次
    }else{
      clearInterval(time);
      that.setData({
        buttonContent:'提交',
        countNum:''
      })
    }
  },
})
// pages/guidePage/guidePage.js
Page({

  data: {
    total_img_0: 1,
    value: [{
      back_0: 'https://corona-images2.obs.cn-north-4.myhuaweicloud.com/img/guide_3.jpg',
      back_1: 'https://corona-images2.obs.cn-north-4.myhuaweicloud.com/img/guide_4.jpg',
      back_2: 'https://corona-images2.obs.cn-north-4.myhuaweicloud.com/img/guidewords_1.png',
      back_3: 'https://corona-images2.obs.cn-north-4.myhuaweicloud.com/img/guidewords_2.png'
    }],
    disappear_0: {},
    display_0: {},
    display_1: {},
    display_2: {},
    slideupdisplay_0: {},
  },

  onLoad: function (options) {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
    })
    this.animation = animation
    wx.getStorage({
      key: "first",
      success: (res) => {
        wx.reLaunch({
          url: '/pages/home/home'
        })
      },
      fail: (res) => {
        console.log(res)
        //老式引导页动画
        // var a = setInterval(function () {
        //   this.setData({
        //     total_img_0: (this.data.total_img_0 - 0.01).toFixed(2),
        //   })
        //   console.log(this.data.total_img_0);
        //   if(this.data.total_img_0 == 0.00)
        //   { 
        //       clearInterval(a) 
        //       this.setData({
        //         "value[0].back_0": '/images/guide_2.jpg',
        //         total_img_0: 1,
        //         hiddenName:false,
        //       }) 
        //   }
        // }, 10)
        //新式引导页动画
        animation.opacity(1).step();
        this.setData({
          display_0: animation.export()
        })
        setTimeout(function () {
          animation.opacity(1).step();
          this.setData({
            display_1: animation.export()
          })
        }.bind(this), 1000)
        setTimeout(function () {
          animation.opacity(1).step();
          this.setData({
            display_2: animation.export()
          })
        }.bind(this), 1000)
        setTimeout(function () {
          animation.translateY(-120).step().opacity(1).step();
          this.setData({
            slideupdisplay_0: animation.export()
          })
        }.bind(this), 1100)
      },
    })
  },
  skip: function (e) {
    wx.setStorage({
      data: 'YES',
      key: 'first',
    })
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: "ease",
    })
    this.animation = animation
    setTimeout(function () {
    animation.opacity(0).step();
    this.setData({
      display_0: animation.export()
    })
  }.bind(this), 800)
    setTimeout(function () {
      animation.opacity(0).step();
      this.setData({
        display_1: animation.export()
      })
    }.bind(this), 400)
    setTimeout(function () {
      animation.opacity(0).step();
      this.setData({
        display_2: animation.export()
      })
    }.bind(this), 400)
    setTimeout(function () {
      animation.translateY(120).step().opacity(0).step();
      this.setData({
        slideupdisplay_0: animation.export()
      })
    }.bind(this), 500)
    setTimeout(function () {
      wx.reLaunch({
        url: '/pages/home/home'
      })
    }.bind(this), 1000)
  }
})
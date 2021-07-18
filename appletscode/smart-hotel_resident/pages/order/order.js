const util = require('../../utils/util.js');
const md5 = require('../../utils/md5.js');
const app = getApp()

Page({
  data: {
    userShow:false,
    orderList: [{
      "orderId": 123,
      "roomId": 101,
      "orderTime": "2020-05-17 18:55:49",
      "orderStatus": 0,
    }, {
      "orderId": 123,
      "roomId": 102,
      "orderTime": "2020-05-17 18:55:49",
      "orderStatus": 0,
    }, ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var identity_jsonData = {
            resCode: res.code,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/order/identity/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(identity_jsonData),
            success: function (res) {
              console.log('identity---', res);
              var identity_jsonStr = res.data;
              if (md5.hex_md5('room' + identity_jsonStr.stamp + 'liuboge' == identity_jsonStr.tableProve)) {
                var identity_errorcode = identity_jsonStr.errorcode;
                switch (identity_errorcode) {
                  case "0":
                    if (identity_jsonStr/datalist[0].identity == '5'){
                      that.setData({
                        userShow:true,
                      })
                    }
                    break;
                }
              }
            }
          })
        }
      }
    })
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var ordersinf_jsonData = {
            resCode: res.code,
            stamp: stamp,
            prove: md5.hex_md5(res.code+stamp+'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/order/ordersinf/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(ordersinf_jsonData),
            success: function (res) {
              console.log('ordersinf---', res);
              var ordersinf_jsonStr = res.data;
              if (md5.hex_md5('room' + ordersinf_jsonStr.stamp + 'liuboge' == ordersinf_jsonStr.tableProve)){}
              var ordersinf_errorcode = ordersinf_jsonStr.errorcode;
              switch (ordersinf_errorcode){
                case "0":
                  var orderList = that.IntordersInf(orderList_jsonStr.datalist)
                  var orderList = that.handleSameTypeList(orderList, 'orderTime', [])
                  console.log("orderList---",orderList)
                  that.setData({
                    orderList: orderList
                  })
                  break;
              }
            }
          })
        }
      }
    })
  },
  turnRoomList(e){
    wx.navigateTo({
      url: '/pages/roomlist/roomlist',
    })
  },
  turnOrderInf(e){
    wx.navigateTo({
      url: '/pages/orderInf/orderInf?orderId=' + e.currentTarget.dataset.orderId + "&roomId=" +  e.currentTarget.dataset.roomId + "&orderStatus=" + e.currentTarget.dataset.orderStatus,
    })
  },
  //订单数组分组
  handleSameTypeList(list, name, resultList) {
    var that = this;
    // 每一个类型的单独数组，注意此处不能return出每个sameTypeArr，
    // 因为递归的返回值只返回最后一次的值
    let sameTypeList = []
    let tagList = []
    let propVal = ''
    if (list.length > 0) {
      propVal = list[0][`${name}`].slice(0, 10)
      let tempList = []
      // 将含有相同的name属性值的对象push到此次遍历的list中，
      // 将其他的对象放入到tempList中，下次遍历
      list.forEach((item, key) => {
        if (item[`${name}`].slice(0, 10) === propVal) {
          sameTypeList.push(item)
        } else {
          tempList.push(item)
        }
        switch (item.orderStatus) {
          case 0:
            item.orderUI = "green"
            break;
          case 1:
            item.orderUI = "red"
            break;
          case 2:
            item.orderUI = "grey"
            break;
          case 3:
            item.orderUI = "blue"
            break;
        }
      })
      sameTypeList.forEach((item) => {
        item.orderTime = item.orderTime.slice(11, 16);
      })
      tagList.push(sameTypeList)
      resultList.push(tagList)
      resultList.forEach((item) => {
        item.orderTag = propVal.slice(2, 10);
      })
      list = tempList
      const orderlist = that.handleSameTypeList(list, name, resultList)
      return [{
        tag: orderlist[0].orderTag,
        orderArray: orderlist[0][0]
      }]
    } else {
      return resultList
    }
  },
  IntordersInf(arr){
    arr.forEach((item) => {
      item.orderId = Nunmber(item.orderId)
      item.roomId = Nunmber(item.roomId)
      item.orderStatus = Nunmber(item.orderStatus)
    })
    return arr
  },
})
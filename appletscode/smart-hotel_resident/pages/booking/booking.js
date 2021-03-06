const util = require('../../utils/util.js');
const dataTime = require('../../utils/dataTime.js');
const md5 = require('../../utils/md5.js');
const imgUrl = require('../../utils/image.js');
Page({
  data: {
    roomType: '',
    roomPrice: '',
    imgList: [],
    per_roominf_book: [],
    nameInputValue:'',
    sexInputValue:'',
    phoneInputValue:'',
    idCardInputValue:'',
    startTimeContent: '',
    endTimeContent: '',
    startTimeShow: false,
    endTimeShow: false,
    start_minDate: new Date(1990, 1, 1).getTime(),
    start_maxDate: new Date(2099, 12, 31).getTime(),
    start_currentDate: new Date().getTime(),
    end_minDate: new Date(1990, 1, 1).getTime(),
    end_maxDate: new Date(2099, 12, 31).getTime(),
    end_currentDate: new Date().getTime(),
    start_minHour: 6,
    start_maxHour: 15,
    end_minHour: 6,
    end_maxHour: 15,
  },
  onLoad: function (options) {
    var that = this;
    var startTimeContent = dataTime.msToDate(new Date().getTime()).justYear + '-' + options.startDate.replace('/','-') + ' 06:00'
    var endTimeContent = dataTime.msToDate(new Date().getTime()).justYear + '-' + options.endDate.replace('/','-') + ' 15:00'
    that.setData({
      roomType: options.roomType,
      roomPrice: options.roomPrice * 100,
      startDate: options.startDate,
      endDate: options.endDate,
      startTimeContent: startTimeContent,
      endTimeContent: endTimeContent,
    })
    console.log(options)
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var per_roominf_book_jsonData = {
            resCode: res.code,
            roomId: '',
            roomType: that.data.roomType,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          console.log(per_roominf_book_jsonData)
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/room/per_roominf/resident/get',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(per_roominf_book_jsonData),
            success: function (res) {
              console.log('per_roominf_book---', res);
              var per_roominf_book_jsonStr = res.data;
              if (md5.hex_md5('user' + per_roominf_book_jsonStr.stamp + 'liuboge' == per_roominf_book_jsonStr.tableProve)) {
                var per_roominf_book_errcode = per_roominf_book_jsonStr.errcode;
                switch (per_roominf_book_errcode) {
                  case 0:
                    console.log(per_roominf_book_jsonStr)
                    var per_roominf_book = that.IntroomInf(per_roominf_book_jsonStr.datalist)
                    var per_roominf_book = that.ChangeWindow(per_roominf_book, 'roomWindow')
                    var per_roominf_book = imgUrl.ImageNameGeneration(per_roominf_book)
                    that.setData({
                      per_roominf_book: per_roominf_book,
                    })
                    break;
                }
              }
            }
          })
        }
      }
    })
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
  onClose() {
    this.setData({
      startTimeShow: false,
      endTimeShow: false,
    });
  },
  onCancel(e) {
    this.setData({
      startTimeShow: false,
      endTimeShow: false,
    });
  },
  startTime_onConfirm(e) {
    this.setData({
      startTimeShow: false,
      startTimeContent: dataTime.msToDate(e.detail).hasTime,
    })
  },
  endTime_onConfirm(e) {
    this.setData({
      endTimeShow: false,
      endTimeContent: dataTime.msToDate(e.detail).hasTime,
    })
  },
  nameInput(e){
    this.setData({
      nameInputValue:e.detail.value,
    })
  },
  sexInput(e){
    this.setData({
      sexInputValue:e.detail.value,
    })
  },
  phoneInput(e){
    this.setData({
      phoneInputValue:e.detail.value,
    })
  },
  idCardInput(e){
    this.setData({
      idCardInputValue:e.detail.value,
    })
    console.log(e)
  },
  onSubmit(e){
    var that = this
    var stamp = util.formatTime(new Date());
    wx.login({
      success(res) {
        if (res.code) {
          var perinfoPush_jsonData = {
            resCode: res.code,
            name: that.data.nameInputValue,
            sex: that.data.sexInputValue,
            phone: that.data.phoneInputValue,
            idCard: that.data.idCardInputValue,
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          console.log(perinfoPush_jsonData)
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/user/perinfo/resident/post',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(perinfoPush_jsonData),
            success: function (res) {
              console.log('perinfoPush---', res);
              var perinfoPush_jsonStr = res.data;
              if (md5.hex_md5('user' + perinfoPush_jsonStr.stamp + 'liuboge' == perinfoPush_jsonStr.tableProve)) {
                var perinfoPush_errcode = perinfoPush_jsonStr.errcode;
                switch (perinfoPush_errcode) {
                  case 0:
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
          var perorderInfo_jsonData = {
            resCode: res.code,
            roomType: that.data.roomType,
            expLive: that.data.startTimeContent + ':00',
            expAway: that.data.endTimeContent + ':00',
            stamp: stamp,
            prove: md5.hex_md5(res.code + stamp + 'liuboge'),
          };
          wx.request({
            method: 'POST',
            url: 'https://www.supremeproger.com/order/perinfo/resident/post',
            header: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(perorderInfo_jsonData),
            success: function (res) {
              console.log('perorderInfo---', res);
              var perorderInfo_jsonStr = res.data;
              if (md5.hex_md5('order' + perorderInfo_jsonStr.stamp + 'liuboge' == perorderInfo_jsonStr.tableProve)) {
                var perorderInfo_errcode = perorderInfo_jsonStr.errcode;
                switch (perorderInfo_errcode) {
                  case 0:
                    wx.showToast({
                      title: '????????????',
                      icon: 'success',
                    })
                    break;
                }
              }
            }
          })
        }
      }
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //??????9
      sizeType: ['original', 'compressed'], //?????????????????????????????????????????????????????????
      sourceType: ['album','camera'], //???????????????
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '????????????',
      content: '??????????????????????????????',
      cancelText: '??????',
      confirmText: '??????',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  IntroomInf(arr){
    arr.forEach((item) => {
      item.roomId = Number(item.roomId)
      item.roomArea = Number(item.roomArea)
      item.maximum = Number(item.maximum)
      item.roomWindow = Number(item.roomWindow)
      item.roomPrice = Number(item.roomPrice)
      item.roomTemp = Number(item.roomTemp)
      item.roomHum = Number(item.roomHum)
    })
    return arr
  },
  ChangeWindow(arr, name) {
    arr.forEach((item) => {
      if (item[`${name}`] === 1) {
        item.roomWindow = '??????'
      } else {
        item.roomWindow = '??????'
      }
    })
    return arr
  },
})
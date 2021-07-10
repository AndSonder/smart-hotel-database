var app = getApp();
import mqtt from '../utils/mqtt.js';
var dateTimePicker = require('../utils/dateTimePicker.js');
var md5 = require('../utils/md5.js');
var nowTime = require('../utils/time.js');
const host = 'wxs://www.supremeproger.com/mqtt';


Page({
    data: {
        inputValue: '',
        dateTimeArray_: null,
        dateTime_: null,
        dateTimeArray: null,
        dateTime: null,
        startYear: 2020,
        endYear: 2999,
        openid: '', //预订用户的openID（加密）
        roomID: '', //当前房间
        startTime: '', //起始日期
        endTime: '', //终止日期
        starttime: '', //标准格式的起始日期
        endtime: '', //标准格式的终止日期
        disTime: [], //被预定的时间段
        confirm: false, //“确认身份”状态
        submitImage: false, //“提交照片”状态
        changeDateTime: false, //“选择日期”状态
        open: false, //侧边栏状态
        istoright: true, //侧边栏划出与否
        mark: 0, //原点x轴
        newmark: 0, //移动的最新点的x轴坐标
        imgSrc: '', //提交预订用户的图片路径
        server_domain: "wss://www.supremeproger.com/mqtt",
        subTopic: '', //用户端总接收主题DEVICE/101/+，
        subTopic_8_2: '',
        imageUrl: '',
        navBarHeight: app.globalData.navBarHeight, //导航栏高度
        menuBotton: app.globalData.menuBotton, //导航栏距离顶部距离
        menuHeight: app.globalData.menuHeight, //导航栏高度
    },
    onLoad: function (options) {
        wx.showModal({

            content: '点击左上角的菜单按钮或向右滑动屏幕，将会显示当前房间已被预订的时间段',
            showCancel: false,
            confirmText: '确认',
            confirmColor: '#576B95',

        })
        // 获取完整的年月日 时分秒，以及默认显示的数组
        var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        // 调用函数时，传入new Date()参数，返回值是日期和时间
        var time = nowTime.formatTime(new Date());
        // 再通过setData更改Page()里面的data，动态更新页面的数据
        var roomID = options.id;
        var subTopic = 'DEVICE' + '/' + roomID + '/+';
        var bookedTime = JSON.parse(options.bookedTime);
        this.setData({
            roomID: roomID,
            startTime: time,
            endTime: time,
            disTime: bookedTime,
            subTopic: subTopic,
            dateTimeArray: obj.dateTimeArray,
            dateTime: obj.dateTime,
            dateTimeArray_: obj.dateTimeArray,
            dateTime_: obj.dateTime,
        });
    },
    //导航栏返回
    navigation_back: function (e) {
        wx.navigateBack({
            delta: 1
        })
    },
    // 点击菜单栏图标
    tap_ch: function (e) {
        if (this.data.open) {
            this.setData({
                open: false
            });
        } else {
            this.setData({
                open: true
            });
        }
    },
    // touchstart事件
    tap_start: function (e) {
        // 把手指触摸屏幕的那一个点的 x 轴坐标赋值给 mark 和 newmark
        this.data.mark = this.data.newmark = e.touches[0].pageX;
    },
    // touchmove事件
    tap_move: function (e) {
        this.data.newmark = e.touches[0].pageX;

        // 手指从左向右移动
        if (this.data.mark < this.data.newmark) {
            this.istoright = true;
        }

        // 手指从右向左移动
        if (this.data.mark > this.data.newmark) {
            this.istoright = false;
        }
        this.data.mark = this.data.newmark;
    },
    // touchend事件
    tap_end: function (e) {
        this.data.mark = 0;
        this.data.newmark = 0;
        // 通过改变 opne 的值，让主页加上滑动的样式
        if (this.istoright) {
            this.setData({
                open: true
            });
        } else {
            this.setData({
                open: false
            });
        }
    },

    // 确认身份
    confirm: function (e) {
        wx.login({ //先调用 wx.login() 获取 临时登录凭证code 
            success: res => {
                const code = res.code //获取到用户临时登录凭证code 
                wx.request({ //发送请求
                    url: 'https://www.supremeproger.com/login?code=' + code, //携带code
                    success: (res) => { //返回node请求到的OpenID与session_key
                        const openid = res.data.openid;
                        var openid_1 = md5.hex_md5(res.data.openid);
                        console.log(openid_1);
                        this.setData({
                            openid: openid_1, //更新预订用户的openID（加密）
                        })
                        app.globalData.wecharID = this.data.openid; //设置预订用户openID的全局变量
                        wx.setStorageSync("openid", openid)
                        wx.showToast({ //身份确认弹窗
                            title: '身份确认成功',
                            icon: 'success',
                        })
                        this.setData({
                            confirm: true, //更新“确认身份”状态
                        })
                        if (app.data.client && app.data.client.connected) { //订阅用户端总接收主题DEVICE/101/+
                            app.data.client.subscribe(this.data.subTopic, function (err, granted) {
                                if (!err) {
                                    console.log(
                                        '订阅主题成功'
                                    )
                                    //console.log(granted);
                                } else {
                                    console.log(
                                        '订阅主题失败'
                                    )
                                }
                            })
                        } else {
                            console.log(
                                '请先连接服务器'
                            )
                        }
                    }
                })
            },
            fail: console.log
        })
    },

    //提交照片    
    submitImage: function (e) {
        var that = this;
        if (that.data.confirm) {
            var roomID = that.data.roomID;
            var openid = that.data.openid;
            wx.chooseImage({
                count: 1,
                sizeType: ['original'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    const tempFilePaths = res.tempFilePaths[0]
                    that.setData({
                        imgSrc: tempFilePaths
                    });
                    wx.uploadFile({
                        url: 'https://www.supremeproger.com/img', //服务器接口地址
                        filePath: tempFilePaths,
                        name: 'file',
                        formData: {
                            'roomID': roomID,
                            'openID': openid,
                        },
                        header: {
                            'content-type': 'multipart/form-data'
                        },
                        success: function (res) {
                            var data = res.data;
                            var key = roomID + 'PEOPLEmaninthestreet';
                            var key_1 = md5.hex_md5(key);
                            var openid = that.data.openid;
                            that.setData({
                                submitImage: true,
                            })
                            if (app.data.client && app.data.client.connected) {
                                // 开始构造json代码
                                var info = new Object()
                                info['1ea3eb97dd508731ca06285d6bbfc94d'] = that.data.roomID
                                info['8705b9962194d2baeca15d5a2a4e2ac1'] = that.data.startTime
                                info['587f10eaa985c73add1a5adaa4ade2c7'] = that.data.endTime
                                info['c050596fd74ef3d2325420a9f6e59da6'] = key_1;
                                app.data.client.publish('UPDATE', JSON.stringify(info), 0, false);
                                info['79b360f6b6af80e92e5623c6855433ec'] = that.data.roomID
                                info['63f4ef1b9a03b217b43be9ee622982dd'] = openid;
                                app.data.client.publish('PAY', JSON.stringify(info), 0, false);

                            } else {
                                console.log(
                                    '请先连接服务器'
                                )
                            }
                            console.log(res);
                        },
                        fail: function (e) {
                            console.log(e.stack);
                        }
                    })
                }
            })
        } else {
            wx.showToast({ //身份确认弹窗
                title: '请先确认身份',
                icon: 'none',
            })
        }
    },

    //选择起始时间
    changeDateTime_: function (e) {
        this.setData({
            dateTime_: e.detail.value
        });
        var arr_ = this.data.dateTime_,
            dateArr_ = this.data.dateTimeArray_;
        arr_[e.detail.column] = e.detail.value;
        dateArr_[2] = dateTimePicker.getMonthDay(dateArr_[0][arr_[0]], dateArr_[1][arr_[1]]);
        var month = dateArr_[1][arr_[1]];
        var day = dateArr_[2][arr_[2]];
        var hours = dateArr_[3][arr_[3]];
        var minute = dateArr_[4][arr_[4]];
        var second = dateArr_[5][arr_[5]];
        var startTime = dateArr_[0][arr_[0]] + '-' + month + '-' + day + ' ' + hours + ':' + minute + ':' + second;
        var starttime = startTime.replace("-", "/");
        this.setData({
            dateTimeArray_: dateArr_,
            dateTime_: arr_,
            startTime: startTime,
            starttime: starttime,
        });
        if (this.data.endTime > this.data.startTime) {
            this.setData({
                changeDateTime: true,
            })
        }
        for (let i = 0; i < this.data.disTime.length; i++) {
            if (new Date(Date.parse(starttime)) >= new Date(Date.parse(this.data.disTime[i].StartTime)) && new Date(Date.parse(starttime)) <= new Date(Date.parse(this.data.disTime[i].EndTime))) {
                this.setData({
                    changeDateTime: false,
                })
                wx.showToast({ //时间选择重复错误提示框
                    title: '所选起始时间在他人预定时间内，请重新选择',
                    icon: 'none',
                })
            }
        }
    },

    //选择终止时间
    changeDateTime: function (e) {
        console.log(e)
        this.setData({
            dateTime: e.detail.value
        });
        var arr = this.data.dateTime,
            dateArr = this.data.dateTimeArray;
        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
        var month = dateArr[1][arr[1]];
        var day = dateArr[2][arr[2]];
        var hours = dateArr[3][arr[3]];
        var minute = dateArr[4][arr[4]];
        var second = dateArr[5][arr[5]];
        var endTime = dateArr[0][arr[0]] + '-' + month + '-' + day + ' ' + hours + ':' + minute + ':' + second;
        var endtime = endTime.replace("-", "/");
        this.setData({
            dateTimeArray: dateArr,
            dateTime: arr,
            endTime: endTime,
            endtime: endtime,
        });
        if (this.data.endTime > this.data.startTime) {
            this.setData({
                changeDateTime: true,
            })
        } else {
            wx.showToast({ //时间格式错误提示框
                title: '时间格式错误,请让起止时间小于结束时间',
                icon: 'none',
            })
        }
        for (let i = 0; i < this.data.disTime.length; i++) {
            if ((new Date(Date.parse(endtime)) >= new Date(Date.parse(this.data.disTime[i].StartTime)) && new Date(Date.parse(endtime)) <= new Date(Date.parse(this.data.disTime[i].EndTime))) || (new Date(Date.parse(Date.parse(this.data.starttime))) < new Date(Date.parse(this.data.disTime[i].StartTime)) && new Date(Date.parse(endtime)) >= new Date(Date.parse(this.data.disTime[i].StartTime)))) {
                this.setData({
                    changeDateTime: false,
                })
                wx.showToast({ //时间格式错误提示框
                    title: '所选时间段在他人预定时间段内，请重新选择',
                    icon: 'none',
                })
            }
        }
    },

    //提交
    submit: function (e) {
        var that = this;
        //     wx.request({
        //         method: "POST",
        //         url: 'http://123.56.2.196:8080/kexie/signOut',
        //        header :{
        //     // "Accept": "application/json, text/plain, */*",
        //     // "Cache-Control": "no-cache",
        //     // "Connection": "keep-alive",
        //     "Content-Type": "application/json;charset=UTF-8",
        //      //"Host": "123.56.2.196:8080",
        //     // "Origin": "http://123.56.2.196:8080",
        //     // "Referer": "http://123.56.2.196:8080/",
        //     // "User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50"

        // },
        //         data: {
        //             'userId': 1900301229

        //         },
        //           success:function(e){
        //         console.log(e)
        //     }
        //     })

        wx.setStorage({ //将加密后的openID存储在本地
            key: "verification",
            data: this.data.openid
        })
        if (!this.data.confirm && !this.data.submitImage && !this.data.changeDateTime) {
            wx.showToast({ //提交条件不满足提示框
                title: '请确认身份、提交照片、选择时间',
                icon: 'none',
            })
        }
        if (this.data.confirm && this.data.submitImage && !this.data.changeDateTime) {
            wx.showToast({ //提交条件不满足提示框
                title: '请正确选择时间',
                icon: 'none',
            })
        }
        if (this.data.confirm && this.data.submitImage && this.data.changeDateTime) {
            console.log("fffff") //向users路由提交预订用户的信息
            wx.showToast({ //提交确认弹窗
                title: '提交成功',
                icon: 'none',
            })
            wx.request({
                method: "POST",
                url: 'https://www.supremeproger.com/users',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                    "wecharID": that.data.openid,
                    "roomID": that.data.roomID,
                    "startTime": that.data.startTime,
                    "endTime": that.data.endTime,
                }
            })

            wx.navigateBack({
                delta: 1
            })
        }
    }
})
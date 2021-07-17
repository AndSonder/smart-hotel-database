const dataTime = require('./utils/dataTime.js');
App({
  globalData: {
    startDate: '',
    endDate:'',
    userInfo: null
  },
  onLaunch() {
    this.globalData.startDate = dataTime.msToDate(new Date().getTime()).justDate.replace('月','/').replace('日',''),
    this.globalData.endDate = dataTime.msToDate(new Date().getTime()).justendDate.replace('月','/').replace('日',''),
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
		if (capsule) {
		 	this.globalData.Custom = capsule;
			this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
		} else {
			this.globalData.CustomBar = e.statusBarHeight + 50;
		}
      }
    })
  },
  
})

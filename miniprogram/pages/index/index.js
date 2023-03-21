//index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now: {
      temp: '0',
      icon: '100',
      locationID: ''
    },
    avatarUrl: '../../images/avatar.jpg',
    nickName: '一典法用户'
  },
  totiaowen() {
    wx.navigateTo({
      url: '/pages/tiaowenkind/tiaowenkind',
    })
  },
  tobanner(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/bannerindex/bannerindex?id=' + e.currentTarget.dataset.id,
    })
  },
  totoy() {
    wx.navigateTo({
      url: '/pages/toy/toy',
    })
  },
  toquestion() {
    wx.navigateTo({
      url: '/pages/questionkind/questionkind',
    })
  },
  toshoucang() {
    wx.navigateTo({
      url: '/pages/shoucang/shoucang',
    })
  },
  getweather() {
    console.log(app.globalData.userInfo)
    wx.cloud.database().collection('locationID').where({
        city: app.globalData.userInfo.city
      })
      .get({
        complete: res => {
          console.log("获取成功", res.data)
          this.data.locationID = res.data[0].Location_ID
          this.getweather_info();
        }
      })
  },
  getweather_info() {
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now',
      data: {
        location: this.data.locationID,
        key: 'key'//和风天气key
      },
      success: res => {
        console.log("获取成功", res)
        this.setData({
          now: res.data.now
        })
      }
    })
  },
  getbanner: function (e) {
    wx.cloud.database().collection('banner')
      .get()
      .then(res => {
        console.log("banner获取成功", res.data)
        this.setData({
          bannerlist: res.data
        })
      })
  },
  getinfo() {
    if (app.globalData.userInfo) {
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName
      })
      this.getweather();
    } else {
      wx.cloud.database().collection('_user')
        .where({
          _openid: this.openid
        })
        .get({
          complete: res => {
            console.log(res.data)
            app.globalData.userInfo = res.data[0]
            console.log(app.globalData.userInfo)
            this.setData({
              avatarUrl: app.globalData.userInfo.avatarUrl,
              nickName: app.globalData.userInfo.nickName
            })
            this.getweather();
          }
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    this.openid = await getApp().getOpenid()
    this.getbanner();
    this.getinfo();
    app.pingFang_Medium();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '读民法典吗，来这里啊~',
          path: '/pages/index/index',
          imageUrl: '../../images/share_tofriend.png',
        })
      }, 2000)
    })
    return {
      title: '读民法典吗，来这里啊~',
      path: '/pages/index/index',
      imageUrl: '../../images/share_tofriend.png',
      promise
    }
  }
})
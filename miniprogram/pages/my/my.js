// pages/my/my.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin: false,
  },
  /*
  getuser() {
    wx.cloud.database().collection('_user').where({
      _openid: this.openid
    }).get().then(res => {
      console.log(res)
      if (res.data.length == 0) {
        this.setData({
          islogin: true
        })
      } else {
        this.update()
      }
    })
  },
  */
  update() {
    if (app.globalData.userInfo) {
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName,
        province: app.globalData.userInfo.province,
        city: app.globalData.userInfo.city
      })
    }else{
      this.refreshlogin(true)
    }
  },
  to_aboutus: function () {
    wx.navigateTo({
      url: '/pages/aboutus/aboutus',
    })
  },
  toapi: function () {
    wx.navigateTo({
      url: '/pages/api/api',
    })
  },
  refreshlogin(islogin) {
    this.data.islogin = islogin
    this.setData({
      islogin: islogin
    })
  },
  addinfo() {
    wx.cloud.database().collection('_user').add({
        data: {
          avatarUrl: app.globalData.userInfo.avatarUrl,
          city: app.globalData.userInfo.city,
          province: app.globalData.userInfo.province,
          nickName: app.globalData.userInfo.nickName
        }
      })
      .then(res => {
        this.setData({
          islogin: false
        })
        this.update()
        wx.hideLoading();
      })
  },
  getUserInfo: function (event) {
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '业务需要',
      success: res => {
        wx.showLoading({
          title: '正在进入',
        })
        console.log(res)
        app.globalData.userInfo = res.userInfo
        this.addinfo();
      },
      fail: res => {
        wx.showModal({
          title: '警告',
          content: '您拒绝授权,请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击了“返回授权”');
            }
          }
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.openid = await getApp().getOpenid()
    this.update();
    //this.getuser();
    app.pingFang_regular();
    
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

  }
})
// pages/questionline/questionline.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wentilinelist: []
  },
  towenti: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '/pages/question/question?id=' + event.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {
    console.log(event)
    wx.setNavigationBarTitle({
      title: event.code +'编问题',
    })
    wx.cloud.callFunction({
      name: 'getquestionline',
      data: {
        code: event.code
      },
      complete: res => {
        console.log(res)
        this.setData({
          wentilinelist: res.result.data,
        })
      },
    })
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
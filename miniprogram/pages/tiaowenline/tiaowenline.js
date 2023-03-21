// pages/tiaowenline/tiaowenline.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tiaowenlinelist:[],
    code:''
  },
  totiaowen:function(event){
    console.log(event)
    wx.navigateTo({
      url: '/pages/tiaowen/tiaowen?id=' + event.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {
    console.log(event)
    this.data.code = event.code
    wx.setNavigationBarTitle({
      title: this.data.code +'编条文',
    })
    wx.cloud.callFunction({
      name:'gettiaowenline',
      data:{
        code:this.data.code
      },
      complete:res=>{
        console.log(res)
        this.setData({
          tiaowenlinelist:res.result.data
        })
      }
    })
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
// pages/toyindex/toyindex.js
const app = getApp();
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    imageslist:[],
    name:''
  },
  tomax(event) {
    console.log(event)
    wx.previewImage({
      current: event.currentTarget.dataset.url,
      urls: this.data.imageslist,
    })
  },
  tocopy() {
    let toyurl = this.data.url
    wx.setClipboardData({
      data: toyurl,
      success(res) {
        console.log('获取成功', res)
        wx.showToast({
          title: '复制成功，请前往浏览器下载',
          icon: 'none',
        })
      }
    })
  },
  async updateviewtimes(options) {
    let id = options.id
    await db.collection('toy').where({
        _id: id
      })
      .update({
        data: {
          viewtimes: _.inc(1)
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    this.updateviewtimes(options);
    console.log(options)
    db.collection('toy')
      .doc(options.id)
      .get({
        complete: res => {
          this.data.url = res.data.toyupdateID
          this.data.images = res.data.toyimage
          console.log(res.data)
          wx.setNavigationBarTitle({
            title: res.data.toyname,
          })
          this.setData({
            name:res.data.toyname,
            imageslist: this.data.images
          })
        }
      })
    app.loadface();
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
          title: this.data.name,
          path: '/pages/toyindex/toyindex?id='+this.data.id,
          imageUrl: '../../images/share_tofriend.png',
        })
      }, 2000)
    })
    return {
      title:this.data.name,
      path: '/pages/toyindex/toyindex?id='+this.data.id,
      imageUrl: '../../images/share_tofriend.png',
      promise
    }
  }
})
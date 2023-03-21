// pages/shoucang/shoucang.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooselaw: true,
    choosequestion: false,
    nothing: false,
    collectlawlist: [],
    collectquestionlist: [],
    collect: '',
    collectquestion: '',
    questionlength: '',
    lawlength: '',
    loading:true
  },
  refreshlaw(chooselaw) {
    this.data.chooselaw = chooselaw
    this.setData({
      chooselaw: chooselaw
    })
  },
  refreshloading(loading) {
    this.data.loading = loading
    this.setData({
      loading: loading
    })
  },
  refreshquestion(choosequestion) {
    this.data.choosequestion = choosequestion
    this.setData({
      choosequestion: choosequestion
    })
  },
  refreshnothing(nothing) {
    this.data.nothing = nothing
    this.setData({
      nothing: nothing
    })
  },
  tolaw() {
    if (this.data.lawlength == 0) {
      this.refreshnothing(true)
    } else {
      this.refreshnothing(false)
    }
    this.refreshlaw(true),
      this.refreshquestion(false)
  },
  toquestion() {
    if (this.data.questionlength == 0) {
      this.refreshnothing(true)
    } else {
      this.refreshnothing(false)
    }
    this.refreshquestion(true),
      this.refreshlaw(false)
  },
  getlawid() {
    wx.cloud.database().collection('collectlaw')
      .where({
        _openid: this.openid
      })
      .get()
      .then(res => {
        console.log("获取成功", res)
        this.data.lawlength = res.data.length
        this.refreshloading(false)
        if (this.data.lawlength !== 0) {
          this.data.collect = res.data
          this.getidlist();
        } else {
          this.refreshnothing(true)
        }
      })
      .catch(res => {
        console.log("获取失败", res)
      })
  },
  getquestionid() {
    wx.cloud.database().collection('collectquestion')
      .where({
        _openid: this.openid
      })
      .get()
      .then(res => {
        console.log("获取成功", res)
        this.data.questionlength = res.data.length
        if (this.data.questionlength !== 0) {
          this.data.collectquestion = res.data
          this.getquestionidlist();
        }
      })
      .catch(res => {
        console.log("获取失败", res)
      })
  },
  getquestionidlist() {
    for (let i in this.data.collectquestion) {
      let q_id = this.data.collectquestion[i].code
      wx.cloud.database().collection('questionline')
        .doc(q_id)
        .get()
        .then(res => {
          console.log("获取成功", res)
          this.data.collectquestionlist.push(res.data)
          console.log(this.data.collectquestionlist)
          this.setData({
            collectquestionlist: this.data.collectquestionlist
          })
        })
    }
  },
  getidlist() {
    for (let i in this.data.collect) {
      let id = this.data.collect[i].code
      wx.cloud.database().collection('lawline')
        .doc(id)
        .get({
          complete: res => {
            wx.hideLoading();
            console.log("获取成功", res)
            this.data.collectlawlist.push(res.data)
            console.log(this.data.collectlawlist)
            this.setData({
              collectlawlist: this.data.collectlawlist
            })
          }
        })
    }
  },
  totiaoW(event) {
    console.log(event)
    wx.navigateTo({
      url: '/pages/tiaowen/tiaowen?id=' + event.currentTarget.dataset.id,
    })
  },
  toquestionL(event) {
    console.log(event)
    wx.navigateTo({
      url: '/pages/question/question?id=' + event.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.openid = await getApp().getOpenid()
    this.getquestionid();
    this.getlawid();
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
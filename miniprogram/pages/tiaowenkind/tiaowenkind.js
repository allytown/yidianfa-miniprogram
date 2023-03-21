// pages/tiaowenkind/tiaowenkind.js
const datalist = require("../../utils/util")
const app = getApp();
const db = wx.cloud.database()
let issend = false
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchvalue: '',
    tiaowenlist: [],
    searchlist: [],
    input: ''
  },
  goback() {
    console.log(this.data)
    this.setData({
      searchvalue: '',
      input: ''
    })
  },
  tolawline(event) {
    console.log(event)
    wx.navigateTo({
      url: '/pages/tiaowen/tiaowen?id=' + event.currentTarget.dataset.id,
    })
  },
  searchvalue(event) {
    this.data.searchvalue = event.detail.value
    console.log(this.data)
    this.setData({
      searchvalue: this.data.searchvalue
    })
    if (issend) {
      return
    }
    issend = true;
    this.getseaarchlist();
    setTimeout(() => {
      issend = false;
    }, 300)
  },
  getlawline(e) {
    this.setData({
      tiaowenlist: datalist.tiaowenlist
    })
  },
  /*
  getlawline(e) {
    wx.cloud.callFunction({
        name: 'gettiaowen'
      })
      .then(res => {
        console.log("获取成功", res.result.data)
        let lawlist = res.result.data.map(item => {
          return item.code
        })
        console.log(lawlist)
        var obj = {},
          k, tiaowenlist = [];
        for (var i = 0, len = lawlist.length; i < len; i++) {
          k = lawlist[i];
          if (obj[k])
            obj[k]++
          else
            obj[k] = 1
        }
        console.log(obj)
        for (var o in obj) {
          tiaowenlist.push({
            group: o,
            count: obj[o]
          });
        }
        console.log(tiaowenlist)
        this.setData({
          tiaowenlist: tiaowenlist
        })
      })
  },*/
  totiaowenline: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '/pages/tiaowenline/tiaowenline?code=' + event.currentTarget.dataset.code,
    })
  },
  getseaarchlist() {
    db.collection('lawline')
      .where(_.or([{
        law: db.RegExp({
          regexp: this.data.searchvalue,
          options: 'i',
        })
      }, {
        note: db.RegExp({
          regexp: this.data.searchvalue,
          options: 'i',
        })
      }]))
      .limit(20)
      .get()
      .then(res => {
        console.log("获取成功", res)
        this.setData({
          searchlist: res.data
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlawline();
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
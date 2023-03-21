// pages/questionkind/questionkind.js
const datalist = require("../../utils/util")
const app = getApp();
const db = wx.cloud.database();
let issend = false
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchvalue: '',
    wentilist: [],
    searchlist_Q: [],
    input: ''
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
    this.getseaarchlist_Q();
    setTimeout(() => {
      issend = false;
    }, 300)
  },
  getseaarchlist_Q() {
    db.collection('questionline')
      .where(_.or([{
        answer: db.RegExp({
          regexp: this.data.searchvalue,
          options: 'i',
        })
      }, {
        title: db.RegExp({
          regexp: this.data.searchvalue,
          options: 'i',
        })
      }]))
      .limit(20)
      .get()
      .then(res => {
        console.log("获取成功", res)
        this.setData({
          searchlist_Q: res.data
        })
      })
  },
  getquestionline(e) {
    console.log(this.data)
    this.setData({
      wentilist: datalist.wentilist
    });
  },
  goback() {
    console.log(this.data)
    this.setData({
      searchvalue: '',
      input: ''
    })
  },
  /*
  getquestionline(e) {
    wx.cloud.callFunction({
        name: 'getquestion'
      })
      .then(res => {
        console.log("获取成功", res.result.data)
        let questionlist = res.result.data.map(item => {
          return item.code
        })
        console.log(questionlist)
        var obj = {},
          k, wentilist = [];
        for (var i = 0, len = questionlist.length; i < len; i++) {
          k = questionlist[i];
          if (obj[k])
            obj[k]++
          else
            obj[k] = 1
        }
        console.log(obj)
        for (var o in obj) {
          wentilist.push({
            line: o,
            count: obj[o]
          });
        }
        console.log(wentilist)
        this.setData({
          wentilist: wentilist
        })
      })
  },*/
  toquestionline(event) {
    console.log(event)
    wx.navigateTo({
      url: '/pages/question/question?id=' + event.currentTarget.dataset.id,
    })
  },
  towentiline: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '/pages/questionline/questionline?code=' + event.currentTarget.dataset.code,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getquestionline();
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
  onShow: function () {},

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
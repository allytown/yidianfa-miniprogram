// pages/question/question.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: false,
    question: '',
    questionlist: [],
    token: '',
    path: '',
    voice: '',
    loading: true,
    onplay: true
  },
  refreshloading(loading) {
    this.data.loading = loading
    this.setData({
      loading: loading
    })
  },
  refreshonplay(onplay) {
    this.data.onplay = onplay
    this.setData({
      onplay: onplay
    })
  },
  on_play: function (e) {
    if (this.data.onplay) {
      this.innerAudioContext = wx.createInnerAudioContext()
      this.innerAudioContext.src = this.data.path
      this.innerAudioContext.play();
      this.refreshonplay(false);
    } else {
      this.innerAudioContext.pause()
      this.innerAudioContext.onPause(() => {
        console.log("暂停")
        this.refreshonplay(true);
      })
    }
    this.innerAudioContext.onEnded(() => {
      console.log("结束")
      this.refreshonplay(true)
    })
    return
  },
  //合成语音
  cancel: function (e) {
    var content_a = this.data.voice;
    var tex = encodeURI(content_a);
    var tok = app.globalData.token
    var party = {
      tex: tex,
      tok: tok,
      cuid: "cuid",
      ctp: 1,
      lan: "zh",
      spd: 5,
      per: 1
    }
    var vc = [];
    for (var k in party) {
      vc.push(k + '=' + encodeURIComponent(party[k]))
    }
    console.log(vc)
    var vic = vc.join('&')
    console.log(vic)
    var url = "https://tsn.baidu.com/text2audio"
    wx.request({
      url: url,
      method: "POST",
      data: vic,
      responseType: 'arraybuffer',
      'Content-Type': 'application/x-www-form-urlencoded',
      complete: res => {
        console.log("语音合成完成", res)
        this.data.tt = wx.arrayBufferToBase64(res.data)
        console.log(this.data)
        const fs = wx.getFileSystemManager();
        const path = wx.env.USER_DATA_PATH + '/tts_' + new Date().getTime() + '.mp3';
        fs.writeFileSync(path, this.data.tt, 'base64')
        this.data.path = path
        console.log(this.data.path)
        this.refreshloading(false)
      }
    })
  },
  tocollect: function (event) {
    console.log(this.data)
    if (this.data.collected) {
      this.removetocollectquestion();
      wx.showToast({
        title: '取消收藏',
        icon: 'none',
      })
    } else {
      this.savetocollectquestion();
      wx.showToast({
        title: '已收藏',
        icon: 'none',
      })
    }
  },
  refreshcollected(collected) {
    this.data.collected = collected
    this.setData({
      collected: collected
    })
  },
  savetocollectquestion: function () {
    wx.cloud.database().collection('collectquestion')
      .add({
        data: {
          code: this.data.id,
          date: new Date()
        }
      })
      .then(res => {
        console.log("获取成功", res)
        this.refreshcollected(true)
      })
  },
  removetocollectquestion() {
    wx.cloud.database().collection('collectquestion')
    .where({
      code:this.data.id
    })
    .remove({
      success: this.refreshcollected(false)
    })
  },
  get_data: function (e) {
    wx.cloud.database().collection('questionline')
      .doc(this.data.id)
      .get({
        complete:res=>{
          console.log("获取成功", res)
        var title = res.data.title
        wx.setNavigationBarTitle({
          title: title,
        })
        var wenti = res.data.answer
        this.data.voice = `${title}${wenti}`
        console.log(this.data.voice)
        var questionlist = wenti.split("|");
        this.setData({
          questionlist: questionlist,
          question: title
        })
        this.cancel();
        }
      })
    wx.cloud.database().collection('collectquestion')
      .where({
        code: this.data.id,
        _openid: this.openid
      })
      .get()
      .then(res => {
        console.log("获取成功", res)
        if (res.data.length !== 0) {
          this.refreshcollected(true)
        } else {
          this.refreshcollected(false)
        }
      })
  },
  /*
  get_voic: async function (e) {
    const timeout = (s) => {
      return new Promise(function (resolve) {
        setTimeout(resolve, s)
      })
    }
    this.get_data();
    await timeout(500)
    this.cancel();
  },
  */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (event) {
    this.openid = await getApp().getOpenid()
    app.loadface();
    this.data.id = event.id
    this.get_data();
    app.pingFang_Medium();
    //this.get_voic();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus:['shareAppMessage','shareTimeline']
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
    this.data.path = ''
    this.innerAudioContext.stop();
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
          title: this.data.question,
          path: '/pages/question/question?id='+this.data.id,
          imageUrl: '../../images/share_tofriend.png',
        })
      }, 2000)
    })
    return {
      title:this.data.question,
      path: '/pages/question/question?id='+this.data.id,
      imageUrl: '../../images/share_tofriend.png',
      promise
    }
  }
})
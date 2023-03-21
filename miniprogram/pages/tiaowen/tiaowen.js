// pages/tiaowen/tiaowen.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    zhushi: true,
    nothing: false,
    guanlian: false,
    shoucang: false,
    tiaowenvalue: '',
    notevalue: '',
    relatedvalue: '',
    token: '',
    paths: '',
    zh_path: '',
    zh_voice: '',
    zh_loading: true,
    zh_onplay: true,
    loadings: true,
    onplays: true,
    tiaowenvoice: '',
  },
  refreshloadings(loadings) {
    this.data.loadings = loadings
    this.setData({
      loadings: loadings
    })
  },
  refreshnothing(nothing) {
    this.data.nothing = nothing
    this.setData({
      nothing: nothing
    })
  },
  refreshonplays(onplays) {
    this.data.onplays = onplays
    this.setData({
      onplays: onplays
    })
  },
  refreshzh_loading(zh_loading) {
    this.data.zh_loading = zh_loading
    this.setData({
      zh_loading: zh_loading
    })
  },
  refreshzh_onplay(zh_onplay) {
    this.data.zh_onplay = zh_onplay
    this.setData({
      zh_onplay: zh_onplay
    })
  },
  zh_cancel: function (e) {
    var content_a = this.data.zh_voice;
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
      success: res => {
        console.log("语音合成完成", res)
        this.data.tt = wx.arrayBufferToBase64(res.data)
        console.log(this.data)
        const fs = wx.getFileSystemManager();
        const zh_path = wx.env.USER_DATA_PATH + '/tts_' + new Date().getTime() + '.mp3';
        fs.writeFileSync(zh_path, this.data.tt, 'base64')
        this.data.zh_path = zh_path
        console.log(this.data.zh_path)
        this.refreshzh_loading(false);
      }
    })
  },
  cancels: function (e) {
    var content_a = this.data.tiaowenvoice;
    var tex = encodeURI(content_a);
    var tok = app.globalData.token
    var party = {
      tex: tex,
      tok: tok,
      cuid: "GZKtzZNGSphAkDmIZ5fK0spA",
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
      success: res => {
        console.log("语音合成完成", res)
        this.data.tt = wx.arrayBufferToBase64(res.data)
        console.log(this.data)
        const fs = wx.getFileSystemManager();
        const paths = wx.env.USER_DATA_PATH + '/tts_' + new Date().getTime() + '.mp3';
        fs.writeFileSync(paths, this.data.tt, 'base64')
        this.data.paths = paths
        console.log(this.data.paths)
        this.refreshloadings(false);
      }
    })
  },
  onzh_play: function (e) {
    this.innerAudioContexts.src = this.data.zh_path
    if (!this.data.onplays) {
      this.stop_play();
      this.innerAudioContexts.play();
      this.refreshzh_onplay(false);
    } else {
      this.innerAudioContexts.play();
      this.refreshzh_onplay(false);
    }
    this.innerAudioContexts.onEnded(() => {
      console.log("结束")
      this.refreshzh_onplay(true)
    })
    return
  },
  stop_play: function () {
    this.innerAudioContext.pause();
    this.innerAudioContext.onPause(() => {
      console.log("暂停")
      this.refreshonplays(true)
    })
  },
  stopzh_play: function () {
    this.innerAudioContexts.pause();
    this.innerAudioContexts.onPause(() => {
      console.log("暂停")
      this.refreshzh_onplay(true)
    })
  },
  on_play: function (e) {
    this.innerAudioContext.src = this.data.paths
    if (!this.data.zh_onplay) {
      this.stopzh_play();
      this.innerAudioContext.play();
      this.refreshonplays(false);
    } else {
      this.innerAudioContext.play();
      this.refreshonplays(false);
    }
    this.innerAudioContext.onEnded(() => {
      console.log("结束")
      this.refreshonplays(true)
    })
    return
  },
  /*
  get_voic: async function (e) {
    const timeout = (s) => {
      return new Promise(function (resolve) {
        setTimeout(resolve, s)
      })
    }
    this.get_datas();
    await timeout(500)
    this.cancels();
    this.zh_cancel();
    await timeout(1000)
    this.refreshloadings(false);
    this.refreshzh_loading(false);
  },
  */
  refreshshoucang(shoucang) {
    this.data.shoucang = shoucang
    this.setData({
      shoucang: shoucang
    })
  },
  refreshzhushi(zhushi) {
    this.data.zhushi = zhushi
    this.setData({
      zhushi: zhushi
    })
  },
  refreshguanlian(guanlian) {
    this.data.guanlian = guanlian
    this.setData({
      guanlian: guanlian
    })
  },
  tozhushi() {
    if (this.data.zh_voice == "") {
      this.refreshnothing(true)
    } else {
      this.refreshnothing(false)
    }
    this.refreshzhushi(true),
      this.refreshguanlian(false)
  },
  toguanlian() {
    if (this.data.related == "") {
      this.refreshnothing(true)
    } else {
      this.refreshnothing(false)
    }
    this.refreshguanlian(true),
      this.refreshzhushi(false)
  },
  toshoucang: function (event) {
    console.log(this.data)
    if (this.data.shoucang) {
      this.removetocollectlaw();
      wx.showToast({
        title: '取消收藏',
        icon: 'none',
      })
    } else {
      this.savetocollectlaw();
      wx.showToast({
        title: '已收藏',
        icon: 'none',
      })
    }
  },
  savetocollectlaw: function () {
    wx.cloud.database().collection('collectlaw')
      .add({
        data: {
          code: this.data.id,
          date: new Date()
        }
      })
      .then(res => {
        console.log("获取成功", res)
        this.refreshshoucang(true)
      })
  },
  removetocollectlaw() {
    wx.cloud.database().collection('collectlaw')
      .where({
        code: this.data.id
      })
      .remove({
        success: this.refreshshoucang(false)
      })
  },
  get_datas: function (e) {
    wx.cloud.database().collection('lawline')
      .doc(this.data.id)
      .get({
        complete: res => {
          console.log("获取成功", res)
          var tiaowen = res.data.law
          this.data.tiaowenvoice = tiaowen
          var tiaowenvalue = tiaowen.split("|");
          var note = res.data.note
          this.data.zh_voice = note
          if(this.data.zh_voice==""){
            this.refreshnothing(true)
          }
          wx.setNavigationBarTitle({
            title: res.data.lawnum,
          })
          console.log(this.data.zh_voice)
          var notevalue = note.split("|");
          this.data.related = res.data.related
          console.log(this.data.related)
          var relatedvalue = this.data.related.split("|");
          this.setData({
            title:res.data.title,
            tiaowenvalue: tiaowenvalue,
            notevalue: notevalue,
            relatedvalue: relatedvalue
          })
          this.cancels();
          this.zh_cancel();
        }
      })
    wx.cloud.database().collection('collectlaw')
      .where({
        code: this.data.id,
        _openid: this.openid
      })
      .get()
      .then(res => {
        console.log("获取成功", res)
        if (res.data.length !== 0) {
          this.refreshshoucang(true)
        } else {
          this.refreshshoucang(false)
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (event) {
    this.innerAudioContexts = wx.createInnerAudioContext()
    this.innerAudioContext = wx.createInnerAudioContext()
    this.openid = await getApp().getOpenid()
    this.data.id = event.id
    //this.get_voic();
    this.get_datas();
    app.loadface();
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
    this.innerAudioContext.stop();
    this.innerAudioContexts.stop();
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
          title: this.data.title,
          path: '/pages/tiaowen/tiaowen?id='+this.data.id,
          imageUrl: '../../images/share_tofriend.png',
        })
      }, 2000)
    })
    return {
      title:this.data.title,
      path: '/pages/tiaowen/tiaowen?id='+this.data.id,
      imageUrl: '../../images/share_tofriend.png',
      promise
    }
  }
})
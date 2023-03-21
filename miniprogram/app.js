//app.js
App({
  getCloudOpenid: async function () {
    return this.openid = this.openid || (await wx.cloud.callFunction({
      name: 'Getopenid'
    })).result.OPENID
  },
  getOpenid: async function () {
    (this.openid = this.openid || wx.getStorageSync('openid')) || wx.setStorageSync('openid', await this.getCloudOpenid())
    return this.openid
  },
  onLaunch: function () {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '有新版本哦，是否重启应用？',
              success: res => {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '已经有新版本了哦',
              content: '新版本已上线，请您删除当前小程序，重新搜索打开'
            })
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'yidianfa-4gnyc6a05146f0dc',
        traceUser: true,
      })
    }
    this.get_token();
    this.getuser();
    this.globalData = {}
  },
  getuser() {
    console.log(this)
    wx.cloud.database().collection('_user').where({
      _openid: this.openid
    })
    .get()
    .then(res => {
      this.globalData.userInfo=res.data[0]
      console.log(this.globalData.userInfo)
    })
  },
  //获取access_token
  get_token: function (e) {
    var grant_type = "client_credentials";
    var appkey = "appkey";//baidu语音合成appkey
    var appSecret = "appSecret";//baidu语音合成appsecret
    var url = "https://openapi.baidu.com/oauth/2.0/token";
    wx.request({
      url: url,
      data: {
        grant_type: grant_type,
        client_id: appkey,
        client_secret: appSecret
      },
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      complete: res => {
        this.globalData.token = res.data.access_token;
        console.log(this.globalData.token)
      }
    })
  },
  //自定义字体
  pingFang_regular() {
    try {
      wx.loadFontFace({
        family: 'pingFang-Regular',
        source: 'URL("https://7969-yidianfa-4gnyc6a05146f0dc-1305508075.tcb.qcloud.la/PingFang%20Regular.ttf?1617702018")',
        success(res) {
          console.log("获取成功", res)
        }
      })
    } catch (e) {
      console.log("获取失败", e)
    }
  },
  pingFang_bold() {
    try {
      wx.loadFontFace({
        family: 'pingFang-Bold',
        source: 'URL("https://7969-yidianfa-4gnyc6a05146f0dc-1305508075.tcb.qcloud.la/PingFang%20Bold.ttf?1617702057")',
        success(res) {
          console.log("获取成功", res)
        }
      })
    } catch (e) {
      console.log("获取失败", e)
    }
  },
  pingFang_Medium() {
    try {
      wx.loadFontFace({
        family: 'pingFang-Medium',
        source: 'URL("https://7969-yidianfa-4gnyc6a05146f0dc-1305508075.tcb.qcloud.la/PingFang%20Medium.ttf?1617702099")',
        success(res) {
          console.log("获取成功", res)
        }
      })
    } catch (e) {
      console.log("获取失败", e)
    }
  },
  loadface() {
    try {
      wx.loadFontFace({
        family: 'fangzhengkaiti',
        source: 'URL("https://7969-yidianfa-4gnyc6a05146f0dc-1305508075.tcb.qcloud.la/%E6%96%B9%E6%AD%A3%E6%A5%B7%E4%BD%93%E7%AE%80%E4%BD%93.TTF?1620030328")',
        success(res) {
          console.log("获取成功", res)
        }
      })
    } catch (e) {
      console.log("获取失败", e)
    }
  },
})
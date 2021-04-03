const app = getApp()

Page({
  data: {
    chatPeopleNum: 0,
    openId: '',
    avatarUrl: './user-unlogin.png',
    userInfo: null,
    logged: false,
    takeSession: false,
    requestResult: '',
    // chatRoomEnvId: 'release-f8415a',
    chatRoomCollection: 'chatroom',
    chatRoomGroupId: 'demo',
    chatRoomGroupName: '聊天室',

    // functions for used in chatroom components
    onGetUserInfo: null,
    getOpenID: null,
  },

  onLoad: function () {

      var that = this
      const db = wx.cloud.database()
      const _ = db.command
      //这是一个异步函数，更新再获取
      async function updateGet() {
        //先执行完await中的updat函数，才会执行查询get
        await db.collection('chatPeopleNum').doc('number').update({
          data: {
            // 表示指示数据库将字段自增 1
            num: _.inc(1)
          },
          success: function (res) {
            //console.log(res, '更新+1')
          }
        })

        db.collection('chatPeopleNum').doc('number').get({
          success: function (res) {
            // res.data 包含该记录的数据
            that.setData({
              chatPeopleNum: res.data.num
            })
            //console.log(res.data.num + 'res.data.num**********')
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
      updateGet()

    //console.log(this.data.chatPeopleNum+'+++++')

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

    this.setData({
      onGetUserInfo: this.onGetUserInfo,
      getOpenID: this.getOpenID,
    })

    wx.getSystemInfo({
      success: res => {
        console.log('system info', res)
        if (res.safeArea) {
          const {
            top,
            bottom
          } = res.safeArea
          this.setData({
            containerStyle: `padding-top: ${(/ios/i.test(res.system) ? 10 : 20) + top}px; padding-bottom: ${20 + res.windowHeight - bottom}px`,
          })
        }
      },
    })
  },
  onUnload: function () {
    // console.log(this.data.chatPeopleNum + '离开')
    // console.log('bye !')
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('chatPeopleNum').doc('number').update({
      data: {
        // 表示指示数据库将字段自增 1
        num: _.inc(-1)
      },
      success: function (res) {
        // console.log(res, '更新-1')
      }
    })

  },

  getOpenID: async function () {
    if (this.openid) {
      return this.openid
    }

    const {
      result
    } = await wx.cloud.callFunction({
      name: 'login',
    })
    //console.log(result.userInfo.openId, '====openid')
    this.setData({
      openId: result.userInfo.openId
    })

    return result.userInfo.openid
  },
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onShareAppMessage() {
    return {
      title: '一个网路聊天室，大家都能发言，你也来试试吧',
      path: '/pages/im/room/room',
    }
  },
})
// miniprogram/pages/boringTime/boringTime.js

var util = require('../util/util')
const imgUrl = require('../util/imgUrl')
var intervalArr = []
const imageUrl = imgUrl.boringFace
const myApi = require('../util/myApi')
/* myApi.doMsgSecCheck("约pao吗").then(res => {
  console.log(res) 
   if(res){
  console.log(666)
}else{
  console.log(555)
}  
}) */
/*var url = "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/No02.png?sign=8533a6fd448365729cee8c616a2ba8a2&t=1586325497"
 //myApi.doImgSecCheck(url)
  myApi.doImgSecCheck(url).then(res => {
  console.log(res) 
   if(res){
  console.log(666)
}else{
  console.log(555)
}  
}) */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boringTimeMax_cloud: 0,
    boringTimeMax: 0,
    boringTime: 0,
    startTime: 0,
    endTime: 0,
    time: 0,
    num: 0,
    imgUrl: imageUrl.sort(util.randomsort),
    userInfoImgUrl: imgUrl.userInfo
  },
  toTopList() {
    wx.navigateTo({
      url: '../boringTime/boringTopList/boringTopList',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  showMax() {

    var that = this
    var boringTimeMax = this.data.boringTimeMax
    const db = wx.cloud.database()
    //存在时延
    var boringTimeMax_cloud
    //存在时延 ,不是同步进行的，云端操作需要时间，本地操作会先完成
    //方法1是设置时延，但是时延时间不好确定
    //方法2是 异步函数

    //这是一个异步函数，获取再更新
    async function updateGet() {
      //先执行完await中的get函数，才会执行更新
      await db.collection('maxNum').doc('boringMax').get().then(res => {
        var maxCloud = res.data.maxNum
        if (boringTimeMax < maxCloud) {
          //iqMaxNum = res.data.maxNum
          // console.log('iqMaxNum > res.data.maxNum')
          boringTimeMax_cloud = maxCloud
          db.collection('maxNum').doc('boringMax').update({
            data: {
              maxNum: boringTimeMax
            },
            success: function (res) {
              console.log(res, '更新+1')
            }
          })
        } else {
          // console.log('iqMaxNum > res.data.maxNum')
          boringTimeMax_cloud = boringTimeMax
        }
        // console.log(maxCloud)
        //console.log(iqMaxNum)

      })

      if (boringTimeMax_cloud == boringTimeMax) {
        var content = '真棒！您已是全服最无聊的网友~'
      } else {
        var content = '全服最无聊：' + boringTimeMax_cloud
      }
      wx.showModal({
        title: 'SoBoring',
        content: content,
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#3CC51F',
      })
      that.setData({
        boringTimeMax_cloud
      })
    }
    updateGet()


  },
  bindtap(e) {
    clearInterval(this.data.num)
    // console.log(e)
  },
  bindtouchstart(e) {
    var that = this


    function ani() {
      that.animation.rotate(Math.random() * 720 - 360).step()
      that.animation2.rotate(Math.random() * 720 - 360).step()
      that.animation3.rotate(Math.random() * 720 - 360).step()

      that.setData({
        animation: that.animation.export(),
        animation2: that.animation2.export(),
        animation3: that.animation3.export(),

      })
    }
    var num = setInterval(ani, 500)
    intervalArr.push(num)

    this.setData({
      startTime: e.timeStamp,
      num
    })
    //console.log(this.data.num)
  },

  bindtouchend(e) {

    //把interval全部清除
    for (let index = 0; index < intervalArr.length; index++) {
      clearInterval(intervalArr[index])
    }


    var t1 = e.timeStamp - this.data.startTime
    var boringTimeMax = this.data.boringTimeMax
    var that = this
    const db = wx.cloud.database()

    if (boringTimeMax < t1) {
      boringTimeMax = t1
      this.setData({
        boringTimeMax
      })
        myApi.setTopList("fromBoringTime",boringTimeMax)
      //this.setTopList(boringTimeMax)
      wx.setStorageSync('boringTimeMax', boringTimeMax)
    }

    //this.setTopList(t1)
    this.setData({
      boringTime: t1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var boringTimeMax = wx.getStorageSync('boringTimeMax')
    if (boringTimeMax == '') {
      wx.setStorageSync('boringTimeMax', 0)
      boringTimeMax = 0
    }
    var isShowBoringModal = wx.getStorageSync('isShowBoringModal')
    if (isShowBoringModal === '') {
      wx.setStorageSync('isShowBoringModal', true)
      isShowBoringModal = true
    }
    if (isShowBoringModal) {
      wx.showModal({
        title: 'SoBoring',
        content: '无聊的时候就按住屏幕不要松手，左上角为您的最大无聊指数，按住屏幕的时间越长，指数越大。',
        cancelText: '不再提醒',
        confirmText: '我知道了',
        confirmColor: '#3CC51F',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.setStorageSync('isShowBoringModal', false)
          }
        },
        fail: function (res) {},
        complete: function (res) {},
      })
    }
    myApi.setTopList("fromBoringTime",boringTimeMax)

    this.setData({
      boringTimeMax
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation()
    this.animation2 = wx.createAnimation()
    this.animation3 = wx.createAnimation()
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
  // 分享回掉函数
  onShareAppMessage: function () {
    // 用户点击右上角分享  
    return {
      title: '咱们来比一比谁更无聊~', // 分享标题  
      desc: '我的无聊指数是' + this.data.boringTimeMax, // 分享描述  
      path: 'pages/boringTime/boringTime' // 分享路径  
    }
  },

})
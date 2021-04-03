// miniprogram/pages/boringTime/boringTopList/boringTopList.js
var imgUrl = require('../../util/imgUrl')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    no1:imgUrl.No1,
    no2:imgUrl.No2,
    no3:imgUrl.No3,
    defaultImg:imgUrl.boringFace[3],
    nickName: '张三',
    maxNum: 0,
    collectionData:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var collectionData ,that = this
try{
  wx.showLoading({
    title: '加载中',
  })
   //调用云函数获取数据
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'setTopList',
      // 传递给云函数的参数
      data: {
        type:'maxNum'
      },
      success: res => {
        console.log(res)
        collectionData =  res.result
        this.setData({
          collectionData
        })
        // output: res.result === 3
      },
      fail: err => {
        // handle error
      },
      complete: () => {
        // ...
      }
    })

}catch(e){
 wx.showToast({
   title: '抱歉，数据加载失败',
   icon:'none'
 })

}finally{
  wx.hideLoading({
    complete: (res) => {},
  })
}
 
    //小程序端获取数据
 /*    const db = wx.cloud.database()
    db.collection('topList').orderBy('maxNum', 'desc').get().then(res => {
      // res.data 包含该记录的数据
      collectionData = res.data
      that.setData({
        collectionData
      })

      console.log(res.data)
    })
 */
    var isShowBoringTopListModal = wx.getStorageSync('isShowBoringTopListModal')
    if (isShowBoringTopListModal === '') {
      wx.setStorageSync('isShowBoringTopListModal', true)
      isShowBoringTopListModal = true
    }
    if (isShowBoringTopListModal) {
      wx.showModal({
        title: 'SoBoring',
        content: '在菜单->设置中获取您的网名和头像，以便参与无聊排行榜',
        cancelText: '不再提醒',
        confirmText: '我知道了',
        confirmColor: '#3CC51F',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.setStorageSync('isShowBoringTopListModal', false)
          }
        },
        fail: function (res) {},
        complete: function (res) {},
      })
    }
    

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
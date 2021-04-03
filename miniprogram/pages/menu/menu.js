// miniprogram/pages/menu/menu.js
/* var re = /[\u4E00-\u9FA5]/g;
//g代表可多次匹配正则

var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
var txt = '你好，this is a test? 123456789'
var re1 = /\d/g; // 数字
var re2 = /[a-zA-Z]/g; //字母
var re3 = /[\u4e00-\u9fa5]/g; //汉字
//字符
var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
var len1 = 0,
  len2 = 0,
  len3 = 0,
  len4 = 0;
if (txt !== "") {
  if (txt.match(re1) != null) {
    len1 = (txt.match(re1)).length;
  }
  if (txt.match(re2) != null) {
    len2 = (txt.match(re2)).length;
  }
  if (txt.match(re3) != null) {
    len3 = (txt.match(re3)).length;
  }
  if (txt.match(reg) != null) {
    len4 = (txt.match(re3)).length;
  }
}
console.log(len1, len2, len3, len4)
 */

var result = parseInt(11111, 2).toString(8);

/* console.log((123&234).toString(2),'&&&')
console.log((123).toString(2))
console.log((234).toString(2))
console.log((89).toString(2))
console.log(123|234,' |')
console.log(123^234,' 异或')
console.log(~123,' 取反')
console.log((8>>1).toString(2),'++')

 */

//获取应用实例
const app = getApp()
const imgUrl = require('../util/imgUrl')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: imgUrl.menu_imgList
  },
  adLoad() {
    console.log('Banner 广告加载成功')
  },
  adError(err) {
    console.log('Banner 广告加载失败', err)
  },
  adClose() {
    console.log('Banner 广告关闭')
  },
  navigateTo: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var id = Number(e.currentTarget.id)
    switch (id) {
      case 0:
        wx.navigateTo({
          url: '../relative/relative',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../unitTransfer/unitTransfer',
        })
        break;

      case 6:
        wx.navigateTo({
          url: '../beijinghua/beijinghua',
        })
        break;
      case 5:
        wx.navigateTo({
          url: '../nameMade/nameMade',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../bmi/bmi',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../bodyTest/bodyTest',
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../resistance/resistance',
        })
        break;
      case 7:
        wx.navigateTo({
          url: '../iq/iq',
        })
        break;
      case 8:
        wx.navigateTo({
          url: '../bigWheel/bigWheel',
        })
        break;
      case 9:
        wx.navigateTo({
          url: '../iqGame/iqGame',
        })
        break;
      case 10:
        wx.navigateTo({
          url: '../solveFormula/solveFormula',
        })
        break;
      case 11:
        wx.navigateTo({
          url: '../petAge/petAge',
        })
        break;
      case 12:
        wx.navigateTo({
          url: '../boringTime/boringTime',
        })
        break;
      case 13:
        wx.navigateTo({
          url: '../counter/counter',
        })
        break;
/*       case 14:
        wx.navigateTo({
          url: '../qrCode/qrCode',
        })
        break; */
      case 14:
        wx.navigateTo({
          url: '../setting/setting',
        })
        break;
/*         case 15:
          wx.navigateToMiniProgram({
            appId: 'wxaf60970efe7d982d',
            path: 'pages/map/map',
            envVersion: 'release',
            success(res) {
              console.log(res)
              // 打开成功
            }
          })
          break;  */
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    return {
      title: '一起来玩超级计算器T3000叭~',
      path: '/pages/menu/menu',
      success: function (res) {
        console.log('成功进入分享==========', res);

      },
      fail: function (res) {
        console.log('进入分享失败==========', res);
      }
    }
  },
})
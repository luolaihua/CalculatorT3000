// miniprogram/pages/qrCode/qrCode.js
var wxbarcode = require('../util/wxbarcode');

function utf16to8(str) {
  var out, i, len, c;
  out = "";
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    }
  }
  return out;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: ''

  },
  inputText: function (e) {
    this.setData({
      text: e.detail.value
    })
  },
  makeQrCode: function (e) {
    var text = this.data.text
    console.log(text)

    var test = utf16to8(text)
    const ctx = wx.createCanvasContext('qrcode')
    //wxbarcode.barcode('barcode', '12345678901234567', 680, 200);
    wxbarcode.qrcode('qrcode', test, 420, 420);
  },

  //保存到手机相册
  save: function () {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 500, //导出图片的宽
      height: 500, //导出图片的高
      destWidth: 500 * 750 / wx.getSystemInfoSync().windowWidth, //绘制canvas的时候用的是px， 这里换算成rpx ，导出后非常清晰
      destHeight: 500 * 750 / wx.getSystemInfoSync().windowWidth, //同上 px 换算成 rpx
      canvasId: 'qrcode',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        })
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '系统繁忙，请重试',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  onLoad: function () {

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
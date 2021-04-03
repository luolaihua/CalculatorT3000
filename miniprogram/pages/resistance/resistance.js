// miniprogram/pages/resistance/resistance.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    huan: '五环',
    colorId: '0',
    res: 0,
    percent: 0,
    c1: '红',
    c4: '绿',
    c3: '黄',
    c2: '橙',
    c5: '蓝',
    color1: 'red',
    color4: 'green',
    color3: 'yellow',
    color2: 'orange',
    color5: 'blue',
    colorArray: ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey', 'white', 'gold', 'silver'],
    colorArrayChinese: ['黑', '棕', '红', '橙', '黄', '绿', '蓝', '紫', '灰', '白', '金', '银'],
  

  },
  clear:function(e){
        //是否开启触摸反馈
        if (app.globalData.isVibrate) {
          wx.vibrateShort({
            complete: (res) => {},
          })
        }
    this.setData({
      huan: '五环',
      res: 0,
      percent: 0,
      c1: '红',
      c4: '绿',
      c3: '黄',
      c2: '橙',
      c5: '蓝',
      color1: 'red',
      color4: 'green',
      color3: 'yellow',
      color2: 'orange',
      color5: 'blue',
      colorId: '0'
    })
  },
  changeHuan: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    if (this.data.huan == '五环') {
      this.setData({
        huan: '四环'
      })
    } else {
      this.setData({
        huan: '五环'
      })
    }
  },
  equalBtn: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var c1 = this.data.colorArray.indexOf(this.data.color1)
    var c2 = this.data.colorArray.indexOf(this.data.color2)
    var c3 = this.data.colorArray.indexOf(this.data.color3)
    var c4 = this.data.colorArray.indexOf(this.data.color4)
    var c5 = this.data.colorArray.indexOf(this.data.color5)
    if(this.data.huan=='五环'){
          var res = (c3 + c2 * 10 + c1 * 100) * Math.pow(10, c4)
    }else{
      var res = (c2+ c1 * 10) * Math.pow(10, c4)
    }

    if (res >= 1000000) {
      res = res / 1000000 + 'M'
    } else if (res >= 1000) {
      res = res / 1000 + 'K'
    }
    var percent = 666
    switch (c5) {
      case 1:
        percent = 1
        break;
      case 2:
        percent = 2
        break;
      case 5:
        percent = 0.5
        break;
      case 6:
        percent = 0.25
        break;
      case 7:
        percent = 0.1
        break;
      case 10:
        percent = 5
        break;
      case 11:
        percent = 10
        break;
      default:
        break;
    }
    this.setData({
      res: res,
      percent: percent
    })
    //console.log(c1,c2,c3,c4,c5)
  },
  colorValue: function (e) {
    var id = e.currentTarget.id
    this.setData({
      colorId: id
    })
  },
  colorChoose: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var id = Number(e.currentTarget.id)
    switch (this.data.colorId) {
      case '0':
        this.setData({
          color1: this.data.colorArray[id],
          c1: this.data.colorArrayChinese[id]
        })
        break;
      case '1':
        this.setData({
          color2: this.data.colorArray[id],
          c2: this.data.colorArrayChinese[id]
        })
        break;
      case '2':
        this.setData({
          color3: this.data.colorArray[id],
          c3: this.data.colorArrayChinese[id]
        })
        break;
      case '3':
        this.setData({
          color4: this.data.colorArray[id],
          c4: this.data.colorArrayChinese[id]
        })
        break;
      case '4':
        this.setData({
          color5: this.data.colorArray[id],
          c5: this.data.colorArrayChinese[id]
        })
        break;

      default:
        break;
    }
    if (Number(this.data.colorId) < 4) {
      if (this.data.huan == '四环' && Number(this.data.colorId) == 1) {
        this.setData({
          colorId: (Number(this.data.colorId) + 2) + ''
        })
      } else {
        this.setData({
          colorId: (Number(this.data.colorId) + 1) + ''
        })
      }
    } else {
      this.setData({
        colorId: '0'
      })
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
       title: '这款计算器可以算色环电阻的阻值！',
       path: '/pages/resistance/resistance',
       success: function (res) {
          console.log('成功进入分享==========', res);

       },
       fail: function (res) {
          console.log('进入分享失败==========', res);
       }
    }
 },
})
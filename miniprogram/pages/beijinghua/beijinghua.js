// miniprogram/pages/beijinghua/beijinghua.js

var touchStartX = 0; //触摸时的原点 
var touchStartY = 0; //触摸时的原点 
var time = 0; // 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = ""; // 记录/清理时间记录 
var touchMoveX = 0; // x轴方向移动的距离
var touchMoveY = 0; // y轴方向移动的距离
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    lang: '北京话',
    language: ['北京话', '猫语', '狗语', '猪语', '公鸡语', '母鸡语', '鸭语', '老鼠语', '青蛙语', '羊语', '牛语', '虎语', 'giao语'],
    content: '',
    input: ''

  },
  switchLang: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var index = this.data.index
    var length = this.data.language.length
    if (length - 1 == index) {
      index = 0
    } else {
      index = index + 1
    }
    this.setData({
      index: index,
    })
  },
  //通过touchStart和touchEnd来控制长按的时间
  touchStart: function (e) {

    touchStartX = e.touches[0].pageX; // 获取触摸时的原点 
    touchStartY = e.touches[0].pageY; // 获取触摸时的原点 
    // 使用js计时器记录时间 
    interval = setInterval(function () {
      time++;
    }, 100);

  },
  // 触摸移动事件 
  touchMove: function (e) {
    touchMoveX = e.touches[0].pageX;
    touchMoveY = e.touches[0].pageY;
  },

  touchEnd: function (e) {
    //获取X和Y方向上的移动长度
    var moveX = Math.abs(touchMoveX - touchStartX);
    var moveY = Math.abs(touchMoveY - touchStartY)
    //console.log(moveX+"  Y: "+moveY)

    var index = this.data.index
    var length = this.data.language.length

    if (moveX <= moveY && touchMoveY != 0) { // 上下
      // 向上滑动
      if (touchMoveY - touchStartY <= -80 && time < 10) {
        //console.log("向上滑动" + touchMoveY + '  |  ' + touchStartY + 'up')

        if (index == length - 1) {
          index = 0
        } else {
          index = index + 1
        }

      }
      // 向下滑动 
      if (touchMoveY - touchStartY >= 80 && time < 10) {
        // console.log('向下滑动 ' + touchMoveY + '   |  ' + touchStartY);

        if (index == 0) {
          index = length - 1
        } else {
          index = index - 1
        }

      }
    } else if (touchMoveX != 0) { // 左右
      // 向左滑动
      if (touchMoveX - touchStartX <= -80 && time < 10) {
        //console.log("左滑页面" + touchMoveX + '  |  ' + touchStartX + 'left')
        if (index == 0) {
          index = length - 1
        } else {
          index = index - 1
        }

      }
      // 向右滑动 
      if (touchMoveX - touchStartX >= 80 && time < 10) {
        //  console.log('向右滑动' + touchMoveX + '  |  ' + touchStartX + 'left');

        if (index == length - 1) {
          index = 0
        } else {
          index = index + 1
        }
      }
    }
    clearInterval(interval); // 清除setInterval 
    time = 0;
    this.setData({
      index: index,
    })
  },
  confirm: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var value = e.detail.value
    var content = ''


    switch (this.data.index) {
      case 0:
        for (var i = 0; i < value.length; i++) {
          content = content + value[i] + '儿'
        }
        break;
      case 1:
        content = this.transfer(value, '喵')
        break;
      case 2:
        content = this.transfer(value, '汪')
        break;
      case 3:
        content = this.transfer(value, '哼')
        break;
      case 4:
        content = this.transfer(value, '咯')
        break;
      case 5:
        content = this.transfer(value, '咯咯哒')
        break;
      case 6:
        content = this.transfer(value, '嘎')
        break;
      case 7:
        content = this.transfer(value, '吱')
        break;
      case 8:
        content = this.transfer(value, '呱')
        break;
      case 9:
        content = this.transfer(value, '咩')
        break;
      case 10:
        content = this.transfer(value, '哞')
        break;
      case 11:
        content = this.transfer(value, '嗷呜')
        break;
      case 12:
        content = this.transfer(value, 'giao ')
        break;

      default:
        break;
    }

    this.setData({
      content: content
    })
  },
  transfer: function (value, name) {
    var content = ''
    for (var i = 0; i < value.length; i++) {
      if (value[i] == ',' || value[i] == '？' || value[i] == '。' || value[i] == '；' ||
        value[i] == '，' || value[i] == '~' || value[i] == '’' || value[i] == '：' ||
        value[i] == '、' || value[i] == '！' || value[i] == '.' || value[i] == '?' ||
        value[i] == '!' || value[i] == ':' || value[i] == ' ' || value[i] == '\n' ||
        value[i] == '《' || value[i] == '》' || value[i] == '（' || value[i] == '）' ||
        value[i] == '“' || value[i] == '”' || value[i] == '(' || value[i] == ')' ||
        value[i] == '=' || value[i] == '-' || value[i] == '——' || value[i] == '_') {
        content = content + value[i]
      } else {
        var sound = ''
        for (let index = 0; index < Math.ceil(Math.random() * 5); index++) {
          sound = sound + name;
        }
        content = content + sound + '~'
      }

    }
    return content
  },
  clear: function (e) {
    this.setData({
      content: '',
      input: ''
    })
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
      title: '一款全能的翻译机~',
      path: '/pages/beijinghua/beijinghua',
      success: function (res) {
        console.log('成功进入分享==========', res);

      },
      fail: function (res) {
        console.log('进入分享失败==========', res);
      }
    }
  },
})
// miniprogram/pages/counter/counter.js
const imgUrl = require('../util/imgUrl')
const soundList = [
  'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E9%9B%B6.wav?sign=4dabc88dc83d3ef7056547a8702283e2&t=1582898316',
  'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E4%B8%80.wav?sign=3cc974e8c54918056ee064a9610cb392&t=1582898183',
  'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E4%BA%8C.wav?sign=6dd653c302b76d79ca4d84221894f683&t=1582898200',
  'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E4%B8%89.wav?sign=1336f5e7a4fe5e95dddbcbeb7a553407&t=1582898222',
  'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E5%9B%9B.wav?sign=899c4b724047e281a68097387ba3f60c&t=1582898235',
  'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E4%BA%94.wav?sign=955774279e60c65df3618b3a931014fd&t=1582898250',
  'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E5%85%AD.wav?sign=9d69018c5420b26dde0ca3208b185493&t=1582898264',
  'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E4%B8%83.wav?sign=70256ef35fec8b6a2eefa2baf5514f2f&t=1582898276',
  'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E5%85%AB.wav?sign=44b5d547f4f17f90e1b3101c54c74574&t=1582898289',
  'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/%E4%B9%9D.wav?sign=cf48b26372b64649379078de761983e6&t=1582898302'

]
const opSoundList = [
  'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/buuu.wav?sign=0d4b958ff643cb4143fc3d047bc7a5c1&t=1585492674',
  'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/duaaaa.wav?sign=95e17075faf1a8537c5b0723b55162d8&t=1585492700'

]

const innerAudioContext = wx.createInnerAudioContext()
const innerAudioContext2 = wx.createInnerAudioContext()
const innerAudioContext3 = wx.createInnerAudioContext()
//获取应用实例
const app = getApp()
var touchStartX = 0; //触摸时的原点 
var touchStartY = 0; //触摸时的原点 
var time = 0; // 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = ""; // 记录/清理时间记录 
var touchMoveX = 0; // x轴方向移动的距离
var touchMoveY = 0; // y轴方向移动的距离


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: imgUrl.counterImgList,
    num: 0,
    startTime: 0,
    endTime: 0,
    isOpen: false,
    isVibrate: false,
    whichSound: 0,
  },
  chooseSound: function (e) {
    wx.vibrateShort()
    var whichSound = this.data.whichSound
    if (whichSound < 2) {
      whichSound++
    } else {
      whichSound = 0
    }

    wx.setStorageSync('whichSound', whichSound)

    this.setData({
      whichSound
    })
    console.log(this.data.whichSound)
  },
  isVibrate: function (e) {
    wx.vibrateShort()
    var that = this
    var isVibrate = !this.data.isVibrate
    this.setData({
      isVibrate
    })
    wx.setStorageSync('isVibrate', isVibrate)
    if (isVibrate) {
      wx.onAccelerometerChange(function (res) {
        if (res.x > 1 || res.y > 1 || res.z > 1) { //偏移量为2时触发，有的使用1
          that.add()
        }
      });
      wx.showToast({
        title: '摇一摇计数开启',
        icon:'none'
      })
    } else {
      wx.showToast({
        title: '摇一摇计数关闭',
        icon:'none'
      })
      wx.offAccelerometerChange()

    }

  },
  help: function (e) {
    wx.vibrateShort()
    wx.showModal({
      title: '数数器',
      content: '(1)长按显示区域可归零\n(2)设置按钮区域向左滑动可隐藏\n(3)设置按钮区域向右滑动显示\n' +
        '(4)有两种语音模式可切换\n(5)摇一摇计数开启后，用力摇晃手机即可实现计数加一\n',
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#3CC51F',
      success(res) {},
      fail: function (res) {},
      complete: function (res) {},
    })

  },
  //通过touchStart和touchEnd来控制长按的时间
  touchStart: function (e) {
    this.setData({
      startTime: e.timeStamp
    })
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
    this.setData({
      endTime: e.timeStamp
    })
    var moveX = Math.abs(touchMoveX - touchStartX);
    var moveY = Math.abs(touchMoveY - touchStartY)
    //console.log(moveX+"  Y: "+moveY)

    if (moveX <= moveY && touchMoveY != 0) { // 上下
      // 向上滑动
      if (touchMoveY - touchStartY <= -120 && time < 10) {
        //console.log("向上滑动" + touchMoveY + '  |  ' + touchStartY + 'up')
      }
      // 向下滑动 
      if (touchMoveY - touchStartY >= 120 && time < 10) {
        //console.log('向下滑动 '+touchMoveY+ '   |  '+touchStartY);



      }
    } else if (touchMoveX != 0) { // 左右
      // 向左滑动
      if (touchMoveX - touchStartX <= -120 && time < 10) {
        //console.log("左滑页面"+touchMoveX+ '  |  '+touchStartX+'left')

        this.setData({
          isOpen: true
        })
      }
      // 向右滑动 
      if (touchMoveX - touchStartX >= 120 && time < 10) {
        //console.log('向右滑动'+touchMoveX+ '  |  '+touchStartX+'left');
        this.setData({
          isOpen: false
        })
      }
    }
    clearInterval(interval); // 清除setInterval 
    time = 0;
  },
  clear: function () {

    wx.vibrateShort({
      complete: (res) => {},
    })
    this.setData({
      num: 0,
    })
  },
  add: function (e) {
    var that = this
    var whichSound = this.data.whichSound
    wx.vibrateShort({
      complete: (res) => {},
    })
    var num = this.data.num + 1
    this.setData({
      num
    })

    //播放音乐
    if (whichSound == 1) {
      this.playOp(0)
    } else if (whichSound == 2) {
      this.playNum(num)
    }
  },
  sub: function () {
    var whichSound = this.data.whichSound
    wx.vibrateShort({
      complete: (res) => {},
    })
    var num = this.data.num
    if (this.data.num > 0) {
      num -= 1
    }
    this.setData({
      num: num
    })
    //播放音乐
    if (whichSound == 1) {
      this.playOp(1)
    } else if (whichSound == 2) {
      this.playNum(num)
    }
  },
  playNum: function (num) {
    if (num < 10) {
      innerAudioContext.src = soundList[num]
      innerAudioContext.play()
    } else if (num < 100) {
      var ge = num % 10
      var shi = parseInt(num / 10)
      innerAudioContext.src = soundList[shi]
      innerAudioContext.play()

      function playGe() {
        innerAudioContext2.src = soundList[ge]
        innerAudioContext2.play()
      }
      setTimeout(playGe, 400)
    } else if (num < 1000) {
      var ge = num % 10
      var shi = parseInt(num / 10) % 10
      var bai = parseInt(num / 100)

      innerAudioContext.src = soundList[bai]
      innerAudioContext.play()

      function playGe() {
        innerAudioContext2.src = soundList[ge]
        innerAudioContext2.play()
      }

      function playShi() {
        innerAudioContext3.src = soundList[shi]
        innerAudioContext3.play()
        setTimeout(playGe, 350)
      }
      setTimeout(playShi, 300)

    }


  },
  playOp: function (num) {
    innerAudioContext.src = opSoundList[num]
    innerAudioContext.play()

  },
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    //开启监听
    wx.startAccelerometer({
      interval: 'normal',
      success: function (res) {
        console.info(res);
      }
    });



    var isVibrate = wx.getStorageSync('isVibrate')
    if (isVibrate === '') {
      wx.setStorageSync('isVibrate', false)
      isVibrate = false
    }
    var whichSound = wx.getStorageSync('whichSound')
    if (whichSound == '') {
      wx.setStorageSync('whichSound', 0)
      whichSound = 0
    }


    this.setData({
      isVibrate,
      whichSound
    })




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
    var that = this
    if (this.data.isVibrate) {
      wx.onAccelerometerChange(function (res) {
        if (res.x > 1 || res.y > 1 || res.z > 1) { //偏移量为2时触发，有的使用1
          that.add()
        }
      });}
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.offAccelerometerChange()
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
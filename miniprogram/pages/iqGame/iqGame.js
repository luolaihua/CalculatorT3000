// miniprogram/pages/iqGame/iqGame.js
var util = require('../util/util')
const myApi = require('../util/myApi')
var bgm = wx.createInnerAudioContext()
bgm.loop = true
var dida = wx.createInnerAudioContext()
var success = wx.createInnerAudioContext()
var fail = wx.createInnerAudioContext()
var anjian = wx.createInnerAudioContext()
var countDownTime = 5
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade: '壹',
    rightPercent: 100,
    failNum: 0,
    isSound: false,
    isBGM: false,
    condition: 'noTap',
    isStart: false,
    ansArr: [0, 0, 0, 0, 0, 0],
    ans: 0,
    ans1: 11,
    ans3: 11,
    ans2: 11,
    num1: '?',
    num2: '?',
    operator: '+',
    successNum: 0,
    time: countDownTime, //倒计时初始值
    timer: '' //定时器编号，这个值可以传递给clearInterval来取消该定时

  },
  myAwards: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    if (this.data.isSound) {
      anjian.play()
    }

  },
  toInfo: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    if (this.data.isSound) {
      anjian.play()
    }
    wx.navigateTo({
      url: '../iqGame/iqGameInfo/iqGameInfo',
    })
    /*     if (this.data.isSound) {
          bgm.stop()
        } else {
          bgm.play()
        }
        this.setData({
          isSound: this.data.isSound ? false : true
        }) */
  },
  next: function (e) {

    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    if (this.data.condition == 'right') {
      var successNum = this.data.successNum + 1
      this.gradeMake(successNum)
      this.resetTime()
      this.startGame()
      this.setData({
        successNum: successNum
      })
    }

  },
  restart: function (e) {

    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }

    if (this.data.condition == 'wrong') {
      this.resetTime()
      this.startGame()
    }

  },
  answerBtn: function (e) {

    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var id = e.currentTarget.id
    var ans = this.data.ans
    var ansArr = this.data.ansArr
    var failNum = this.data.failNum
    var successNum = this.data.successNum


    if (this.data.time > 0 && this.data.condition == 'answering') {
      if (ans == ansArr[id]) {
        this.setData({
          condition: 'right',
          rightPercent: Math.floor((successNum + 1) / (successNum + 1 + failNum) * 1000) / 10

        })
        wx.setStorageSync('successNum', successNum + 1)
        myApi.setTopList("fromIqGame",successNum + 1)
        if (this.data.isSound) {
          success.play()
        }

      } else {
        this.setData({
          condition: 'wrong',
          failNum: failNum + 1,
          rightPercent: Math.floor((successNum) / (successNum + 1 + failNum) * 1000) / 10
        })
        wx.setStorageSync('failNum', failNum + 1)
        if (this.data.isSound) {
          fail.play()
        }
      }
    }

    clearInterval(this.data.timer)
  },
  startGame: function (e) {
    if (this.data.isSound) {
      anjian.play()
    }
    var that = this
    var isSound = this.data.isSound
    var successNum = this.data.successNum //关数
    var failNum = this.data.failNum
    let countDownNum = that.data.time; //倒计时
    var max = 10,
      min = 1,
      operator = '+'
    //根据关数处理取值区间
    if (successNum < 4) {
      max = 10 + successNum
      min = 1
    } else if (successNum < 8) {
      max = 20 + successNum
      min = 5
    } else if (successNum < 12) {
      max = 30 + successNum
      min = 10
    } else if (successNum < 16) {
      max = 50 + successNum
      min = 10
    } else if (successNum < 20) {
      max = 60 + successNum
      min = 10 + successNum
    } else if (successNum < 25) {
      max = 80 + successNum
      min = 10 + successNum
    } else if (successNum < 30) {
      max = 90 + successNum
      min = 10 + successNum
    } else if (successNum < 40) {
      max = 100 + successNum
      min = 50 + successNum
    } else {
      max = 200
      min = 100
    }


    var ansArr = [],
      i = 0
    var num1 = Math.floor(Math.random() * (max - min + 1) + min);
    var num2 = Math.floor(Math.random() * (max - min + 1) + min);
    if (num1 > num2) {
      var ans = num1 - num2
      operator = '-'
    } else {
      var ans = num1 + num2
    }
    while (i < this.data.ansArr.length - 2) {
      if (i % 2 == 0) {
        ansArr.push(ans + i)
      } else {
        ansArr.push(ans - i)
      }
      i++
    }
    ansArr.push(ans + 10)
    ansArr.push(ans - 10)
    ansArr.sort(util.randomsort)


    //-----------------------
    this.setData({
      operator: operator,
      condition: 'answering',
      isStart: true,
      ans: ans,
      ansArr: ansArr,
      num1: num1,
      num2: num2,
      timer: setInterval(
        function () {
          //开始倒计时，并且刷新data中的time数据
          countDownNum--;
          if (isSound) {
            dida.play()
          }
          that.setData({
            time: countDownNum
          });
          //如果时间为0则取消倒计时------
          if (countDownNum == 0) {
            clearInterval(that.data.timer)
            that.setData({
              isStart: false
            })
            if (that.data.condition != 'right') {
              that.setData({
                condition: 'wrong',
                failNum: failNum + 1,
                rightPercent: Math.floor((successNum) / (successNum + 1 + failNum) * 1000) / 10
              })
              wx.setStorageSync('failNum', failNum + 1)
              if (isSound) {
                fail.play()
              }
            }
          }
        }, 1000
      )
    })


  },
  resetTime: function (e) {
    clearInterval(this.data.timer)
    this.setData({
      time: countDownTime,
      isStart: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bgm.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/bgm3.wav?sign=dfe8e286abfcd1316a6b111172d28adf&t=1583983771'
    dida.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/dida.wav?sign=8fa6f6fcbb611066be095a51c13bf80f&t=1583983494'
    success.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/success.wav?sign=46b9e048e2de1401eb6a56af661700ca&t=1583986065'
    fail.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/duang.wav?sign=f7ddd538430936c353da1694e718c1d4&t=1583985538'
    anjian.src = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/wav/beng.wav?sign=b77ec195753a28f05d0adfe0278c93f8&t=1583997189'


 

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

    var successNum = wx.getStorageSync('successNum')
    var failNum = wx.getStorageSync('failNum')
    var isSound = wx.getStorageSync('isSound_game')
    var isBGM = wx.getStorageSync('isBGM'),
      grade
    countDownTime = wx.getStorageSync('downTime')

    //初始化榜单
    myApi.setTopList("fromIqGame",successNum)

    
    if (countDownTime == '') {
      wx.setStorageSync('downTime', 5)
      countDownTime = 5
    }
    if (isBGM == '') {
      wx.setStorageSync('isBGM', false)
      isBGM = false
    }
    if (isSound == '') {
      wx.setStorageSync('isSound_game', false)
      isSound = false
    }
    if (successNum == '') {
      wx.setStorageSync('successNum', 1)
      successNum = 1
    }
    if (failNum == '') {
      wx.setStorageSync('failNum', 0)
      failNum = 0
    }

    this.gradeMake(successNum)
    this.setData({
      isSound: isSound,
      isBGM: isBGM,
      grade: grade,
      time: countDownTime,
      successNum: successNum,
      rightPercent: Math.floor(successNum / (successNum + failNum) * 1000) / 10,
      failNum: failNum
    })


    if (isBGM) {
      bgm.play()
    } else {
      bgm.stop()
    }
  },
  gradeMake: function (successNum) {
    var grade
    switch (Math.ceil(successNum / 10)) {
      case 1:
        grade = '壹'
        break;
      case 2:
        grade = '贰'
        break;
      case 3:
        grade = '叁'
        break;
      case 4:
        grade = '肆'
        break;
      case 5:
        grade = '伍'
        break;
      case 6:
        grade = '陆'
        break;
      default:
        grade = '柒'
        break;
    }
    this.setData({
      grade: grade,
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
    bgm.stop()

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
      title: '我已经闯过了' + this.data.successNum + '关，看看你能过几关~',
      path: '/pages/solveFormula/solveFormula',
      success: function (res) {
        console.log('成功进入分享==========', res);

      },
      fail: function (res) {
        console.log('进入分享失败==========', res);
      }
    }
  },
})
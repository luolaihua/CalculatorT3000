// miniprogram/pages/beijinghua/beijinghua.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    index: 0,
    lang: '北京话',
    language: ['北京话', '猫语', '狗语', '猪语', '公鸡语', '母鸡语', '鸭语', '老鼠语', '青蛙语', '羊语', '牛语', '虎语', 'giao语'],
    content: '',
    input: '',
    name1: ['大', '小', '一', '二', '三', '四', '五', '六', '七', '八', '九',
      '十', '百', '千', '万',  '巨', '无', '有', '不', '真',
      '没', '可', '最', '会',  '两',  'giao', '太',
       '子', '超', '满', '猛', '萌', '呆', '傻',
    ],
    name2: ['炮',  '牛', '鸭', '瓜', '蛋', '火', '钢', '铁', '锤', '猫', 
      '波', 'giao', '红', '虎', '熊', '剩', '金', '木', '水', '火', '土', '银', '黑', '呆',
      '铜', '球', '鸟', '霸', '熊', '拽', '强', '鬼', '菊', '鱼', '羊', '马', , '超', '疯', '满', '猛', '萌',
      '狼', '龟', '鸟', '万', '千', '亿', '斤', '两', '吨', '顿', '条', '桶',
      '蛇', '兔', '鼠', '棒', '龙', '鸡', '嘴', '手', '脚', '拳', '皮', '头',
      '福', '贵', '吉', '祥', '意', '发', '财', '钱', '钞', '炸', '春', '夏',
      '秋', '冬', '香', '臭', '花', '草', '树', '坚', '硬', '雪', '雨', '枫', '风', '太',
      '上', '下', '左', '又', '右', '东', '南', '西', '北', '红', '黄', '白',
      '绿', '青', '蓝', '子', '紫', '电', '雷', '雨', '火', '钻', '来'
    ],

  },
  confirm: function (e) {

    var value = e.detail.value
    if (value == '') {
      wx.showToast({
        title: '请输入姓氏',
        icon: 'none'
      })
    } else {

      this.setData({
        name: value,
      })
      this.switchName()

    }


  },

  switchName: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var num1 = Math.floor(Math.random() * (this.data.name1.length - 1))
    var num2 = Math.floor(Math.random() * (this.data.name2.length - 1))
    var content = this.data.name + this.data.name1[num1] + this.data.name2[num2]
    //console.log(content,num1,num2)
    this.setData({
      content
    })

  },
  chooseIt: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    wx.showLoading({
      title: '安全检测中',
      mask: false,
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });
    var data = this.data.content == '' ? "时尚的网友" : this.data.content
    //调用云函数获取数据
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'databaseTest',
      // 传递给云函数的参数
      data: {
        requestType:'msgSecCheck',
        content: data
      },
      success: res => {
        wx.hideLoading();
        console.log(res)
        if (res.result) {
          wx.setStorage({
            key: 'nickName',
            data: data,
            success(res) {

              wx.showToast({
                title: '你好呀,' + data,
                icon: 'none',
              });
              setTimeout(res=>{
                wx.navigateBack({
                  delta: 1
                });
              },1000)
            }
          })
        } else {
          wx.showToast({
            title: '抱歉，该名称不符合安全规范，请重新选择',
            icon: 'none',
            image: '',
            duration: 2000,
            mask: false,
          });
        }
      },
      fail: err => {
        // handle error
        wx.hideLoading();
        wx.showToast({
          title: '抱歉，出现未知错误',
          icon: 'none',
          image: '',
          duration: 2000,
          mask: false,
        });
      },
      complete: () => {
        // ...
      }
    })

  },
  /*   cancelChoose: function (e) {
      //是否开启触摸反馈
      if (app.globalData.isVibrate) {
        wx.vibrateShort({
          complete: (res) => {},
        })
      }
      wx.setStorage({
        key: 'myName',
        data: '',
        success(res) {
          wx.showToast({
            title: '已取消',
          })
        }
      })
    }, */

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
    // 用户点击右上角分享  
    return {
      title: '来取个洋气的网名吧🏃‍', // 分享标题  
      desc: '我的网名是' + this.data.content, // 分享描述  
      path: 'pages/nameMade/nameMade' // 分享路径  
    }
  },
})
// pages/welcome/welcome.js
//获取实例
var app = getApp();
//引用js
var relationship = require("../util/relationship.js");
const imgUrl = require('../util/imgUrl')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    relative_questionMark:imgUrl.relative_questionMark,
    inputValue: '',
    chain: '',
    isShowScreen: true,
    isFu: false,
    isQi: true,
    second_height: 0, //第二部分的高度
    screenData: "我",
    result: "",
    id_h: "丈夫",
    id_w: "妻子",
    id_back: "back",
    id_clear: "clear",
    id_f: "爸爸",
    id_m: "妈妈",
    id_bb: "哥哥",
    id_sb: "弟弟",
    id_bs: "姐姐",
    id_ss: "妹妹",
    id_son: "儿子",
    id_d: "女儿",
    id_inverse: "inverse",
    id_love: "love",
    id_chain: 'chain',
    id_sex: 'sex',
    isTrue: false,
    sex: 1,
    sex_text: '♂'

  },
  introduction:function(e){
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    wx.navigateTo({
      url: '../introduction/introduction',
    })
  },
  clearBtn: function (e) {
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    this.setData({
      inputValue: "",
      chain: ''
    })

  },
  inputChain: function (e) {
    var result = relationship({
      text: e.detail.value,
      sex: this.data.sex,
      reverse: false,
      type: 'chain'
    });
    this.setData({
      chain: result
    })
  },
  loveBtn: function (e) {
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    if (this.data.isShowScreen) {
      this.setData({
        isShowScreen: false
      })
      wx.showToast({
        title: '亲戚关系查找',
      })
    } else {
      this.setData({
        isShowScreen: true
      })
      wx.showToast({
        title: '亲戚关系计算',
      })
    }
  },
  changeSex: function (e) {
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    if (this.data.sex == 1) {
      this.setData({
        sex: 0,
        sex_text: '♀',
      })
      wx.showToast({
        title: '我是女孩',
      })
    } else {
      this.setData({
        sex: 1,
        sex_text: '♂',
      })
      wx.showToast({
        title: '我是男孩',
      })
    }
  },
  setting:function(e){
    if(app.globalData.isVibrate){
      app.globalData.isVibrate = false
      wx.showToast({
        title: '触摸反馈关闭',
      })
    }else{
      app.globalData.isVibrate = true
      wx.showToast({
        title: '触摸反馈开启',
      })
    }
    

  },
  /**
   * 点击按钮事件
   */
  clickButton: function (event) {
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var data = this.data.screenData.toString();
    var dataResult = this.data.result.toString();
    var id = event.target.id;

    //退格功能实现
    if (id == this.data.id_back) { //如果是X 后退则清除两个字符
      //如果屏幕只有 "我" 则不处理
      if (data == "我") {
        return;
      } else {
        data = data.substring(0, data.length - 3);
        //需要重新计算关系
        var result = relationship({
          text: data,
          sex: this.data.sex,
          reverse: false,
          type: 'default'
        });
        dataResult = result;
      }
      //   console.log(data);
    } else if (id == this.data.id_clear) {
      //AC操作 清空屏幕
      data = "我";
      dataResult = "";
    } else {



      //点击其他操作 点击按钮即计算一遍
      var result = relationship({
        text: data,
        sex: this.data.sex,
        reverse: false,
        type: 'default'
      });
      //console.log(result);


      if (id == this.data.id_inverse) { //互查操作  Ta称呼我
        if (this.data.isTrue) { //一开始为false
          result = relationship({
            text: data,
            sex: this.data.sex,
            reverse: false,
            type: 'default'
          });
          this.setData({
            isTrue: false
          })
        } else {
          result = relationship({
            text: data,
            sex: this.data.sex,
            reverse: true,
            type: 'default'
          });
          this.setData({
            isTrue: true
          })
        }
        //修改屏幕结果为result
        dataResult = result;
      } else {
        //点击十个关系字

          data = data + "的" + id;
          //需要重新计算关系
          result = relationship({
            text: data,
            sex: this.data.sex,
            reverse: false,
            type: 'default'
          });
          dataResult = result;
      }
    }
    if (dataResult.length == 0&&data!='我') { //结果为空
      dataResult = "你是在难为我胖虎...";
    }
    this.setData({
      screenData: data,
      result: dataResult
    })






    /*
        //设置数据
        if(data =='我的妻子'&&this.data.sex!=0){
          dataResult = '朱永慧'
        }
        if(data =='我的丈夫'&&this.data.sex!=1){
          dataResult = '罗来华'
        }
        */

  },
  onShareAppMessage: function () {
    return {
       title: '很有趣的亲戚计算器，一起来玩叭~',
       path: '/pages/relative/relative',
       success: function (res) {
          console.log('成功进入分享==========', res);

       },
       fail: function (res) {
          console.log('进入分享失败==========', res);
       }
    }
 },
})
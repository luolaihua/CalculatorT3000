var wxCharts = require('../util/wxcharts.js'); // 引入wx-charts.js文件
var Cal = require('../util/cal_grade.js');

var app = getApp();
var gradeCanvas = null;
var BMICanvas = null;
var ring = null;
var videoAd = null;
Page({
  data: {
    isAnalyze:false,
    originGrade:[0,0,0,0,0,0],
    categories: [['50m','前屈', '跳远',  '1000m', '肺活量', '引体向上'],
    ['50m','前屈', '跳远',  '1000m', '肺活量', '仰卧起坐']],
    sex: '男',
    sexIndex: 0,
    grade: ['大一', '大二', '大三', '大四'],
    gradeIndex: 0,
    height: 0,
    weight: 0,
    capacity: 0,
    sit_and_reach: 0,
    jump: 0,
    race_50: 0,
    race_long: 0,
    other: 0,
    canvasWidth: '0px',
    /** 
     * 页面配置 
     */
    winWidth: 0,

    winHeight: 0,
    // tab切换  
    currentPage: 0,
    // 计算的总成绩
    calGrade: 0,
    bmi: 0,
    time: '00:00',
    color: "grey",
    modalhidden: true
  },
  copyLink:function(e){
    wx.setClipboardData({
      data: 'https://github.com/Mayandev/execal',
    })
  },
  dataAnalyze:function(e){
    if(this.data.isAnalyze){
          this.setData({
      isAnalyze:false
    })
    }else{
      this.setData({
        isAnalyze:true
      })
    }

    var windowWidth = 400;
    try {
        var res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
    } catch (e) {
        console.error('getSystemInfoSync failed!');
    }

   var radarChart = new wxCharts({
        canvasId: 'radarCanvas',
        type: 'radar',
        categories: this.data.categories[this.data.sexIndex],
        series: [{
            name: '体测数据分析',
            data: this.data.originGrade,
            color:'#FF4500'
        }],
        width: windowWidth,
        height: 400,
        extra: {
            radar: {
                max: 100
            }
        }
    });
  },

  // 页面加载完毕回掉函数
  onLoad: function (e) {
    let _this = this;
    // // // console.log(bim_data.bimData);
    // var cal =  new Cal(0,1,0,64,3200,23,2.8,7.2,60,197);
    // cal.getCalGrade();
    var windowWidth;
    var windowHeight;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
      windowHeight = res.windowHeight;
      this.setData({
        canvasWidth: windowWidth / 2 + 'px',
        winWidth: windowWidth,
        winHeight: windowHeight
      })
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    this.drawGradeCircle();
    this.drawBMICircle();
  },


  // 计算成绩
  calGrade: function () {
    var cal = new Cal(this.data.sexIndex, this.data.gradeIndex, this.data.height, this.data.weight, this.data.capacity, this.data.sit_and_reach, this.data.jump, this.data.race_50, this.data.other, this.data.race_long);
    var finalGrade = cal.getCalGrade();
    this.setData({
      calGrade: parseInt(finalGrade.calGrade),
      bmi: finalGrade.bmiunit,
      originGrade:finalGrade.originGrade
    });
    this.drawGradeCircle();

    this.drawBMICircle();
  },

  // 分享回掉函数
  onShareAppMessage: function () {
    // 用户点击右上角分享  
    return {
      title: '我的体测成绩算好啦🏃‍', // 分享标题  
      desc: '点击算算你的体测成绩🏃‍', // 分享描述  
      path: 'pages/bodyTest/bodyTest' // 分享路径  
    }
  },

  // 改变性别选项回掉函数
  bindSexChange: function (e) {
    if (this.data.sexIndex == 0) {
      console.log("性别改变为" + 1);
      this.setData({
        sexIndex: 1,
        sex: '女',
        other: 0
      });
    } else {
      console.log("性别改变为" + 0);
      this.setData({
        sexIndex: 0,
        sex: '男',
        other: 0
      });
    }
    //this.calGrade();
  },

  // 改变年级选项回掉函数
  bindGradeChange: function (e) {
    console.log('年级改变为', e.detail.value)
    this.setData({
      gradeIndex: e.detail.value
    });
    //this.calGrade();
  },

  // 升高输入框失去焦点事件
  heightOnBindBlur: function (e) {
    console.log(e.detail.value);
    if (isNaN(parseFloat(e.detail.value))) {
      this.setData({
        height: 0
      })
    } else {
      this.setData({
        height: parseInt(e.detail.value)
      })
    }

   // this.calGrade();
  },

  // 体重输入框失去焦点事件
  weightOnBindBlur: function (e) {
    if (isNaN(parseFloat(e.detail.value))) {
      this.setData({
        weight: 0
      })
    } else {
      this.setData({
        weight: parseInt(e.detail.value)
      })
    }

    //this.calGrade();
  },

  // 肺活量输入框失去焦点
  capacityOnBindBlur: function (e) {
    if (isNaN(parseFloat(e.detail.value))) {
      this.setData({
        capacity: 0
      })
    } else {
      this.setData({
        capacity: parseInt(e.detail.value)
      })
    }

   // this.calGrade();
  },

  // 坐立前屈输入框失去焦点
  sit_and_reachOnBindBlur: function (e) {
    if (isNaN(parseFloat(e.detail.value))) {
      this.setData({
        sit_and_reach: 0
      })
    } else {
      this.setData({
        sit_and_reach: e.detail.value
      })
    }

   // this.calGrade();
  },

  // 跳远输入框失去焦点
  jumpOnBindBlur: function (e) {
    if (isNaN(parseFloat(e.detail.value))) {
      this.setData({
        jump: 0
      })
    } else {
      this.setData({
        jump: e.detail.value
      })
    }
   // this.calGrade();
  },

  // 50m输入框失去焦点
  race_50OnBindBlur: function (e) {
    if (isNaN(parseFloat(e.detail.value))) {
      this.setData({
        race_50: 0
      })
    } else {
      this.setData({
        race_50: e.detail.value
      })
    }
   // this.calGrade();
  },

  // other输入框失去焦点
  otherOnBindBlur: function (e) {
    if (isNaN(parseFloat(e.detail.value))) {
      this.setData({
        other: 0
      })
    } else {
      this.setData({
        other: e.detail.value
      })
    }
   // console.log("aaaaaaaaaaaaaaaaaaaaaaaa" + this.data.other);
   // this.calGrade();
  },

  // 长跑失去焦点
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    });
    var timeInt = e.detail.value.split(":");
    var seconds = parseInt(timeInt[0] * 60) + parseInt(timeInt[1]);
    this.setData({
      race_long: seconds
    });

  },

  // 绘制图形
  drawGradeCircle: function () {
    //console.log(this.data.calGrade);
    var one = this.data.calGrade;
    var two = 100 - this.data.calGrade;
    gradeCanvas = new wxCharts({
      animation: true,
      canvasId: 'gradeCanvas',
      type: 'ring',
      extra: {
        ringWidth: 10,
        pie: {
          offsetAngle: -90
        }
      },
      title: {
        name: '' + one,
        color: '#7cb5ec',
        fontSize: 25,
      },
      subtitle: {
        name: '成绩',
        color: '#666666',
        fontSize: 20
      },
      series: [{
        name: '',
        data: one,
        stroke: false

      }, {
        name: '',
        data: two,
        stroke: false
      }],
      disablePieStroke: false,
      width: this.data.winWidth / 2,
      height: 200,
      dataLabel: false,
      legend: false,
      padding: 0
    });
  },


  // 绘制BMI图形
  drawBMICircle: function () {
    var height, weight;
    if (this.data.height == 0 || this.data.weight == 0) {
      height = 1;
      weight = 1;
    } else {
      height = this.data.height;
      weight = this.data.weight;
    }
    BMICanvas = null;
    BMICanvas = new wxCharts({
      animation: false,
      canvasId: 'BMICanvas',
      type: 'ring',
      extra: {
        ringWidth: 10,
        pie: {
          offsetAngle: -90
        }
      },
      title: {
        name: '' + this.data.bmi,
        color: '#7cb5ec',
        fontSize: 25,
      },
      subtitle: {
        name: 'BMI',
        color: '#666666',
        fontSize: 20
      },
      series: [{
        name: '',
        data: weight,
        stroke: false

      }, {
        name: '',
        data: height,
        stroke: false
      }],
      disablePieStroke: false,
      width: this.data.winWidth / 2,
      height: 200,
      dataLabel: false,
      legend: false,
      padding: 0
    });

  },
  touchHandler: function (e) {
    wx.showModal({
      title: '身体质量指数(BMI)',
      content: '体质指数(BMI)=体重(kg)÷身高^2(m)\n' +
        '过轻：低于18.5\n' +
        '正常：18.5-23.9\n' +
        '过重：24-27\n' +
        '肥胖：28-32\n',
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#3CC51F',
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},

    })
  },


})
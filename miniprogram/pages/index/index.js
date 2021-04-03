//index.js
//更新管理
const updateManager = wx.getUpdateManager()
const math = require('../util/math.min.js');
const Fraction = require('../util/fraction.js');
const imgUrl = require('../util/imgUrl')
const wavUrl = require('../util/wavUrl')
const myApi = require('../util/myApi')
const parser = math.parser();
//const innerAudioContext = wx.createInnerAudioContext()
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

//获取应用实例
const app = getApp()
var touchStartX = 0; //触摸时的原点 
var touchStartY = 0; //触摸时的原点 
var time = 0; // 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = ""; // 记录/清理时间记录 
var touchMoveX = 0; // x轴方向移动的距离
var touchMoveY = 0; // y轴方向移动的距离

var wavTempPath
Page({
  data: {
    calculator_questionMark: imgUrl.calculator_questionMark,
    calculator_soundOpen: imgUrl.calculator_soundOpen,
    calculator_soundClose: imgUrl.calculator_soundClose,
    calculator_arrow_up: imgUrl.calculator_arrow_up,
    calculator_arrow_down: imgUrl.calculator_arrow_down,
    calculator_history: imgUrl.calculator_history,
    isShowHistory: false,
    scrollTop: 100,
    isSound: false,
    isScientific: false,
    isFraction: false,
    ANS: '0',
    poet: '',
    isRuleTrue: false,
    imageUrl: '',
    fontsize: 150,
    res: "0", //结果
    res_ed: '',
    id_sin: 'sin(',
    id_cos: 'cos(',
    id_tan: 'tan(',
    id_asin: 'asin(',
    id_acos: 'acos(',
    id_atan: 'atan(',
    id_X: '!',
    id_log: 'log(',
    id_dou: ',',
    id_gen: '√(',
    id_mod: '%',
    id_deg: '°',
    id_i: 'i',
    id_pi: 'π',
    id_e: 'e',
    id1: "1",
    id2: '2',
    id3: '3',
    id4: "4",
    id5: '5',
    id6: '6',
    id7: "7",
    id8: '8',
    id9: '9',
    id_c: 'clear',
    id_d: 'del',
    id_love: 'love',
    id_div: '÷',
    id_div_sp: '/',
    id_inverse: '^(-1)',
    id_left: '(',
    id_right: ')',
    id_pow: '^',
    id_mult: '×',
    id_mult_sp: '*',
    id_sub: '-',
    id_add: '+',
    id_equal: 'equal',
    id0: '0',
    id_ans: 'A',
    id_dot: '.',
    id_x: 'x',
    id_y: 'y',
    id_z: 'z',
    condition: 'initial',
    justOne: false,
    startTime: '',
    endTime: '',
    isLove: 'false',
    lastTapTime: 0,
    isOpenSpecial: false,
    indexOfSpecialList: 2,
    indexOfdevirativeList: 0,
    specialOperatorList: [{
        name: '多项式化简',
        content: '多项式化简如：(x+3)^3'
      },
      {
        name: '多项式求导',
        content: '多项式求导如：x^4 + x + 3 + x^2'
      },
      {
        name: '取消',
        content: ''
      }
    ],
    /*     devirativeList: [{
          name: 'x',
          isRed: true
        }, {
          name: 'y',
          isRed: false
        }, {
          name: 'z',
          isRed: false
        }, {
          name: 'i',
          isRed: false
        }] */

  },
  toDeg: function (e) {
    var res = this.data.res
    if (!isNaN(res)) {
      res = res * 180 / Math.PI + ''
    }
    this.setData({
      res
    })
  },
  chooseContent: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var id = this.data.indexOfSpecialList,
      content

    if (id == 0) {
      content = '(x+3)^3'
    } else if (id == 1) {
      content = 'x^4 + x + 3 + x^2'
    }

    this.setData({
      res: content
    })
  },
  specialOp: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var id = Number(e.currentTarget.id)
    if (id == 2) {
      this.clearBtn()
    }
    this.setData({
      indexOfSpecialList: id,
      isOpenSpecial: false,
    })
  },
  isOpenSpecial: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    this.setData({
      isOpenSpecial: !this.data.isOpenSpecial
    })
  },
  isSound: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort()
    }
    if (this.data.isSound) {
      this.setData({
        //fontsize: 40,
        isSound: false
      })
      wx.showToast({
        title: '语音关闭',
      })
    } else {
      this.setData({
        //fontsize: 40,
        isSound: true
      })
      wx.showToast({
        title: '语音开启',
      })
    }
    /* 

        wx.showLoading({
          title: '语音包下载中',
        })

        var wavTempPathArr = [],
          folderName = 'cloud://luo-r5nle.6c75-luo-r5nle-1301210100/wav/CalculatorSound/',
          fileIDArr = ['cloud://luo-r5nle.6c75-luo-r5nle-1301210100/wav/CalculatorSound/zero.wav',
            'cloud://luo-r5nle.6c75-luo-r5nle-1301210100/wav/CalculatorSound/one.wav',
            'cloud://luo-r5nle.6c75-luo-r5nle-1301210100/wav/CalculatorSound/two.wav',
            'cloud://luo-r5nle.6c75-luo-r5nle-1301210100/wav/CalculatorSound/three.wav',
          ]
        try {
          myApi.downloadSaveFiles({
            urls: fileIDArr,
            success: function (res) {
              wavTempPath = res
              console.log(res);
              console.info(res.get(fileIDArr[0]).savedFilePath)
            },
            fail: function (e) {
              console.info("下载失败");
            }
          })

        } catch (e) {
          console.log(e)
        } finally {
          wx.hideLoading({
            complete: (res) => {},
          })
        }
     */



  },

  //打开透明层
  showRule: function () {
    this.setData({
      isRuleTrue: true
    })
  },
  //关闭透明层
  hideRule: function () {
    this.setData({
      isRuleTrue: false
    })
  },

  //是否开启分式运算
  startFraction: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var isFraction = this.data.isFraction
    console.log(isFraction)
    var res = this.data.res


    if (isFraction) {
      math.config({
        number: 'number'
      })
      this.setData({
        isFraction: false
      })
      wx.showToast({
        title: '普通运算',
      })
      //indexOfSpecialList == 2说明已取消特别计算模式
      if (this.data.indexOfSpecialList == 2) {
        try {
          res = new Fraction(res).toString()
        } catch (e) {
          console.log(e)
          wx.showToast({
            title: '格式错误！',
          })
        }
      }


      if (!isNaN(res)) {
        this.setData({
          res: res
        })
      }
    } else {
      math.config({
        number: 'Fraction'
      })
      wx.showToast({
        title: '分式运算',
      })
      this.setData({
        isFraction: true
      })
      if (!isNaN(res)) {
        this.setData({
          res: new Fraction(res).toFraction()
        })
      }
    }
  },
  //-------------------------------------------心形按钮功能
  loveBtn: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var curTime = e.timeStamp
    var lastTime = e.currentTarget.dataset.time // 通过e.currentTarget.dataset.time 访问到绑定到该组件的自定义数据

    this.setData({
      lastTapTime: curTime,
      condition: "initial",
    })


    if ((this.data.endTime - this.data.startTime) > 1000) {
      //判断是否长按
      //TODO


    } else if (curTime - lastTime < 500) {
      //是双击事件
      //TODO

    } else {

      //切换科学计算
      if (this.data.isScientific) {
        this.setData({
          isScientific: false
        })
        /*         wx.showToast({
                  title: '普通计算',
                }) */
      } else {
        this.setData({
          isScientific: true
        })
        /*         wx.showToast({
                  title: '科学计算',
                }) */
      }
    }
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
        this.setData({
          poet: '除了爱你我没有别的愿望\n一场风暴占满了河谷\n一条鱼占满了河\n我把你造得像我的孤独一样大\n整个世界好让我们躲藏\n日日夜夜好让我们互相了解\n为了在你的眼睛里不再看到别的\n只看到我对你的想象\n只看到你的形象中的世界\n还有你眼帘控制的日日夜夜',
          isRuleTrue: true
        })
        //console.log("向上滑动"+touchMoveY+ '  |  '+touchStartY+'up')
      }
      // 向下滑动 
      if (touchMoveY - touchStartY >= 120 && time < 10) {
        //console.log('向下滑动 '+touchMoveY+ '   |  '+touchStartY);

        this.setData({
          poet: '我爱你，不光因为你的样子，\n还因为，和你在一起时，我的样子。\n我爱你，\n不光因为你为我而做的事，\n还因为，为了你，\n我能做成的事。\n我爱你，\n因为你能唤出，我最真的那部分。\n我爱你，因为你穿越我心灵的旷野，\n如同阳光穿透水晶般容易，\n我的傻气，我的弱点，\n在你的目光里几乎不存在。\n而我心里最美丽的地方，\n却被你的光芒照得通亮，\n别人都不曾费心走那么远，\n别人都觉得寻找太麻烦，\n所以没人发现过我的美丽，\n所以没人到过这里。',
          isRuleTrue: true
        })

      }
    } else if (touchMoveX != 0) { // 左右
      // 向左滑动
      if (touchMoveX - touchStartX <= -120 && time < 10) {
        //console.log("左滑页面"+touchMoveX+ '  |  '+touchStartX+'left')

        this.setData({
          poet: '深深的话，\n我们浅浅地说。\n长长的路，\n我们慢慢地走。',
          isRuleTrue: true
        })
      }
      // 向右滑动 
      if (touchMoveX - touchStartX >= 120 && time < 10) {
        //console.log('向右滑动'+touchMoveX+ '  |  '+touchStartX+'left');

        this.setData({
          poet: '愿我如星君如月，\n夜夜流光相皎洁。',
          isRuleTrue: true
        })
      }
    }
    clearInterval(interval); // 清除setInterval 
    time = 0;
  },
  //love btn长按触发
  longtap: function (e) {},
  backBtn: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var res = this.data.res;
    var condition = this.data.condition;
    if (condition != 'initial' && res.length > 1) {
      res = res.substr(0, res.length - 1)
      this.setData({
        res: res
      })
      this.showResult(res)
    } else if (res.length == 1) {
      this.setData({
        res: '0',
        res_ed: '',
        condition: 'initial'
      })
    }

    //加音效
    //添加音效
    if (this.data.isSound) {
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.src = wavUrl.delete
      innerAudioContext.play()
    }

  },
  clearBtn: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    this.setData({
      res: '0',
      res_ed: '',
      condition: 'initial',
      fontsize: 150
    })

    //加音效
    //添加音效
    if (this.data.isSound) {
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.src = wavUrl.clear
      innerAudioContext.play()
    }

  },
  clickBtn: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var btnValue = e.target.id;
    var result = this.data.res;
    var condition = this.data.condition;
    switch (condition) {
      case 'initial':
        result = btnValue;
        this.setData({
          res: result,
          condition: 'clicked'
        });
        break;

      case 'clicked':

        //不能连续重复点击： +-*/. 判断最后一个字符是否+-*/. 如果是就删除
        var lastChar = result.charAt(result.length - 1);

        if (btnValue == '+' || btnValue == '-' || btnValue == '×' || btnValue == '÷' || btnValue == '.') {

          if (lastChar == '+' || lastChar == '-' || lastChar == '×' || lastChar == '÷' || lastChar == '.') {
            result = result.substr(0, result.length - 1)
          }
        }
        if (lastChar != 'A' || btnValue != "A") {
          result = result + btnValue;
        }


        this.setData({
          //显示内容增加时滑动到底部---动态
          scrollTop: result.length * 150,
          res: result,
          condition: 'clicked'
        });

        break;

      case 'equaled':


        if (isNaN(btnValue) && btnValue != 'A' && btnValue != 'x' && btnValue != 'y' && btnValue != 'z' && btnValue != 'i') {
          result = result + btnValue;
          this.setData({
            res: result,
            condition: 'clicked'
          })

        } else {
          result = btnValue;
          this.setData({
            res: result,
            condition: 'clicked'
          })
        };

        break;

    }
    this.changeFontSize(result)
    this.showResult(result)

    //加音效
    //添加音效
    if (this.data.isSound) {
      const innerAudioContext = wx.createInnerAudioContext()

      switch (btnValue) {
        case '1':
          innerAudioContext.src = wavUrl.one
          break;
        case '2':
          innerAudioContext.src = wavUrl.two
          break;
        case '3':
          innerAudioContext.src = wavUrl.three
          break;
        case '4':
          innerAudioContext.src = wavUrl.four
          break;
        case '5':
          innerAudioContext.src = wavUrl.five
          break;
        case '6':
          innerAudioContext.src = wavUrl.six
          break;
        case '7':
          innerAudioContext.src = wavUrl.seven
          break;
        case '8':
          innerAudioContext.src = wavUrl.eight
          break;
        case '9':
          innerAudioContext.src = wavUrl.nine
          break;
        case '0':
          innerAudioContext.src = wavUrl.zero
          break;
        case '.':
          innerAudioContext.src = wavUrl.dot
          break;
        case '+':
          innerAudioContext.src = wavUrl.add
          break;
        case '-':
          innerAudioContext.src = wavUrl.sub
          break;
        case '÷':
          innerAudioContext.src = wavUrl.divide
          break;
        case '×':
          innerAudioContext.src = wavUrl.mult
          break;
        case 'sin(':
          innerAudioContext.src = wavUrl.sin
          break;
        case 'cos(':
          innerAudioContext.src = wavUrl.cos
          break;
        case 'tan(':
          innerAudioContext.src = wavUrl.tan
          break;
        case 'asin(':
          innerAudioContext.src = wavUrl.asin
          break;
        case 'acos(':
          innerAudioContext.src = wavUrl.acos
          break;
        case 'atan(':
          innerAudioContext.src = wavUrl.atan
          break;
        case 'log(':
          innerAudioContext.src = wavUrl.log
          break;
        case '(':
          innerAudioContext.src = wavUrl.left
          break;
        case ')':
          innerAudioContext.src = wavUrl.right
          break;
        case 'π':
          innerAudioContext.src = wavUrl.pai
          break;
        case '^':
          innerAudioContext.src = wavUrl.nCiFang
          break;
        case '!':
          innerAudioContext.src = wavUrl.leicheng
          break;
        case '√(':
          innerAudioContext.src = wavUrl.kaifang
          break;
        case '^(-1)':
          innerAudioContext.src = wavUrl.daoshu
          break;
        case '%':
          innerAudioContext.src = wavUrl.quyu
          break;
      }
      innerAudioContext.play()
    }





  },
  equal: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }

    var index = this.data.indexOfSpecialList
    var result = this.data.res;
    var ans = this.data.ANS;

    result = this.dataPre(result)
    ans = this.dataPre(ans)
    //index==0 说明是化简有理化
    if (index == 0) {
      try {
        var res = math.rationalize(result).toString()

        //如果是分式计算
        if (this.data.isFraction) {
          res = math.simplify(res, {}, {
            exactFractions: true
          }).toString()
        } else {
          res = math.simplify(res).toString()
        }
                //动态改变字体大小
                this.changeFontSize(res)

        this.setData({
          res: res,
        })
      } catch (e) {
        console.log(e)
        wx.showToast({
          title: '表达式错误,请重新输入',
          icon: 'none'
        })
      }
    }
    //求导
    if (index == 1) {
      try {
        var res = math.derivative(result, 'x').toString()
                //动态改变字体大小
                this.changeFontSize(res)

        this.setData({
          res: res,
        })

      } catch (e) {
        console.log(e)
        wx.showToast({
          title: '表达式错误,请重新输入',
          icon: 'none'
        })
      }

      // console.log(res, 'res')
      // console.log(result, 'result')
    }

    if (index == 2) {
      try {
        //历史记录
        var historyArr = wx.getStorageSync('historyArr')
        if (historyArr == '') {
          var arr = []
          arr.push(result)
          wx.setStorageSync('historyArr', arr)
        } else {
          historyArr.unshift(result)
          wx.setStorageSync('historyArr', historyArr)
        }
        parser.evaluate('A = ' + ans)
        //计算结果
        var res = parser.evaluate(result)
        //将精度设为16
        res = math.format(res, {
          precision: 16
        })

        //如果是分式计算
        if (this.data.isFraction) {
          res = new Fraction(res).toFraction()
        }
        //数字谐音解析
        this.showlove(res)
        //把deg转成°
        res = res.toString().replace(' deg', '°');

        //小于10e8时不使用科学计数法
        if (!isNaN(res)) {
          if (Number(res) < Number('10e8')) {
            res = Number(res).toString()
          }
        }
        //动态改变字体大小
        this.changeFontSize(res)

        this.setData({
          res: res,
          ANS: res,
          condition: 'equaled',
          isShowHistory: true
        })
        //console.log(res)
      } catch (e) {
        console.log(e)
        wx.showToast({
          title: '表达式错误,请重新输入',
          icon: 'none'
        })
      }
    }
    var that = this
    //加音效
    //添加音效
    if (this.data.isSound) {
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.src = wavUrl.equal
      innerAudioContext.play()
      /*       innerAudioContext.onEnded(() => {
              that.playResultSound(res)
            }) */
    }
  },
  //TODO 安卓真机，IOS真机和模拟器效果不一样，问题没有解决
  playResultSound: function (res) {

    //如果不是数字，或者大于九万九千九百九十九  直接返回
    if (isNaN(res) || res >= 100000) {
      return
    }

    var wavSrcArr = []
    if (res == '0') {
      wavSrcArr.push(wavUrl.zero)
    } else {
      var resArr = res.split('')
      //整数部分长度
      var integerPartLength = res.split('.')[0].length
      console.log(resArr)
      console.log(integerPartLength)

      //逐个检查数字
      for (let index = 0; index < resArr.length; index++) {
        var curIntIndex = integerPartLength - index
        //判断整十整百整千整万情况
        if ((res % 10 == 0 && curIntIndex == 1) || (res % 100 == 0 && curIntIndex == 2) || (res % 1000 == 0 && curIntIndex == 3) || (res % 10000 == 0 && curIntIndex == 4) ||
          (resArr[index] == '0' && resArr[index + 1] == '0' && curIntIndex > 0)) {
          continue
        }
        //先把当前数字放入
        pushWhich(resArr[index])
        //添加个十百千万语音

        if (resArr[index] == '0') {
          continue
        }
        switch (curIntIndex) {
          case 5:
            wavSrcArr.push(wavUrl.wan)
            break
          case 4:
            wavSrcArr.push(wavUrl.qian)
            break
          case 3:
            wavSrcArr.push(wavUrl.bai)
            break
          case 2:
            wavSrcArr.push(wavUrl.shi)
            break
        }


      }
    }
    loopVoice(wavSrcArr)



    function pushWhich(number) {
      switch (number + '') {
        case '0':
          wavSrcArr.push(wavUrl.zero)
          // wavSrcArr.push(wavTempPath.get(fileIDArr[0]).savedFilePath)
          break
        case '1':
          wavSrcArr.push(wavUrl.one)
          //wavSrcArr.push(wavTempPath.get(fileIDArr[1]).savedFilePath)
          break
        case '2':
          wavSrcArr.push(wavUrl.two)
          //wavSrcArr.push(wavTempPath.get(fileIDArr[2]).savedFilePath)
          break
        case '3':
          //wavSrcArr.push(wavTempPath.get(fileIDArr[3]).savedFilePath)
          wavSrcArr.push(wavUrl.three)
          break
        case '4':
          wavSrcArr.push(wavUrl.four)
          break
        case '5':
          wavSrcArr.push(wavUrl.five)
          break
        case '6':
          wavSrcArr.push(wavUrl.six)
          break
        case '7':
          wavSrcArr.push(wavUrl.seven)
          break
        case '8':
          wavSrcArr.push(wavUrl.eight)
          break
        case '9':
          wavSrcArr.push(wavUrl.nine)
          break
        case '.':
          wavSrcArr.push(wavUrl.dot)
          break
      }
    }

    function loopVoice(wavSrcArr) {
      let myInnerAudio = wx.createInnerAudioContext()
      //myInnerAudio.obeyMuteSwitch = false
      //播放速度 调至2，最大
      myInnerAudio.playbackRate = 1.0
      myInnerAudio.onError(() => {
        console.error('error')
      })
      let times = 0
      myInnerAudio.src = wavSrcArr[times]

      myInnerAudio.play()
      myInnerAudio.onPlay(() => {
        times++
      })
      myInnerAudio.onEnded(() => {
        console.log("???")
        if (times === wavSrcArr.length - 1) {
          myInnerAudio.destroy()
        }
        myInnerAudio.src = wavSrcArr[times]
        myInnerAudio.play()
      })

    }

  },

  toHistory: function (e) {
    var that = this

    wx.navigateTo({
      //传参格式：参数与路径之间使用 ?分隔，参数键与参数值用 = 相连，
      //不同参数用 & 分隔；如 '/pages/index/index?value1=hello&value2=world'
      url: '../scientificData/scientificData?value=' + 'history',
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      events: {
        getHistoryData: function (data) {
          that.setData({
            res: data.data,
            condition: 'clicked'
          })
          that.changeFontSize(data.data)
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: 'history'
        })
      }
    })
  },
  toScientificData: function (e) {

    //这一步特别牛，先把全局对象存起来，后面全局对象可能会改变，所以that可以代替this作为全局对象
    var that = this

    wx.navigateTo({
      //传参格式：参数与路径之间使用 ?分隔，参数键与参数值用 = 相连，
      //不同参数用 & 分隔；如 '/pages/index/index?value1=hello&value2=world'
      url: '../scientificData/scientificData?value=' + 'scientificData',
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      events: {
        getScientifiData: function (data) {
          that.setData({
            res: data.data,
            condition: 'clicked'

          })
          that.changeFontSize(data.data)
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: 'scientificData'
        })
      }
    })
  },
  help: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    this.setData({
      poet: '555',
      isRuleTrue: true
    })
  },


  showResult(result) {  
    result = this.dataPre(result)
    try {
      //计算结果
      var res = math.evaluate(result)
      //将精度设为16
      res = math.format(res, {
        precision: 16
      })

      //如果是分式计算
      if (this.data.isFraction) {
        res = new Fraction(res).toFraction()
      }
      //把deg转成°
      res = res.toString().replace(' deg', '°');
      //小于10e8时不使用科学计数法
      if (!isNaN(res)) {
        if (Number(res) < Number('10e8')) {
          res = Number(res).toString()
        }
      }
      //动态改变字体大小
      //console.log(res)
      this.setData({
        res_ed: res,
      })
      //console.log(res)
    } catch (e) {
      //console.log(e)
    }

  },
  //数字谐音解析函数
  showlove: function (res) {
    var one = '1314:一生一世:1314520:一生一世I love you:1324:今生来世:1324320:今生来世深爱你:1314920:一生一世就爱你:1372:一厢情愿:1392010:一生就爱你一个:1414:要死要死；意思意思:147:一世情:1573:一往情深:1589854:要我发，就发五次:1711:一心一意:177155:MISS:1920:依旧爱你:1930:依旧想你:200:爱你哦:20110:爱你一百一十年:20184:爱你一辈子:2030999:爱你想你久久久:2037:为你伤心:20475:爱你是幸福:20609:爱你到永久:20863:爱你到来生:220225:爱爱你爱爱我:230:爱死你:234:爱相随:235:要想你:2406:爱死你啦:246:饿死了:246437:爱是如此神奇:25184:爱我一辈子:25873:爱我到今生:25910:爱我久一点:25965:爱我就留我:259695:爱我就了解我:259758:爱我就娶我吧:2627:爱来爱去:27:爱妻:282:饿不饿:256895:你是可爱的小狗::300:想你哦:30920:想你就爱你:3013:想你一生:310:先依你:31707:LOVE:32062:想念你的爱:032069:想爱你很久:3207778:想和你去吹吹风:330335:想想你想想我:3344587:生生世世不变心:3399:长长久久:356:上网啦:35910:想我久一点:359258:想我就爱我吧:360:想念你:369958:神啊救救我吧:3731:真心真意:39:Thankyou:30920:想你就爱你:440295:谢谢你爱过我:447735:时时刻刻想我:4456:速速回来:456:是我啦:460:想念你:4980:只有为你:48:是吧:4466:顺顺利利:505:SOS:507680:我一定要追你:510:我依你，我要你:51020:我依然爱你:51095:我要你嫁我:51396:我要睡觉了:51368:我一生顺发:514:无意思:515206:我已不爱你了:518420:我一辈子爱你:521:我爱你:520:我爱你:5201314:我爱你一生一世:5211314:我爱你一生一世:52094:我爱你到死:521:我愿意:52306:我爱上你了:5240:我爱是你:52460:我爱死你了:5260:我暗恋你:530:我想你:5366:我想聊聊:5376:我生气了:53719:我深情依旧:53770:我想亲亲你:53782:我心情不好:53880:我想抱抱你:53980:我想揍扁你:540086:我是你女朋友:5406:我是你的:5420:我只爱你:54335:无事想想我:543720:我是真心爱你:54430:我时时想你:5452830:无时无刻不想你:546:我输了:5460:我思念你:5490:我去找你:54920:我始终爱你:555:呜呜呜:55646:我无聊死了:5620:我很爱你:5360:我想念你:5630:我很想你:564335:无聊时想想我:570:我气你:57350:我只在乎你:57386:我去上班了:57410:我心属于你:574839:我其实不想走:5776:我出去了:58:晚安:580825:我怕你不爱我:584520:我发誓我爱你:586:我不来:587:我抱歉:5871:我不介意:592:我就爱:59240:我最爱是你:59420:我就是爱你:59520:我永远爱你:596:我走了:　　517230:我已经爱上你:5170:我要娶你:5209484:我爱你就是白痴:609:到永久:6120:懒得理你:6785753:老地方不见不散:6868:溜吧溜吧:687:对不起:666:溜溜溜:6699:顺顺利利:70345:请你相信我:706:起来吧:70626:请你留下来:7087:请你别走:70885:请你帮帮我:721:亲爱你:729:去喝酒:7319:天长地久:737420:今生今世爱你:73807:情深怕缘浅:740:气死你:7408695:其实你不了解我:74520:其实我爱你:74074:去死你去死:74839:其实不想走:756:亲我啦:765:去跳舞:770880:亲亲你抱抱你:7731:心心相印:7752:亲亲吾爱:77543:猜猜我是谁:77895:紧紧抱着我:786:吃饱了:7998:去走走吧:7086:七零八落:70345:请你相信我:780:牵挂你:706519184:请你让我依靠一辈子:7708801314520:亲亲你抱抱你一生一世我爱你:7758258:亲亲我吧爱我吧:8006:不理你了:8013:伴你一生:8074:把你气死:8084:BABY:81176:不要在一起了:82475:被爱是幸福:825:别爱我:837:别生气:8384:不三不四:85941:帮我告诉他:860:不留你:865:别惹我:8716:八格耶鲁:88:ByeBye:886:拜拜啦:82266:把爱爱顺了:8834760:漫漫相思只为你:898:分手吧:902535:求你爱我想我:9089:求你别走:910:就依你:918:加油吧:920:就爱你:9213:钟爱一生:9240:最爱是你:930:好想你:93110:好想见见你:940194:告诉你一件事:9494:就是就是:95:救我:987:对不起:9908875:求求你别抛弃我';
    var oneBox = one.split(':')
    //判断有没有该元素
    var isExist = oneBox.indexOf(res);
    //数字谐音解析功能
    if (isExist != -1 && res != '0') {
      res = oneBox[isExist + 1]
      wx.showToast({
        title: res,
        icon: 'success'
        // image:'../../images/t1.jpg'
      })
    }
  },
  //预处理数据
  dataPre: function (result) {

    //预处理
    result = result.replaceAll('×', '*');
    result = result.replaceAll('°', 'deg');
    result = result.replaceAll('÷', '/');
    result = result.replaceAll('π', 'pi');
    result = result.replaceAll('√', 'sqrt');
    //parser.evaluate('A = ' + ans)

    //求左括号出现次数
    var index = result.indexOf('('); // 字符首次出现的位置
    var count_left = 0; // 这个字符出现的次数
    while (index !== -1) {
      count_left++; // 每出现一次 次数加一
      index = result.indexOf('(', index + 1); // 从字符串出现的位置的下一位置开始继续查找
    }
    //求左括号出现次数
    var index = result.indexOf(')'); // 字符首次出现的位置
    var count_right = 0; // 这个字符出现的次数
    while (index !== -1) {
      count_right++; // 每出现一次 次数加一
      index = result.indexOf(')', index + 1); // 从字符串出现的位置的下一位置开始继续查找
    }
    //补填右括号
    for (var i = 0; i < (count_left - count_right); i++) {
      result = result + ')'
    }
    return result

  },
  changeFontSize: function (res) {
    if (res == undefined || res == '') {
      return
    }
    var length = res.length,
      fontsize

    if (length < 10) {
      fontsize = 120
    } else if (length < 20) {
      fontsize = 100
    } else{
      fontsize = 80
    }
    this.setData({
      fontsize
    })

  },

  onLoad: function () {
    //历史记录
    var isShowHistory = true
    var historyArr = wx.getStorageSync('historyArr')
    //
    var isShowWelcome= wx.getStorageSync('isShowWelcome')
    if(!isShowWelcome){
      wx.showModal({
        title: 'WELCOME',
        cancelText:'不再提示',
        confirmText:'我知道了',
        content: '欢迎使用T3000!\n本软件尚处于开发状态，存在许多未知错误，如果对本软件有任何意见或建议，欢迎您在设置->机器人客服中与客服联系。如果客服无法及时回复，您可以在意见反馈中留言，无须填写联系方式，开发者收到反馈信息将会第一时间对您的反馈做出回应。谢谢^_^',
        success (res) {
        if (res.confirm) {
          
        } else if (res.cancel) {
          wx.setStorageSync('isShowWelcome', true)
        }
        }
        })
    }
    if (historyArr == '') {
      isShowHistory = false
    }
    this.setData({
      isShowHistory
    })

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log('hasUpdate', res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })

  },
  onShareAppMessage: function () {
    return {
      title: '一起来玩超级计算器T3000叭~',
      path: '/pages/index/index',
      success: function (res) {
        console.log('成功进入分享==========', res);

      },
      fail: function (res) {
        console.log('进入分享失败==========', res);
      }
    }
  },

})
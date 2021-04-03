// miniprogram/pages/unitTransfer/unitTransfer.js
var math = require('../util/math.min.js');
var Fraction = require('../util/fraction.js');
math.config({
  number: 'BigNumber'
})
math.createUnit('nmi', '1.852km')
math.createUnit('fur', '220yd')
math.createUnit('gongli', '1km')
math.createUnit('lli', '500m')
math.createUnit('zhang', '3.333333333333m')
math.createUnit('chi', '0.1zhang')
math.createUnit('cun', '0.1chi')
math.createUnit('fen', '0.1cun')
math.createUnit('lii', '0.1fen')
math.createUnit('hao', '0.1lii')
math.createUnit('cal', '4.1858518208J')
math.createUnit('kcal', '4185.8518208J')
math.createUnit('degRe', '1.25degC')
math.createUnit('short', '1ton')
math.createUnit('longt', '1016.04691kg')
math.createUnit('ct', '0.2g')
math.createUnit('brcwt', '50.8023454kg') //英担
math.createUnit('gcwt', '100kg') //英担
math.createUnit('point', '0.002g') //分
math.createUnit('dan', '50kg') //担
math.createUnit('jin', '0.5kg') //斤
math.createUnit('liang', '0.05kg') //两
math.createUnit('qian', '5g') //担
math.createUnit('ha', '1hectare') //公顷
math.createUnit('are', '100m2') //公亩
math.createUnit('qing', '66666.666666666667m2') //顷
math.createUnit('mu', '0.01qing') //亩
math.createUnit('areaFen', '0.1mu') //分
math.createUnit('chi2', '0.11111111111111111111m2') //平方尺
math.createUnit('cun2', '0.01chi2') //平方寸
math.createUnit('c', '299792458m/s') //光速
math.createUnit('Ma', '340.3m/s') //马赫
math.createUnit('kn', '1.852km/h') //节
math.createUnit('mph', '1.609344km/h') //迈
math.createUnit('ips', '0.254m/s') //英寸每秒
math.createUnit('fps', '0.3048m/s') //马赫
math.createUnit('ps', '735.49875W') //米制马力

/* 
console.log(math.evaluate('1m/s to km/h') + '')
console.log(math.evaluate('1c to km/h') + '')
console.log(math.evaluate('1ps to hp') + '')
console.log(math.evaluate('1week to ns') + '')

 */
/* console.log(parseInt('10',16))
console.log(parseInt('1',16))
console.log(parseInt('F',16))
 */
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showWhichSection: 'unit',
    isVibrate: false,
    condition: '',
    res: '0',
    res1: '0',
    res2: '0',
    index: 2,
    index1: 0,
    index2: 0,
    showUnit1: 'm',
    showUnit2: 'm',
    isChoose: true,
    id: 'length',
    id_length: 'length',
    id_time: 'time',
    id_mass: 'mass',
    id_volume: 'volume',
    id_temperature: 'temperature',
    id_presure: 'presure',
    id_area: 'area',
    id_liquidVolume: 'liquidVolume',
    id_angles: 'angles',
    id_big: 'big',
    id_energy: 'energy',
    id_jinzhi: 'jinzhi',
    id_power: 'power',
    id_velocity: 'velocity',

    array: ['米 m', '千米 km', '分米 dm', '厘米 cm', '毫米 mm', '微米 um', '纳米 nm', '皮米 pm',
      '公里 gongli', '里 lli', '丈 zhang', '尺 chi', '寸 cun', '分 fen', '厘 lii', '毫 hao',
      '海里 nmi', '英里 mi', '浪 fur', '英寸 in', '英尺 ft', '码 yd',
      '杆 rd', '链 ch', 'angstrom', '密耳mil', 'link', 'angstrom'
    ],
    array_length: ['米 m', '千米 km', '分米 dm', '厘米 cm', '毫米 mm', '微米 um', '纳米 nm', '皮米 pm',
      '公里 gongli', '里 lli', '丈 zhang', '尺 chi', '寸 cun', '分 fen', '厘 lii', '毫 hao',
      '海里 nmi', '英里 mi', '浪 fur', '英寸 in', '英尺 ft', '码 yd',
      '杆 rd', '链 ch', '密耳 mil', 'link', 'angstrom'
    ],
    array_energy: ['焦耳 J', '千焦 kJ', '卡 cal', '千卡 kcal', 'erg', '瓦时 Wh', 'BTU', '电子伏特 eV'],
    array_pressure: ['帕斯卡 Pa', 'psi', '标压 atm', 'torr', '巴 bar', '毫米汞柱 mmHg', '毫米水柱 mmH2O', '厘米水柱 cmH2O'],
    array_temperature: ['开氏度 K', '摄氏度 °C', '华氏度 °F', '兰氏度 °R', '列氏度 °Re'],
    array_mass: ['千克 kg', '克 g', '毫克 mg', '微克 ug', '担 dan', '斤 jin', '两 liang', '钱 qian', '吨 t', '短吨 shortt', '长吨 longt', '格令 gr', '打兰 dr', '盎司 oz', '磅 lb', '美担 cwt', '英担 brcwt', '公担 gcwt', '分 point', '英石 stone', 'stick'],
    array_area: ['平方千米 km2', '平方米 m2', '平方分米 dm2', '平方厘米 cm2', '平方毫米 mm2', '顷 qing', '亩 mu', '分 areaF', '平方尺 chi2', '平方寸 cun2', '平方英寸 sqin', '平方英尺 sqft', ' 平方码 sqyd', '平方英里 sqmi', '平方竿 sqrd', 'sqch', 'sqmil', '英亩 acre', '公顷 ha'],
    array_volume: ['立方米 m3', '立方分米 dm3', '立方厘米 cm3', '立方毫米 mm3', '升 l', '毫升 ml', '微升 ul', '厘升 cl', '分升 dl', 'cc', '立方英寸 cuin', '立方英尺 cuft', '立方码 cuyd', 'teaspoon', 'tablespoon'],
    array_angles: ['弧度 rad', '角度 °', '百分度 grad', '圆周 cycle', '弧秒 arcsec', '弧分 arcmin'],
    array_time: ['纳秒 ns', '微秒 us', '毫秒 ms', '秒 s', '分 mins', '时 h', '天 day', '周 week', '月 month', '年 year', '十年 decade', '世纪 century'],
    array_jinzhi: ['二进制BIN', '八进制OCT', '十进制DEC', '十六进制HEX', '2进制', '3进制', '4进制', '5进制', '6进制', '7进制', '8进制', '9进制', '10进制', '11进制', '12进制', '13进制', '14进制', '15进制'],
    array_velocity: ['米/秒 m/s', '千米/小时 km/h', '海里/小时(节) kn', '英里/小时(迈) mph', '英寸/秒 ips', '英尺/秒 fps', '光速 c', '马赫 Ma'],
    array_power: ['瓦 W', '千瓦 kW', '英制马力 hp', '米制马力 ps', '焦耳/秒 J/s', '牛顿米/秒 (N m)/s', '千卡/秒 kcal/s', ],
    id0: '0',
    id1: "1",
    id2: '2',
    id3: '3',
    id4: "4",
    id5: '5',
    id6: '6',
    id7: "7",
    id8: '8',
    id9: '9',
    id_A: 'A',
    id_B: 'B',
    id_C: 'C',
    id_D: 'D',
    id_E: 'E',
    id_F: 'F',
    id_c: 'clear',
    id_d: 'del',
    id_dot: '.'
  },
  loveBtn: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    wx.showToast({
      title: '点击红字选择不同单位',
      icon: 'none'
    })
  },
  //清除按钮
  clearBtn: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var res2 = '0'
    if (this.data.showWhichSection == 'daxie') {
      res2 = '零元整'
    }
    this.setData({
      res1: '0',
      res2: res2
    })
  },
  //输入数字按钮
  inputBtn: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }


    //获取当前按钮id值
    var btnValue = e.target.id



    //判断是输入到res1还是res2中，如果isChoose为true则输入到res1
    if (this.data.isChoose) {
      //获取当前res1的数据
      var res1 = this.data.res1
      //判断是否按下退格键
      if (btnValue == "del") {
        if (res1.length == 1) {
          res1 = '0'
        } else {
          res1 = res1.substr(0, res1.length - 1)
        }
      } else {
        //如果按下数字按钮

        //处理进制输入按钮的范围：
        if (this.data.showWhichSection == 'jinzhi') {
          btnValue = this.processJinzhiBtnValue(btnValue, this.data.index1)+''
        }


        if ((res1 == '0' || this.data.condition == 'choose') ) {
          res1 = btnValue
        } else {
          res1 = res1 + btnValue
        }

      }

      //按一次按钮做一次运算----11111
      switch (this.data.showWhichSection) {
        case 'unit':
          if (!isNaN(res1)) {
            var res = this.transfer(res1, this.data.showUnit1, this.data.showUnit2)
            this.setData({
              res2: res,
              res1: res1
            })
          }
          break;
        case 'temperature':
          if (!isNaN(res1)) {
            var res = this.transfer(res1, this.data.showUnit1, this.data.showUnit2)
            this.setData({
              res2: res,
              res1: res1
            })
          }
          break;
        case 'daxie':
          if (!isNaN(res1)) {
            var res = this.changeNumMoneyToChinese(res1)
            this.setData({
              res2: res,
              res1: res1
            })
          }
          break;
        case 'jinzhi':
          var m = this.data.index1
          var n = this.data.index2
          var res = this.jinzhiTransfer(res1, m, n)
          res = this.formatResult(res)
          res1 = this.formatResult(res1)
          this.setData({
            res2: res,
            res1: res1
          });
          break;
      }
      this.setData({
        condition: 'clicked'
      })

    } else {
      //如果isChoose为false，则修改res2中的数据
      var res2 = this.data.res2
      if (btnValue == "del") {
        if (res2.length == 1) {
          res2 = '0'
        } else {
          res2 = res2.substr(0, res2.length - 1)
        }
      } else {
        //处理进制输入按钮的范围：
        if (this.data.showWhichSection == 'jinzhi') {
          btnValue = this.processJinzhiBtnValue(btnValue, this.data.index2)+''
        }

        if ((res2 == '0' || this.data.condition == 'choose')) {
          res2 = btnValue
        } else {
          res2 = res2 + btnValue
        }
      }
      //处理完res2后再处理数据

      //按一次按钮做一次运算------2222222222222
      switch (this.data.showWhichSection) {
        case 'unit':
          if (!isNaN(res2)) {
            var res = this.transfer(res2, this.data.showUnit2, this.data.showUnit1)
            this.setData({
              res1: res,
              res2: res2
            })
          }
          break;
        case 'temperature':
          if (!isNaN(res2)) {
            var res = this.transfer(res2, this.data.showUnit2, this.data.showUnit1)
            this.setData({
              res1: res,
              res2: res2
            })
          }
          break;
        case 'jinzhi':
          var m = this.data.index1
          var n = this.data.index2
          var res = this.jinzhiTransfer(res2, n, m)
          res = this.formatResult(res)
          res2 = this.formatResult(res2)
          this.setData({
            res1: res,
            res2: res2
          })
          break;
      }
      this.setData({
        condition: 'clicked',
      })
    }

  },

  choose1: function (e) {
    this.setData({
      condition: 'choose',
      isChoose: true
    })
  },
  choose2: function (e) {
    this.setData({
      condition: 'choose',
      isChoose: false,
    })
  },

  //选择单位
  chooseUnit: function (e) {
    //是否开启触摸反馈
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    if (app.globalData.isVibrate) {
      wx.vibrateShort({
        complete: (res) => {},
      })
    }
    var btnValue = e.target.id;
    this.setData({
      id: btnValue,
      isChoose: true
    })
    switch (btnValue) {
      case 'length':
        this.initial(this.data.array_length)
        this.setData({
          showWhichSection: 'unit',
          array: this.data.array_length,

        });
        break;
      case 'time':
        this.initial(this.data.array_time)
        this.setData({
          showWhichSection: 'unit',
          array: this.data.array_time,

        });
        break;
      case 'mass':
        this.initial(this.data.array_mass)
        this.setData({
          showWhichSection: 'unit',
          array: this.data.array_mass,

        });
        break;
      case 'volume':
        this.initial(this.data.array_volume)
        this.setData({
          showWhichSection: 'unit',
          array: this.data.array_volume,

        });
        break;
      case 'temperature':
        this.initial(this.data.array_temperature)
        this.setData({
          showWhichSection: 'temperature',
          array: this.data.array_temperature,

        });
        break;
      case 'presure':
        this.initial(this.data.array_pressure)
        this.setData({
          showWhichSection: 'unit',
          array: this.data.array_pressure,

        });
        break;
      case 'area':
        this.initial(this.data.array_area)
        this.setData({
          showWhichSection: 'unit',
          array: this.data.array_area,

        });
        break;
      case 'liquidVolume':
        this.initial(this.data.array)
        this.setData({
          showWhichSection: 'unit',
          array: this.data.array,

        });
        break;
      case 'angles':
        this.initial(this.data.array_angles)
        this.setData({
          showWhichSection: 'unit',
          array: this.data.array_angles,

        });
        break;
      case 'big':
        this.initial(this.data.array_length)
        this.setData({
          showWhichSection: 'daxie',
          array: this.data.array_length,
          res2: '零元整',

        });
        break;
      case 'energy':
        this.initial(this.data.array_energy)
        this.setData({
          showWhichSection: 'unit',
          array: this.data.array_energy,

        });
        break;
      case 'jinzhi':
        this.initial(this.data.array_jinzhi)
        this.setData({
          showWhichSection: 'jinzhi',
          array: this.data.array_jinzhi,

        });
        break;
      case 'power':
        this.initial(this.data.array_power)
        this.setData({
          showWhichSection: 'unit',
          array: this.data.array_power,

        });
        break;
      case 'velocity':
        this.initial(this.data.array_velocity)
        this.setData({
          showWhichSection: 'unit',
          array: this.data.array_velocity,

        });
        break;

    }
  },
  bindPickerChange1: function (e) {
    //console.log('picker1发送选择改变，携带值为', e.detail.value)
    var index = Number(e.detail.value)
    var id = this.data.id
    switch (id) {
      case 'length':
        this.setData({
          showUnit1: this.getUnit(this.data.array_length[index])
        });
        break;
      case 'time':
        this.setData({
          showUnit1: this.getUnit(this.data.array_time[index])
        });
        break;
      case 'mass':
        this.setData({
          showUnit1: this.getUnit(this.data.array_mass[index])
        });
        break;
      case 'volume':
        this.setData({
          showUnit1: this.getUnit(this.data.array_volume[index])
        });
        break;
      case 'temperature':
        this.setData({
          showUnit1: this.getUnit(this.data.array_temperature[index])
        });
        break;
      case 'presure':
        this.setData({
          showUnit1: this.getUnit(this.data.array_pressure[index])
        });
        break;
      case 'area':
        this.setData({
          showUnit1: this.getUnit(this.data.array_area[index])
        });
        break;
      case 'liquidVolume':
        this.setData({
          showUnit1: this.getUnit(this.data.array[index])
        });
        break;
      case 'angles':
        this.setData({
          showUnit1: this.getUnit(this.data.array_angles[index])
        });
        break;
      case 'big':
        this.setData({
          showUnit1: this.getUnit(this.data.array_length[index])
        });
        break;
      case 'energy':
        this.setData({
          showUnit1: this.getUnit(this.data.array_energy[index])
        });
        break;
      case 'jinzhi':
        this.setData({
          showUnit1: this.getUnit(this.data.array_jinzhi[index])
        });
        break;
      case 'power':
        this.setData({
          showUnit1: this.getUnit(this.data.array_power[index])
        });
        break;
      case 'velocity':
        this.setData({
          showUnit1: this.getUnit(this.data.array_velocity[index])
        });
        break;

    }
    this.setData({
      index1: e.detail.value
    })

    //按一次按钮做一次运算
    switch (this.data.showWhichSection) {
      case 'unit':
        if (!isNaN(this.data.res1)) {
          var res = this.transfer(this.data.res1, this.data.showUnit1, this.data.showUnit2)
          this.setData({
            res2: res,
          })
        }
        break;
      case 'temperature':
        if (!isNaN(this.data.res1)) {
          var res = this.transfer(this.data.res1, this.data.showUnit1, this.data.showUnit2)
          this.setData({
            res2: res,
          })
        }
        break;
      case 'jinzhi':
        //var m = this.data.index1
        // var n = this.data.index2
        // var res = this.jinzhiTransfer(this.data.res1, m, n)
        this.setData({
          res1: '0',
          res2: '0',
        })
        break;
    }
    // var res = this.transfer(this.data.res1, this.data.showUnit1, this.data.showUnit2)

  },
  bindPickerChange2: function (e) {
    //console.log(e)
    //console.log('picker2发送选择改变，携带值为', e.detail.value)
    var index = Number(e.detail.value)
    var id = this.data.id
    switch (id) {
      case 'length':
        this.setData({
          showUnit2: this.getUnit(this.data.array_length[index])
        });
        break;
      case 'time':
        this.setData({
          showUnit2: this.getUnit(this.data.array_time[index])
        });
        break;
      case 'mass':
        this.setData({
          showUnit2: this.getUnit(this.data.array_mass[index])
        });
        break;
      case 'volume':
        this.setData({
          showUnit2: this.getUnit(this.data.array_volume[index])
        });
        break;
      case 'temperature':
        this.setData({
          showUnit2: this.getUnit(this.data.array_temperature[index])
        });
        break;
      case 'presure':
        this.setData({
          showUnit2: this.getUnit(this.data.array_pressure[index])
        });
        break;
      case 'area':
        this.setData({
          showUnit2: this.getUnit(this.data.array_area[index])
        });
        break;
      case 'liquidVolume':
        this.setData({
          showUnit2: this.getUnit(this.data.array[index])
        });
        break;
      case 'angles':
        this.setData({
          showUnit2: this.getUnit(this.data.array_angles[index])
        });
        break;
      case 'big':
        this.setData({
          showUnit2: this.getUnit(this.data.array_length[index])
        });
        break;
      case 'energy':
        this.setData({
          showUnit2: this.getUnit(this.data.array_energy[index])
        });
        break;
      case 'jinzhi':
        this.setData({
          showUnit2: this.getUnit(this.data.array_jinzhi[index])
        });
        break;
      case 'power':
        this.setData({
          showUnit2: this.getUnit(this.data.array_power[index])
        });
        break;
      case 'velocity':
        this.setData({
          showUnit2: this.getUnit(this.data.array_velocity[index])
        });
        break;

    }
    this.setData({
      index2: e.detail.value,
    })

    //按一次按钮做一次运算
    switch (this.data.showWhichSection) {
      case 'unit':
        if (!isNaN(this.data.res2)) {
          var res = this.transfer(this.data.res2, this.data.showUnit2, this.data.showUnit1)
          this.setData({
            res1: res,
          })
        }
        break;
      case 'temperature':
        if (!isNaN(this.data.res2)) {
          var res = this.transfer(this.data.res2, this.data.showUnit2, this.data.showUnit1)
          this.setData({
            res1: res,
          })
        }
        break;
      case 'jinzhi':
        //var m = this.data.index1
        //var n = this.data.index2
        //var res = this.jinzhiTransfer(this.data.res2, m, n)
        this.setData({
          res1: '0',
          res2: '0',
        })
        break;
    }

  },
  zhengfu: function (e) {
    if (this.data.isChoose) {
      this.setData({
        res1: jian(this.data.res1)
      })
      if (!isNaN(this.data.res1)) {
        var res = this.transfer(this.data.res1, this.data.showUnit1, this.data.showUnit2)
        this.setData({
          res2: res,
        })
      }
    } else {
      this.setData({
        res2: jian(this.data.res2)
      })
      if (!isNaN(this.data.res2)) {
        var res = this.transfer(this.data.res2, this.data.showUnit2, this.data.showUnit1)
        this.setData({
          res1: res,
        })
      }
    }

    function jian(res) {
      if (res.charAt(0) == '-') {
        res = res.replace('-', '')
      } else {
        res = '-' + res
      }
      return res
    }

  },
  transfer: function (num, u1, u2) {
    u1 = u1.replace('°', 'deg')
    u2 = u2.replace('°', 'deg')
    var str = num + u1 + ' to ' + u2
    var a = math.evaluate(str)
    var b = a.toNumber()
    var c = parseFloat(b)
    //console.log(math.format(b, {notation: 'fixed',precision: 6}))
    // console.log(c + '')
    return c + ''

  },
  initial: function (array) {
    this.setData({
      res: '0',
      res1: '0',
      res2: '0',
      index: 0,
      index1: 0,
      index2: 0,
      showUnit1: this.getUnit(array[0]),
      showUnit2: this.getUnit(array[0]),
    })
  },
  //得到单位函数
  getUnit: function (str) {
    var n = str.indexOf(" ")
    if (n == -1) {
      return str
    } else {
      var temp = str.split(" ")
      return temp[1]
    }
  },
  changeNumMoneyToChinese: function (money) {
    var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
    var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
    var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
    var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
    var cnInteger = "整"; //整数金额时后面跟的字符
    var cnIntLast = "元"; //整型完以后的单位
    var maxNum = 999999999999999.9999; //最大处理的数字
    var IntegerNum; //金额整数部分
    var DecimalNum; //金额小数部分
    var ChineseStr = ""; //输出的中文金额字符串
    var parts; //分离金额后用的数组，预定义    
    var Symbol = ""; //正负值标记
    if (money == "") {
      return "";
    }

    money = parseFloat(money);
    if (money >= maxNum) {
      alert('超出最大处理数字');
      return "";
    }
    if (money == 0) {
      ChineseStr = cnNums[0] + cnIntLast + cnInteger;
      return ChineseStr;
    }
    if (money < 0) {
      money = -money;
      Symbol = "负 ";
    }
    money = money.toString(); //转换为字符串
    if (money.indexOf(".") == -1) {
      IntegerNum = money;
      DecimalNum = '';
    } else {
      parts = money.split(".");
      IntegerNum = parts[0];
      DecimalNum = parts[1].substr(0, 4);
    }
    if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
      var zeroCount = 0;
      var IntLen = IntegerNum.length;
      for (var i = 0; i < IntLen; i++) {
        var n = IntegerNum.substr(i, 1);
        var p = IntLen - i - 1;
        var q = p / 4;
        var m = p % 4;
        if (n == "0") {
          zeroCount++;
        } else {
          if (zeroCount > 0) {
            ChineseStr += cnNums[0];
          }
          zeroCount = 0; //归零
          ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
        }
        if (m == 0 && zeroCount < 4) {
          ChineseStr += cnIntUnits[q];
        }
      }
      ChineseStr += cnIntLast;
      //整型部分处理完毕
    }
    if (DecimalNum != '') { //小数部分
      var decLen = DecimalNum.length;
      for (var i = 0; i < decLen; i++) {
        var n = DecimalNum.substr(i, 1);
        if (n != '0') {
          ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
      }
    }
    if (ChineseStr == '') {
      ChineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (DecimalNum == '') {
      ChineseStr += cnInteger;
    }
    ChineseStr = Symbol + ChineseStr;

    return ChineseStr;
  },
  processJinzhiNum: function (m1) {
    m1 = Number(m1)
    switch (m1) {
      case 0:
        m1 = 2;
        break;
      case 1:
        m1 = 8;
        break;
      case 2:
        m1 = 10;
        break;
      case 3:
        m1 = 16;
        break;
      default:
        m1 = m1 - 2
    }
    return m1
  },
  //控制进制数字按钮的使用，当为2进制时只能按0,1，三进制只能按0,1,2，以此类推，传入按钮键值和当前进制的index
  processJinzhiBtnValue: function (btnValue, index) {
    btnValue = btnValue+''
    var btnValue = parseInt(btnValue, 16)
    var index = this.processJinzhiNum(index)
    //console.log(btnValue,index,'btnValue,index,')
    if (btnValue < index) {
      console.log(btnValue,index,'btnValue,index,')
      return btnValue
    } else {
      wx.showToast({
        title: '键值须小于进制！',
        icon:'none'
      })
      return ''
    }


  },
  jinzhiTransfer: function (num, m, n) {
    num = num.replace(/\s/g, "")

    m = this.processJinzhiNum(m)
    n = this.processJinzhiNum(n)
    // console.log(m + "---m")
    // console.log(n + "---n")
    //var s = num + '';
    var result = parseInt(num, m).toString(n);
    return result;
  },
  formatResult: function (str) {
    // 先删除所有的空格 replace(/\s/g,'')，再每个四个字符添加空格 replace(/(.{4})/g,"$1 ")
    str = str.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
    return str
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
    //console.log(parseInt(333, 4).toString(5))
    var str = '288892471488734673jbdkjsdfkdfesf'
    //console.log(this.formatResult('233333333333323333344245'))
    //console.log(this.formatResult('23 33 333  3 333 332 3333344 245'))
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
      title: '功能很全的单位转换小程序', // 分享标题  
    desc: '一起来玩叭~', // 分享描述  
      path: 'pages/unitTransfer/unitTransfer' // 分享路径  
    }
  },
})
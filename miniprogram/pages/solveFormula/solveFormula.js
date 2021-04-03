// miniprogram/pages/solveFormula/solveFormula.js
const math = require('../util/math.min.js');
const PRECISION = 6
//console.log(math.evaluate('sqrt(-4)+3').toString())
/* 
console.log(math.evaluate('a+b',scope) .toString())
console.log(math.norm(math.evaluate('5+10i')).toString()) */

math.config({
  number: 'number'
})
/* let scope = {
  a: 3,
  b: '4'
}
 const parser = math.parser()
parser.set('h', math.complex('3'))
console.log(parser.evaluate('h / 2+a',scope).toString())
 */
const FormulaList = [
  ['A₀', 'B₀', 'C₀', 'D₀', 'E₀'],
  ['A₁', 'B₁', 'C₁', 'D₁', 'E₁'],
  ['A₂', 'B₂', 'C₂', 'D₂', 'E₂'],
  ['A₃', 'B₃', 'C₃', 'D₃', 'E₃']
]
const numList = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
]
//console.log(math.zeros(3, 3)._data)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    numList2: numList,
    paraValue: 0,
    isToZero: false,
    currentParaIndex: 0,
    currentParaId: '',
    row: 0,
    column: 0,
    process: '',
    result_fraction: 0,
    result: '',
    NumOfYuan: [0],
    NumOfCi: [0],
    indexOfShow: 0,
    indexOfYuan: 0,
    indexOfCi: 0,
    paraList: [{
      name: 'a',
      value: 0
    }, {
      name: 'b',
      value: 0
    }, {
      name: 'c',
      value: 0
    }, {
      name: 'd',
      value: 0
    }, {
      name: 'e',
      value: 0
    }, ],

    yuan: ['一'],
    ci: ['一', '二', '三', '四'],
    formulaList: ['aX+b=0', 'aX²+bX+c=0', 'aX³+bX²+cX+d=0', 'aX⁴+bX³+cX²+dX+e=0', ],
    formulaList2: ['A₀X+B₀y=C₀\nA₁X+B₁y=C₁', 'A₀X+B₀y+C₀=D₀\nA₁X+B₁y+C₁=D₁\nA₂X+B₂y+C₂=D₂', 'A₀X+B₀y+C₀+D₀=E₀\nA₁X+B₁y+C₁+D₁=E₁\nA₂X+B₂y+C₂+D₂=E₂\nA₃X+B₃y+C₃+D₃=E₃'],
    formulaList3: FormulaList
  },
  input: function (value) {
    var numList2 = this.data.numList2
    var row = this.data.row
    var column = this.data.column;

    if (value == '') {
      value = 0
    }

    numList2[row][column] = value
    console.log(numList2)

    this.setData({
      numList2
    })
  },
  //多元方程参数输入
  inputPara2: function (e) {
    var value = e.detail.value
    this.input(value)
    this.setData({
      paraValue: value,
    })
  },
  inputText: function (e) {
    var value = e.detail.value
    this.input(value)
  },
  changeColor: function () {
    this.setData({
      currentParaId: '',
    })
  },
  bindfocus: function (e) {
    var currentParaId = this.data.column
    this.setData({
      currentParaId
    })
  },

  choosePara: function (e) {
    var currentParaIndex = e.currentTarget.dataset.index
    var currentParaId = Number(e.currentTarget.id)
    this.setData({
      row: currentParaIndex,
      column: currentParaId,
      currentParaIndex,
      currentParaId,
      paraValue: this.data.numList2[currentParaIndex][currentParaId]
    })
    console.log(currentParaIndex, currentParaId)
  },

  solve: function (e) {
    var indexOfYuan = this.data.indexOfYuan

    //一元方程求解
    if (indexOfYuan == 0) {


      var paraList = this.data.paraList
      for (let index = 0; index < paraList.length; index++) {
        try {
          paraList[index].value = math.evaluate(paraList[index].value + '').toString()
        } catch (e) {
          console.log(e)
          wx.showToast({
            title: '输入有误！',
            icon: 'none'
          })
          return
        }
      }

      var a = paraList[0].value
      var b = paraList[1].value
      var c = paraList[2].value
      var d = paraList[3].value
      var e = paraList[4].value


      if (Number(a) == 0) {
        wx.showToast({
          title: 'a不能为0！',
          icon: 'none'
        })
        return
      }
      var indexOfShow = this.data.indexOfShow
      var result = 0,
        process
      let scope = {
        a: a,
        b: b,
        c: c,
        d: d,
        e: e
      }
      //  console.log(scope)

      try {
        switch (indexOfShow) {
          //一元一次
          case 0:
            var res = this.solve1Equaltion(scope)
            result = res.result
            process = res.process
            break;
            // one yuan two ci
          case 1:
            var res = this.solve2Equaltion(scope)
            result = res.result
            process = res.process
            break;
          case 2:
            var res = this.solve3Equaltion(scope)
            result = res.result
            process = res.process
            break;
          case 3:
            var res = this.solve4Equaltion(scope)
            result = res.result
            process = res.process
            break;
          default:
            break;
        }
      } catch (e) {
        console.log(e)
        wx.showToast({
          title: '输入有误！',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {

          },
          fail: () => {},
          complete: () => {}
        });
      }


      this.setData({
        process,
        result,
        paraList
        //result_fraction: math.fraction(result).toFraction()
      })

    } else {
      var numList2 = this.data.numList2
      var matrixOfA, matrixOfb = [],
        res, res2 = ''

      function solveAb(num) {
        var res
        num++
        var matrixOfA = math.zeros(num, num)._data
        var matrixOfb = []
        for (let row = 0; row < matrixOfA.length; row++) {
          try {
            
            matrixOfb.push(math.evaluate(numList2[row][num] + '').toString())
          } catch (e) {
            console.log(e)
          }
         // matrixOfb.push(numList2[row][num])
          for (let column = 0; column < matrixOfA.length; column++) {
            //matrixOfA[row][column] = numList2[row][column]
            try {
              matrixOfA[row][column] = math.evaluate(numList2[row][column] + '').toString()
            } catch (e) {
              console.log(e)
            }
          }
        }

        console.log(matrixOfA)
        console.log(matrixOfb)
        res = math.lusolve(matrixOfA, matrixOfb)
        return res
      }
      switch (indexOfYuan) {
        // 二元方程
        case 1:
          res = solveAb(1)

          break;
        case 2:
          res = solveAb(2)
          res2 = "\nZ = " + math.format(res[2][0], PRECISION).toString()
          break;
        case 3:
          res = solveAb(3)
          res2 = "\nZ = " + math.format(res[2][0], PRECISION).toString() +
            "\nK = " + math.format(res[3][0], PRECISION).toString()
          break;
        default:
          break;
      }

      var result = "X = " + math.format(res[0][0], PRECISION).toString() +
        "\nY = " + math.format(res[1][0], PRECISION).toString() + res2
      console.log(result)
      console.log(res)
      this.setData({
        result
      })
    }

  },


  clear: function (e) {
    this.setData({
      paraList: [{
        name: 'a',
        value: 0
      }, {
        name: 'b',
        value: 0
      }, {
        name: 'c',
        value: 0
      }, {
        name: 'd',
        value: 0
      }, {
        name: 'e',
        value: 0
      }, ],
      numList2: numList,
      process: '',
      result: '',
      paraValue: 0,
    })
  },
  paraDelete: function (e) {
    var id = e.currentTarget.id
    var paraList = this.data.paraList
    paraList[id].value = 0
    this.setData({
      paraList
    })
    //console.log(paraList)

  },

  solve1Equaltion: function (scope) {
    var a = scope.a
    var b = scope.b
    var result = 0,
      process
    var res = {}
    result = math.evaluate('-b / a ', scope)
    result = "X = " + math.format(result, PRECISION).toString()
    process = '① ' + a + ' * X + ' + b + '= 0\n' +
      '② ' + a + ' * X = ' + -b + '\n' +
      '③ ' + result
    res.result = result
    res.process = process
    return res
  },
  solve2Equaltion: function (scope) {
    var a = scope.a
    var b = scope.b
    var c = scope.c
    var result = 0,
      delta, x1, x2, process
    var res = {}
    delta = math.evaluate('sqrt(b * b - 4 * a * c)', scope)

    scope.delta = delta

    // console.log(scope)
    if (delta == 0) {
      result = math.evaluate('-b / a / 2', scope)
      result = 'X₁=X₂= ' + math.format(result, PRECISION).toString()

      process = '① ' + a + ' * X² + ' + b + ' * X + ' + c + '= 0\n' +
        '②  Δ = b² - 4ac = ' + b * b + ' - ' + 4 * a * c + ' = 0\n' +
        '③ ' + result + ' = -b/2a'

    } else {
      x1 = math.evaluate('(-b+delta)/2/a', scope)
      x2 = math.evaluate('(-b-delta)/2/a', scope)

      result = '   X₁= ' + math.format(x1, PRECISION).toString() +
        '\n   X₂= ' + math.format(x2, PRECISION).toString()
      if (b * b - 4 * a * c > 0) {

        process = '① ' + a + ' * X² + ' + b + ' * X + ' + c + '= 0\n' +
          '② Δ = b²- 4ac = ' + b * b + ' - ' + 4 * a * c + ' > 0\n' +
          '③ √Δ = ' + math.format(delta, PRECISION).toString() + '\n' +
          '④ 有实数解：\n' + result
      } else {
        process = '① ' + a + ' * X² + ' + b + ' * X + ' + c + '= 0\n' +
          '② Δ = b²- 4ac = ' + b * b + ' - ' + 4 * a * c + ' < 0\n' +
          '③ √Δ = ' + math.format(delta, PRECISION).toString() + '\n' +
          '④ 有复数解：\n' + result
      }

    }
    res.result = result
    res.process = process
    return res
  },
  solve3Equaltion: function (scope) {
    var a = scope.a
    var b = scope.b
    var c = scope.c
    var d = scope.d

    var result = 0,
      process, delta
    var RES = {}


    var A = math.evaluate('b*b-3*a*c', scope).toString()
    var B = math.evaluate('b*c-9*a*d', scope).toString()
    var C = math.evaluate('c*c-3*b*d', scope).toString()
    scope.A = A
    scope.B = B
    scope.C = C
    delta = math.evaluate('B*B-4*A*C', scope)
    delta = math.format(delta, PRECISION).toString()
    if (math.larger(delta, -1e-10) && math.smaller(delta, 1e-10)) {
      delta = 0
    }
    A = math.format(A, PRECISION).toString()
    B = math.format(B, PRECISION).toString()
    C = math.format(C, PRECISION).toString()
    process = '① 重根判别式：\n   A = b²-3ac = ' + A + '\n   B = bc-9ad = ' + B + '\n   C = c²-3bd = ' + C +
      '\n② 总判别式：\n' + '   Δ = B²-4AC = ' + delta

    if (Number(delta) > 0) {
      process = process + ' > 0'
    } else if (Number(delta) < 0) {
      process = process + ' < 0'
    }
    // A=B=0,用盛金公式1
    if (A == B && A == '0') {
      console.log(A, B, C, delta)
      var res = '\n③ 由于A=B=0,有三重实根,\n   根据盛金公式1：\n'
      result = math.evaluate('-b / a / 3', scope)
      result = 'X₁=X₂=X₃= ' + math.format(result, PRECISION).toString()
      process = process + res + '   -b/3/a = -c/b = -3d/c \n   =' + result

    } else if (Number(delta) == 0) {
      var X1 = math.evaluate('-b/a + B/A', scope)
      var X2 = math.evaluate('-B/A/2', scope)
      var res = '\n③ 有三个实根,其中有一个两重根,\n   根据盛金公式3：\n   X1 = -b/a + B/A\n   X2 = -B/A/2\n'
      result = '   X₁= ' + math.format(X1, PRECISION).toString() +
        '\n   X₂=X₃= ' + math.format(X2, PRECISION).toString()
      process = process + res + result
    } else if (Number(delta) > 0) {
      var Y1 = math.evaluate('A*b+3/2*a*(-B + sqrt(B*B-4*A*C))', scope)
      var Y2 = math.evaluate('A*b+3/2*a*(-B - sqrt(B*B-4*A*C))', scope)
      scope.Y1 = Y1
      scope.Y2 = Y2

      var X1 = math.evaluate('(-b-cbrt(Y1)-cbrt(Y2))/3/a', scope)
      var X2 = math.evaluate('(-2*b+cbrt(Y1)+cbrt(Y2)+sqrt(3)*(cbrt(Y1)-cbrt(Y2))*i)/6/a', scope)
      var X3 = math.evaluate('(-2*b+cbrt(Y1)+cbrt(Y2)-sqrt(3)*(cbrt(Y1)-cbrt(Y2))*i)/6/a', scope)

      var res = '\n③ 有一个实根和一对共轭虚根,\n   根据盛金公式2：\n' +
        '   Y₁ = ' + math.format(Y1, PRECISION).toString() +
        '\n   Y₂ = ' + math.format(Y2, PRECISION).toString() + '\n'

      result = '   X₁ = ' + math.format(X1, PRECISION).toString() +
        '\n   X₂ = ' + math.format(X2, PRECISION).toString() +
        '\n   X₃ = ' + math.format(X3, PRECISION).toString()
      process = process + res + result
    } else if (Number(delta) < 0) {
      var T = math.evaluate('(2*A*b-3*a*B)/(2*(A^(3/2)))', scope)
      scope.T = T
      var theta = math.evaluate('acos(T)', scope)

      scope.theta = theta
      console.log(T.toString(), scope.theta.toString())
      var X1 = math.evaluate('(-b-2*sqrt(A)*cos(theta/3))/3/a', scope)
      var X2 = math.evaluate('(-b+sqrt(A)*(cos(theta/3)+sqrt(3)*sin(theta/3)))/3/a', scope)
      var X3 = math.evaluate('(-b+sqrt(A)*(cos(theta/3)-sqrt(3)*sin(theta/3)))/3/a', scope)

      var res = '\n③ 有三个不相等的实根,\n   根据盛金公式2：\n' +
        '   T = ' + math.format(T, PRECISION).toString() +
        '\n   θ = ' + math.format(theta, PRECISION).toString() + ' = ' + math.format(theta * 180 / Math.PI, PRECISION).toString() + '°\n'

      result = '   X₁ = ' + math.format(X1, PRECISION).toString() +
        '\n   X₂ = ' + math.format(X2, PRECISION).toString() +
        '\n   X₃ = ' + math.format(X3, PRECISION).toString()
      process = process + res + result
    }


    RES.result = result
    RES.process = process
    return RES
  },
  solve4Equaltion: function (scope) {
    const parser = math.parser()
    //console.log(parser.evaluate('h / 2').toString())
    var a = scope.a
    var b = scope.b
    var c = scope.c
    var d = scope.d
    var e = scope.e
    parser.set('a', a)
    parser.set('b', b)
    parser.set('c', c)
    parser.set('d', d)
    parser.set('e', e)
    parser.set('w', math.complex(parser.evaluate('-0.5+sqrt(3)/2*i').toString()))
    var result = 0,
      sgnE,
      process
    var res = {}

    var D = parser.evaluate('3*b*b-8*a*c')
    var E = parser.evaluate('-b*b*b+4*a*b*c-8*a*a*d')
    var F = parser.evaluate('3*b^4+16*a*a*c*c-16*a*b*b*c+16*a*a*b*d-64*a*a*a*e')

    parser.set('D', D)
    parser.set('E', E)
    parser.set('F', F)

    var A = parser.evaluate('D*D-3*F')
    var B = parser.evaluate('D*F-9*E*E')
    var C = parser.evaluate('F*F-3*D*E*E')

    parser.set('A', A)
    parser.set('B', B)
    parser.set('C', C)

    var delta = parser.evaluate('B*B-4*A*C')
    if (math.larger(delta, -1e-10) && math.smaller(delta, 1e-10)) {
      delta = 0
    }
    /*     console.log('D', D)
        console.log('E', E)
        console.log('F', F)
        console.log('A', A)
        console.log('B', B)
        console.log('C', C)
        console.log('delta', delta)
     */
    A = math.format(A, PRECISION).toString()
    B = math.format(B, PRECISION).toString()
    C = math.format(C, PRECISION).toString()
    D = math.format(D, PRECISION).toString()
    E = math.format(E, PRECISION).toString()
    F = math.format(F, PRECISION).toString()
    delta = math.format(delta, PRECISION).toString()
    process = '① 重根判别式：\n   D = ' + D + '\n   E = ' + E + '\n   F = ' + F +
      '\n   A = ' + A + '\n   B = ' + B + '\n   C = ' + C +
      '\n② 总判别式：\n' + '   Δ = B²-4AC = ' + delta

    if (Number(delta) > 0) {
      process = process + ' > 0'
    } else if (Number(delta) < 0) {
      process = process + ' < 0'
    }
    if (E == 0) {
      sgnE = 0
    } else if (E > 0) {
      sgnE = 1
    } else {
      sgnE = -1
    }
    parser.set('sgnE', sgnE)


    //11111111
    if (E == F && D == E && E == 0) {
      result = parser.evaluate('-b/4/a')
      result = '   X₁=X₂=X₃=X₄= ' + math.format(result, PRECISION).toString()
      process = process + '\n③当D=E=F=0时，方程有一个四重实根：\n' + result

      //222222
    } else if (D * E * F != 0 && A == 0 && A == B && B == C) {
      var X1 = parser.evaluate('(-b*D+9*E)/4/a/D')
      var X2 = parser.evaluate('(-b*D-3*E)/4/a/D')

      result = '   X₁= ' + math.format(X1, PRECISION).toString() + '\n   X₂=X₃=X₄= ' + math.format(X2, PRECISION).toString()
      process = process + '\n③当DEF≠0，A=B=C=0时，方程有四个实根，其中有一个三重根：\n' + result
      //33333333
    } else if (E == F && D != 0 && E == 0) {
      var X1 = parser.evaluate('(-b+sqrt(D))/4/a')
      var X2 = parser.evaluate('(-b-sqrt(D))/4/a')

      result = '   X₁=X₂= ' + math.format(X1, PRECISION).toString() + '\n   X₃=X₄= ' + math.format(X2, PRECISION).toString()
      process = process + '\n③当E=F=0，D≠0时，方程有两对二重根；若D>0，根为实数；若D<0，根为虚数。\n' + result
      //444444444444
    } else if (A * B * C != 0 && delta == 0) {
      var X1 = parser.evaluate('(-b+sqrt(2*B/A)+2*A*E/B)/4/a')
      var X2 = parser.evaluate('(-b-sqrt(2*B/A)+2*A*E/B)/4/a')
      var X3 = parser.evaluate('(-b-2*A*E/B)/4/a')
      result = '   X₁= ' + math.format(X1, PRECISION).toString() + '\n   X₂= ' + math.format(X2, PRECISION).toString() +
        '\n   X₃=X₄= ' + math.format(X3, PRECISION).toString()
      process = process + '\n③方程有一对二重实根；若AB>0，则其余两根为不等实根；若AB<0，则其余两根为共轭虚根。\n' + result

    } else if (delta > 0) {
      //55555555555
      var z1 = parser.evaluate('A*D+3/2*(-B+sqrt(B*B-4*A*C))')
      var z2 = parser.evaluate('A*D+3/2*(-B-sqrt(B*B-4*A*C))')
      parser.set('z1', z1)
      parser.set('z2', z2)

      var z = parser.evaluate('D*D-D*(cbrt(z1)+cbrt(z2))+(cbrt(z1)+cbrt(z2))^2-3*A')
      parser.set('z', z)

      var X1 = parser.evaluate('(-b+sgnE*sqrt((D+cbrt(z1)+cbrt(z2))/3)+sqrt((2*D-(cbrt(z1)+cbrt(z2))+2*sqrt(z))/3))/4/a')
      var X2 = parser.evaluate('(-b+sgnE*sqrt((D+cbrt(z1)+cbrt(z2))/3)-sqrt((2*D-(cbrt(z1)+cbrt(z2))+2*sqrt(z))/3))/4/a')
      var X3 = parser.evaluate('(-b-sgnE*sqrt((D+cbrt(z1)+cbrt(z2))/3)+i*sqrt((-2*D+(cbrt(z1)+cbrt(z2))+2*sqrt(z))/3))/4/a')
      var X4 = parser.evaluate('(-b-sgnE*sqrt((D+cbrt(z1)+cbrt(z2))/3)-i*sqrt((-2*D+(cbrt(z1)+cbrt(z2))+2*sqrt(z))/3))/4/a')
      console.log('X1', X1)
      console.log('X2', X2)
      console.log('X3', X3)
      console.log('X4', X4)
      result = '   X₁= ' + math.format(X1, PRECISION).toString() + '\n   X₂= ' + math.format(X2, PRECISION).toString() +
        '\n   X₃= ' + math.format(X3, PRECISION).toString() +
        '\n   X₄= ' + math.format(X4, PRECISION).toString()
      process = process + '\n③当Δ>0时，方程有两个不等实根和一对共轭虚根。\n' + result

    } else if (delta < 0) {
      //66666666666
      var theta = parser.evaluate('acos((3*B-2*A*D)/2/A/sqrt(A))')
      parser.set('theta', theta)
      var y1 = parser.evaluate('(D-2*sqrt(A)*cos(theta/3))/3')
      var y2 = parser.evaluate('(D+sqrt(A)*(cos(theta/3)+sqrt(3)*sin(theta/3)))/3')
      var y3 = parser.evaluate('(D+sqrt(A)*(cos(theta/3)-sqrt(3)*sin(theta/3)))/3')
      parser.set('y1', y1)
      parser.set('y2', y2)
      parser.set('y3', y3)

      if (E == 0 && D > 0 && F > 0) {
        //若E=0,D>0,F>0
        var X1 = parser.evaluate('(-b+sqrt(D+2*sqrt(F)))/4/a')
        var X2 = parser.evaluate('(-b-sqrt(D+2*sqrt(F)))/4/a')
        var X3 = parser.evaluate('(-b+sqrt(D-2*sqrt(F)))/4/a')
        var X4 = parser.evaluate('(-b-sqrt(D-2*sqrt(F)))/4/a')
      } else if (E == 0 && D < 0 && F > 0) {
        //若E=0,D<0,F>0，
        var X1 = parser.evaluate('(-b+i*sqrt(-D+2*sqrt(F)))/4/a')
        var X2 = parser.evaluate('(-b-i*sqrt(-D+2*sqrt(F)))/4/a')
        var X3 = parser.evaluate('(-b+i*sqrt(-D-2*sqrt(F)))/4/a')
        var X4 = parser.evaluate('(-b-i*sqrt(-D-2*sqrt(F)))/4/a')
      } else if (E == 0 && F < 0) {
        //若E=0,F<0
        var X1 = parser.evaluate('(-2*b+sqrt(2*D+2*sqrt(A-F))+i*sqrt(-2*D+2*sqrt(A-F)))/8/a')
        var X2 = parser.evaluate('(-2*b+sqrt(2*D+2*sqrt(A-F))-i*sqrt(-2*D+2*sqrt(A-F)))/8/a')
        var X3 = parser.evaluate('(-2*b-sqrt(2*D+2*sqrt(A-F))+i*sqrt(-2*D+2*sqrt(A-F)))/8/a')
        var X4 = parser.evaluate('(-2*b-sqrt(2*D+2*sqrt(A-F))-i*sqrt(-2*D+2*sqrt(A-F)))/8/a')
      } else if (E != 0) {
        //若E≠0
        if (D > 0 && F > 0) {
          var X1 = parser.evaluate('(-b+sgnE*sqrt(y1)+(sqrt(y2)+sqrt(y3)))/4/a')
          var X2 = parser.evaluate('(-b+sgnE*sqrt(y1)-(sqrt(y2)+sqrt(y3)))/4/a')
          var X3 = parser.evaluate('(-b-sgnE*sqrt(y1)+(sqrt(y2)-sqrt(y3)))/4/a')
          var X4 = parser.evaluate('(-b-sgnE*sqrt(y1)-(sqrt(y2)-sqrt(y3)))/4/a')
        } else {
          var X1 = parser.evaluate('(-b-sqrt(y2)+(sgnE*sqrt(-y1)+sqrt(-y3))*i)/4/a')
          var X2 = parser.evaluate('(-b-sqrt(y2)-(sgnE*sqrt(-y1)+sqrt(-y3))*i)/4/a')
          var X3 = parser.evaluate('(-b+sqrt(y2)+(sgnE*sqrt(-y1)-sqrt(-y3))*i)/4/a')
          var X4 = parser.evaluate('(-b+sqrt(y2)-(sgnE*sqrt(-y1)-sqrt(-y3))*i)/4/a')
        }

      }


      /*       console.log('X1', X1)
            console.log('X2', X2)
            console.log('X3', X3)
            console.log('X4', X4) */
      result = '   X₁= ' + math.format(X1, PRECISION).toString() + '\n   X₂= ' + math.format(X2, PRECISION).toString() +
        '\n   X₃= ' + math.format(X3, PRECISION).toString() +
        '\n   X₄= ' + math.format(X4, PRECISION).toString()
      process = process + '\n③当Δ<0时，若D与F均为正数，则方程有四个不等实根；否则方程有两对不等共轭虚根\n' + result

    }
    res.result = result
    res.process = process
    return res
  },
  inputPara: function (e) {
    var id = e.target.id
    var value = e.detail.value
    var paraList = this.data.paraList

    if (value == '') {
      value = 0
    }
    paraList[Number(id)].value = value
    this.setData({
      paraList
    })
    // console.log(id, value)
    //console.log(paraList)
  },
  bindChangeYuan: function (e) {
    var indexOfYuan = e.detail.value[0]
    console.log(indexOfYuan)
    this.setData({
      indexOfYuan,
      result:'',
      process:''
    })
    this.showWhich()
  },
  bindChangeCi: function (e) {
    var indexOfCi = e.detail.value[0]
    this.setData({
      indexOfCi,
      result:'',
      process:''
    })
    this.showWhich()

  },
  showWhich: function () {
    var indexOfYuan = this.data.indexOfYuan
    var indexOfCi = this.data.indexOfCi
    if (indexOfYuan == 0) {
      this.setData({
        indexOfShow: indexOfCi
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var isShowSolveFormula = wx.getStorageSync('isShowSolveFormula')
    if (isShowSolveFormula === '') {
      wx.setStorageSync('isShowSolveFormula', true)
      isShowSolveFormula = true
    }
    if (isShowSolveFormula) {
      wx.showModal({
        title: '解方程',
        content: '此计算器可以解一元一次至一元四次方程以及多元一次方程组，上下滑动标题可切换方程',
        cancelText: '不再提醒',
        confirmText: '我知道了',
        confirmColor: '#3CC51F',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.setStorageSync('isShowSolveFormula', false)
          }
        },
        fail: function (res) {},
        complete: function (res) {},
      })
    }
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
      title: '这个计算器可以解方程~',
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
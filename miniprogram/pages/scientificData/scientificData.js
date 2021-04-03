// miniprogram/pages/scientificData/scientificData.js
var scientificData = ['光速 c 299792458',
  '光速 c 300000000',
  '万有引力常数 G 6.6738480e-11',
  '普朗克常量 h 6.626069311e-34',
  '约化普朗克常数 h 1.05457172647e-34',
  '摩尔质量 Mu 1e-3', '摩尔质量C12 1.2e-2',
  '重力常数	g 9.80665', '标准大气压 atm 101325',
  '磁常数 μ0 1.2566370614e-6', '电常数 ε0 8.854187817e-12',
  '真空阻抗 Z0 376.730313461', '库伦 κ 8.9875517873681764e9',
  '元电荷 e 1.60217656535e-19', '玻尔磁子 μB 9.2740096820e-24',
  '电导量子 G0 7.748091734625e-5', '磁通量量子 φ0 2.06783375846e-15',
  '核子距 μN 5.0507835311e-27', '克里青 RK 25812.807443484',
  '玻尔半径 a0 5.291772109217e-11', '经典电子半径 re 2.817940326727e-15',
  '电子质量 me 9.1093829140e-31', '费米耦合 GF 1.1663645e-5',
  '精细结构 α 7.297352569824e-3', '哈特里能量 Eh 4.3597443419e-18',
  '质子质量 mp 1.67262177774e-27', '氘核质量 md 3.3435830926e-27',
  '中子质量 mn 1.6749271613e-27', '循环量子 h/(2me) 3.636947552024e-4',
  '里德伯 R∞ 10973731.56853955', '汤姆森横断面 6.65245873413e-29',
  '弱混合角度 0.222321', '埃菲莫夫因子 22.7',
  '原子质量 mu 1.66053892173e-27', '阿伏加德罗 NA 6.0221412927e23',
  '玻尔兹曼常数 k 1.380648813e-23',
  '法拉第 F 96485.336521', '第一辐射 c1 3.7417715317e-16',
  '洛施密特	n0 2.686780524e25', '摩尔体积 Vm 2.241396820e-10',
  '气体常数 R 8.314462175', 'sackurTetrode -1.164870823',
  '摩尔普朗克常数 NA*h 3.990312717628e-10', '二次辐射 c2 1.438777013e-2',
  'Stefan-Boltzmann常数 σ 5.67037321e-8', 'wienDisplacement b 2.897772126e-3',
  '普朗克长度 lP 1.61619997e-35', '普朗克时间 tP 5.3910632e-44',
  '普朗克质量 mP 2.1765113e-8', '普朗克电荷 qP 1.87554595641e-18',
  '普朗克温度 TP 1.41683385e+32',
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: '',
    num: '0',
    array: [],
    slideButtons: [{
      text: '选用',
      extClass: 'test'
    }, {
      type: 'warn',
      text: '删除',
      extClass: 'test'
    }],

  },
  clear: function (e) {
    var that = this
    wx.showModal({
      title: '清除记录',
      content: '是否清除所有历史记录？\n注：向左滑动可逐个删除记录',
      cancelText: '取消',
      confirmText: '确定',
      success(res) {
        if (res.confirm) {
          var array = []
          wx.setStorageSync('historyArr', array)
          that.setData({
            array
          })

        } else if (res.cancel) {
         // console.log('用户点击取消')
        }

      },
      fail: function (res) {},
      complete: function (res) {},
    })

  },
  slideButtonTap: function (e) {
    console.log(e)
    var id = Number(e.currentTarget.id)
    var index = e.detail.index
    if (index == 0) {
      this.test(e)
    } else if (index == 1) {
      var historyArr = wx.getStorageSync('historyArr')
      historyArr.splice(id, 1)
      wx.setStorageSync('historyArr', historyArr)
    }
    this.setData({
      array: historyArr
    })


  },
  test: function (e) {
    //console.log(e) 
    const eventChannel = this.getOpenerEventChannel()
    var index = e.currentTarget.id
    var data = this.data.array[index]

    if (this.data.message == 'history') {
      eventChannel.emit('getHistoryData', {
        data: data
      });
    } else {
      data = data.split(' ')
      var numData = data[data.length - 1]
      eventChannel.emit('getScientifiData', {
        data: numData
      });

    }
    wx.navigateBack({
      complete: (res) => {
        /*         wx.showToast({
                  title: data[0],
                }) */
      },
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    //console.log(option)
    var that = this
    var message = option.value
    var dataArr = ''
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      //console.log(data.data)
     // message = data.data
      that.setData({
        message: data.data
      })
    })
//console.log(message,'???---')
    if (message == 'history') {
      dataArr = wx.getStorageSync('historyArr')
     // console.log('???')
    } else {
      dataArr = scientificData
     // console.log('------')
    }
    this.setData({
      array: dataArr
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

  }
})
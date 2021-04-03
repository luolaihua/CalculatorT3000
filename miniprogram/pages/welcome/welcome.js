// miniprogram/pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'5',//倒计时初始值
    timer:''//定时器编号，这个值可以传递给clearInterval来取消该定时

  },
  //倒计时函数
  countDowm:function(){
    let that = this;
    //获取倒计时初始值
    let countDownNum = that.data.time;
    that.setData({
      timer:setInterval(
        function(){
          //开始倒计时，并且刷新data中的time数据
          countDownNum--;
          that.setData({
            time:countDownNum
          });
          //如果时间为0则取消倒计时------
          if(countDownNum==0){
            clearInterval(that.data.timer)
          }
        },1000
      )
    })
  },
  bindtap:function(e){
    wx.switchTab({
      url: '../unitTransfer/unitTransfer',
    })
  },
  /**
   * 生命周期函数--监听页面加载  84984816515648e4f894w8f48wef
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
    this.countDowm();
    setTimeout(jump,5000);
    function jump(){
      wx.switchTab({
        url: '../unitTransfer/unitTransfer',
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏66666
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
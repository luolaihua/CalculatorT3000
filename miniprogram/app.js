//app.js
//var plugin = requirePlugin("myPlugin");
App({
  globalData:{
    isVibrate:false,
    precision:6
  },
  data() {
    return {
      backgroundHeight: '',
      statusBarHeight: ''
    }
  },

  onLaunch: function () {

    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
      var isVibrate_setting = wx.getStorageSync('isVibrate_setting')
      if (isVibrate_setting === '') {
        wx.setStorageSync('isVibrate_setting', false)
        isVibrate_setting = false
      }
      this.globalData.isVibrate = isVibrate_setting
    }
/*     plugin.init({

      appid: "dzG0R4qAT4APJuy5awQ1Kq1xsQ45Rn", //小程序示例账户，仅供学习和参考
      openid: "",//用户的openid，非必填，建议传递该参数
      success: () => {}, //非必填
      fail: error => {}, //非必填
     // guideList: ["您好"],
      //textToSpeech: true, //默认为ture打开状态
     // background: "rgba(247,251,252,1)",
      guideCardHeight: 40,
      //operateCardHeight: 145,
      history: false,
      historySize: 60,
     // navHeight: 0,
      robotHeader:
        "https://res.wx.qq.com/mmspraiweb_node/dist/static/miniprogrampageImages/talk/leftHeader.png",
      userHeader:
        "https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/t1.jpg?sign=ab17220fa4085ed0937b7013a41a0426&t=1583908487",
      userName: "T3000"
  }); */
/*   const txt =
"在微信智言与微信智聆两大技术的支持下，微信AI团队推出了“微信对话开放平台”和“腾讯小微”智能硬件两大核心产品。微信支付团队最新发布的“微信青蛙Pro”在现场设置了体验区，让大家感受AI认脸的本事。";

plugin.api.nlp("tokenize", {q: txt}).then(res => {
    console.log("tokenize result : ", res)
})
plugin.send({
  query: "你好",
  success: res => {
    console.log(res);
  },
  fail: error => {}
});
var t = "帮我订两张后天上午的火车票";

plugin.api.nlp('ner', {q: t}).then(res => {
    console.log("ner result : ", res)
})
 */
    //this.globalData = {}
  }
})

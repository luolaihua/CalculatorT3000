// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  

  try {
    console.log(event)
    console.log(wxContext)
    const result = await cloud.openapi.subscribeMessage.send({
        touser: wxContext.OPENID,
        page: 'pages/index/index',
        lang: 'zh_CN',
        data: {
          thing1: {
            value: event.thing1+'6'
          },
          number2: {
            value: event.number2
          },
          time3: {
            value: '2019年10月1日'
          },
        },
        templateId: 'v-91v-ZZU9IV2isP7r341HmKTRJ3GJehx_A6l8MxmGE',
        miniprogramState: 'developer'
      })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var id=wxContext.OPENID,topListData
  var type = event.type
  console.log(type)
  if(type==''){
    type='maxNum'
  }

  //能一次取一百条,目前够用
  await db.collection('topList').orderBy(type, 'desc').get().then(res => {
    // res.data 包含该记录的数据
    //console.log(res.data)
    topListData =res.data
  })
return topListData

}
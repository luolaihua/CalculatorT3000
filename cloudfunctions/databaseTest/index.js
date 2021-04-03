// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  throwOnNotFound: false
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  requestType = event.requestType


        //文本内容安全检测
  if(requestType=='msgSecCheck'){

    console.log(event.content)
   try {
      let result = await cloud.openapi.security.msgSecCheck({
        content: event.content
      })
      console.log(result)
      if (result.errCode == 0) {
        return true;
      }
      return false
    } catch (err) {
      return false;
    } 
  }else if(requestType=='airCropImage'){

    let fileId = event.file;
  // 获取文件的临时连接
  let tempUrl = await cloud.getTempFileURL({
    fileList: [fileId]
  })
  let newUrl = tempUrl.fileList[0].tempFileURL;
  // 对图片进行裁剪
  let cropResult = await cloud.openapi.img.aiCrop({
    imgUrl:newUrl,
    ratios:'1.0'//裁剪比例
  })
  return cropResult
  }else if(requestType=='imgSecCheck'){
    const fileID = event.fileID
    const res = await cloud.downloadFile({
    fileID: fileID,
  })
  const buffer = res.fileContent

  //var buffer = new Buffer(event.file, 'base64')
  try {
    var result = await cloud.openapi.security.imgSecCheck({
      media: {
        contentType: "image/png",
        value: buffer
      }
    })
    if (result.errCode == 0) {
      return true;
    }
    return false
  } catch (err) {
    return err
  }
  }

//图像内容安全检测
/*   const fileID = 'cloud://luo-r5nle.6c75-luo-r5nle-1301210100/animalsPic/cangshu.png'
  const res = await cloud.downloadFile({
    fileID: fileID,
  })
  //const buffer = res.fileContent

  var buffer = new Buffer(event.file, 'base64')
  try {
    var result = await cloud.openapi.security.imgSecCheck({
      media: {
        contentType: "image/png",
        value: buffer
      }
    })
    return {
      result,
      test: "66666666"
    }
  } catch (err) {
    return err
  } */


}
const app = getApp()
/**
 * 珊瑚图片内容安全
 */
async function doImgSecCheck(ImageUrl) {
  var isSafe
  await wx.serviceMarket.invokeService({
    service: 'wxee446d7507c68b11',
    api: 'imgSecCheck',
    data: {
      "Action": "ImageModeration",
      "Scenes": ["PORN", "POLITICS", "TERRORISM", "TEXT"],
      "ImageUrl": ImageUrl,
      "ImageBase64": "",
      "Config": "",
      "Extra": ""
    },
  }).then(res => {
    var POLITICS = res.data.Response.PoliticsResult.Suggestion == "PASS" ? true : false
    var PORN = res.data.Response.PornResult.Suggestion == "PASS" ? true : false
    var TERRORISM = res.data.Response.TerrorismResult.Suggestion == "PASS" ? true : false
    var TEXT = res.data.Response.TextResult.Suggestion == "PASS" ? true : false
    if (POLITICS && PORN && TERRORISM && TEXT) {
      isSafe = true
      //console.log('图片内容安全')
    } else {
      isSafe = false
      //console.log('图片内容不安全')
    }
    //console.log(POLITICS, PORN, TERRORISM, TEXT)
    // console.log(res.data.Response)

  })
  return isSafe
}
/**
 * 珊瑚文本内容安全
 */
async function doMsgSecCheck(content) {
  var test
  await wx.serviceMarket.invokeService({
    service: 'wxee446d7507c68b11',
    api: 'msgSecCheck',
    data: {
      "Action": "TextApproval",
      "Text": content
    },
  }).then(res => {
    // console.log(res.data.Response.EvilTokens)
    if (res.data.Response.EvilTokens.length == 0) {
      // console.log('内容安全')
      test = true
    } else {
      // console.log("内容不安全")
      test = false
    }
  })
  return test
}
/**
 * 安全检测头像和网名
 * @param {头像链接} avatarUrl 
 * @param {网名} nickName 
 */
async function checkImgAndMsg(avatarUrl, nickName) {
  var t1, t2
  //安全检测
  await doImgSecCheck(avatarUrl).then(res => {
    // console.log(res, 'imgSafe')
    if (res) {
      console.log('imgSafe')
    } else {
      console.log('不安全头像')
    }
    t1 = res
  })
  await doMsgSecCheck(nickName).then(res => {
    // console.log(res, 'msgSafe')
    if (res) {
      console.log('msgSafe')
    } else {
      console.log('不安全网名')
    }
    t2 = res
  })
  return t1 && t2
}
/**
 * 获取openId
 * @param {} isSafe 
 */
async function getOpenId(isSafe) {
  if (isSafe) {
    const {
      result
    } = await wx.cloud.callFunction({
      name: 'login',
    })
    wx.setStorageSync('openId', result.userInfo.openId)
    console.log(result.userInfo.openId)

    return result.userInfo.openId
  } else {
    wx.setStorageSync('openId', '')
  }

}
/**
 * 
 * @param {数据来源:fromBoringTime,fromIqGame} type 
 * @param {榜单数据} maxNum 
 */
async function setTopList(type, maxNum) {
  var maxData = {}
  const db = wx.cloud.database()
  maxData.nickName = wx.getStorageSync('nickName')
  maxData.avatarUrl = wx.getStorageSync('avatarUrl')
  maxData.chuangGuanNum = wx.getStorageSync('successNum')
  maxData.maxNum = wx.getStorageSync('boringTimeMax')

  //判断闯关数和最大无聊时间是否为空，为空就初始化
  if (maxData.chuangGuanNum == '') {
    maxData.chuangGuanNum = 1
    wx.setStorageSync('successNum', 1)
  }
  if (maxData.maxNum == '') {
    maxData.maxNum = 0
    wx.setStorageSync('boringTimeMax', 0)
  }

  //判断数据来自闯关还是无聊
  if (type == "fromBoringTime") {
    maxData.maxNum = maxNum
  } else if (type == "fromIqGame") {
    maxData.chuangGuanNum = maxNum
  }

  //默认选项
  var id = wx.getStorageSync('openId')
  if (id == '') {
    id = '666666666666666'
    maxData.nickName = '互联网冲浪选手'
    maxData.avatarUrl = 'https://6c75-luo-r5nle-1301210100.tcb.qcloud.la/images/f8.png?sign=6af2214187aa5d05c4e86578adf43301&t=1586361797'
  }
  await db.collection('topList').doc(id).set({
    data: maxData,
    success: function (res) {
      console.log(res)
    }
  })
}

function vibrate(){
  if(app.globalData.isVibrate){
    wx.vibrateShort({
      complete: (res) => {},
    })
  }
}

/**
 * 下载保存一个文件
 */
function downloadSaveFile(obj) {
  let that = this;
  let success = obj.success;
  let fail = obj.fail;
  let id = "";
  let url = obj.url;
  if (obj.id){
      id = obj.id;
  }else{
      id = url;
  }

  // console.info("%s 开始下载。。。", obj.url);
  wx.cloud.downloadFile({
    fileID: obj.url,
      success: function (res) {
          wx.saveFile({
              tempFilePath: res.tempFilePath,
              success: function (result) {
                  result.id = id;
                  if (success) {
                      success(result);
                  }
              },
              fail: function (e) {
                  console.info("保存一个文件失败");
                  if (fail) {
                      fail(e);
                  }
              }
          })

      },
      fail: function (e) {
          console.info("下载一个文件失败");
          if (fail) {
              fail(e);
          }

      }
  })
}
/**
* 多文件下载并且保存，强制规定，必须所有文件下载成功才算返回成功
*/
function downloadSaveFiles(obj) {
   console.info("准备下载。。。");
  let that = this;
  let success = obj.success; //下载成功
  let fail = obj.fail; //下载失败
  let urls = obj.urls;  //下载地址 数组，支持多个 url下载 [url1,url2]
  let savedFilePaths = new Map();
  let urlsLength = urls.length;  // 有几个url需要下载

  for (let i = 0; i < urlsLength; i++) {
      downloadSaveFile({
          url: urls[i],
          success: function (res) {
              //console.dir(res);
              //一个文件下载保存成功
              let savedFilePath = res.savedFilePath;
                              
              savedFilePaths.set(res.id, res);
              console.info("savedFilePath:%s", savedFilePath);
              if (savedFilePaths.size == urlsLength) { //如果所有的url 才算成功
                  if (success){
                      success(savedFilePaths)
                  }
                  
              }
          },
          fail: function (e) {
              console.info("下载失败");
              if (fail) {
                  fail(e);
              }

          }
      })

  }
}


module.exports = {
  downloadSaveFiles,
  downloadSaveFile,
  doImgSecCheck,
  doMsgSecCheck,
  getOpenId,
  setTopList,
  checkImgAndMsg,
  vibrate
}
/*   wx.getImageInfo({
    src: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL1L9LJPQxXJcBXZSEDiagYDYemEgucElq3ibMnLyzgzCuVGibiaQ4wu73wDiayicDhC1gT9eSQKFyt3SUA/132',
    success: function (res) {       //访问存放微信用户头像的Url 
      console.log(res.path)
      wx.getFileSystemManager().readFile({
        filePath: res.path, //选择图片返回的相对路径
        encoding: 'base64', //编码格式
        success: res => { //成功的回调
          wx.cloud.callFunction({
            name:'databaseTest',
            data:{
              //path: 'pictures/' + util.vcode(new Date())+index+'.png',
              file: res.data
            },
            success(_res){    
              console.log(_res)
            },fail(_res){
              console.log(_res)
            }
          })
        }
      })
  
  
  
      wx.cloud.uploadFile({
        cloudPath:'test.png',
        filePath:res.path,
        success: res => {
          console.log('[上传文件] 成功：', res)
           wx.cloud.callFunction({
            name: 'imgSecCheck',
            data: {
              contentType: contentType,
              fileID: res.fileID
            }
          }).then(res => {
            console.log("检测结果", res.result);
             if (res.result.errCode == 0) {
                 wx.showToast({
                  icon: 'none',
                  title: '图片正常',
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: '图片含有违法信息，请换张说明图',
              })
            }
          }) 
        },
        fail: e => {
          console.error('[上传文件] 失败：', e)
        }
      }) 

    }
  }) 
   */
/* wx.cloud.uploadFile({
  cloudPath:'test.png',
  filePath:'',
  success: res => {
    console.log('[上传文件] 成功：', res)
    wx.cloud.callFunction({
      name: 'imgSecCheck',
      data: {
        contentType: contentType,
        fileID: res.fileID
      }
    }).then(res => {
      console.log("检测结果", res.result);
       if (res.result.errCode == 0) {
           wx.showToast({
            icon: 'none',
            title: '图片正常',
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '图片含有违法信息，请换张说明图',
        })
      }
    }) 
  },
  fail: e => {
    console.error('[上传文件] 失败：', e)
  }
}) */
//
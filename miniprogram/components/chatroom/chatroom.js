const FATAL_REBUILD_TOLERANCE = 10
const SETDATA_SCROLL_TO_BOTTOM = {
  //scrollTop 设置滚动条的位置，为零时在顶部，为很大时在底部
  scrollTop: 100000,
  scrollWithAnimation: true,
}

Component({
  properties: {
    envId: String,
    collection: String,
    groupId: String,
    chatPeopleNum:Number,
    groupName: String,
    userInfo: Object,
    openId: String,
    onGetUserInfo: {
      type: Function,
    },
    getOpenID: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
  },

  data: {
    chats: [],
    textInputValue: '',
    //openId: '',
    scrollTop: 0,
    scrollToMessage: '',
    hasKeyboard: false,
  },

  methods: {
//删除消息
    delMsg(e) {
      var id = Number(e.currentTarget.id)
      var chat = this.data.chats
      var msgType = chat[id].msgType
      var _id = chat[id]._id
      var textContent = chat[id].textContent
      if (msgType == 'image') {
        textContent = 'image'
      }

      const {
        collection
      } = this.properties
      const db = this.db
      const _ = db.command
      var that = this


      wx.showModal({
        title: '删除该内容？',
        content: textContent,
        success(res) {
          if (res.confirm) {
            //console.log('用户点击确定')
            db.collection(collection).doc(_id).remove({
              success: function (res) {
               // console.log(res, 'remove!')
                that.initRoom()
                wx.showToast({
                  title: '删除成功！'
                })
              },
              fail: function (res) {
                wx.showToast({
                  title: '无权限删除！'
                })
              },
            })
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })


    },


    onGetUserInfo(e) {
      this.properties.onGetUserInfo(e)
    },

    getOpenID() {

      return this.properties.getOpenID()
    },
    //更新房间人数
    refresh(){
      var that = this
      const db = wx.cloud.database()
      db.collection('chatPeopleNum').doc('number').get({
        success: function (res) {
          // res.data 包含该记录的数据
          that.setData({
            chatPeopleNum: res.data.num
          })
          //console.log(res.data.num + 'res.data.num**********')
        },
        fail: function (res) {
          console.log(res)
        }
      })
      this.initRoom()

    },

    mergeCommonCriteria(criteria) {
      //console.log(this.data,'***************')
      return {
        groupId: this.data.groupId,
        ...criteria,
      }
    },

    async initRoom() {
      this.try(async () => {
        await this.initOpenID()
        //envId可以省略
        //colection为集合名，也就是chatroom
        const {
          envId,
          collection
        } = this.properties
        const db = this.db = wx.cloud.database({
          env: envId,
        })

        //指令都暴露在 db.command 对象上
        const _ = db.command

        const {
          data: initList
        } = await db.collection(collection)
          .where(
            this.mergeCommonCriteria()
          )
          .orderBy('sendTimeTS', 'desc').get() //order只能取 asc 或 desc,升序、降序

        console.log('init query chats', initList)

        this.setData({
          chats: initList.reverse(),
          scrollTop: 10000,
        })
        //一进入聊天室就监听最新的信息，当前
        this.initWatch(initList.length ? {
          //最新的信息
          sendTimeTS: _.gt(initList[initList.length - 1].sendTimeTS),
        } : {})
      }, '初始化失败')
    },

    async initOpenID() {
      return this.try(async () => {
        const openId = await this.getOpenID()


        /*         this.setData({
                  openId,
                }) */
      }, '初始化 openId 失败')
    },

    async initWatch(criteria) {
      this.try(() => {
        const {
          collection
        } = this.properties
        const db = this.db
        const _ = db.command
        //criteria为发送的时间
        console.warn(`开始监听`, criteria)
        this.messageListener = db.collection(collection).where(this.mergeCommonCriteria(criteria)).watch({
          onChange: this.onRealtimeMessageSnapshot.bind(this),
          onError: e => {
            if (!this.inited || this.fatalRebuildCount >= FATAL_REBUILD_TOLERANCE) {
              this.showError(this.inited ? '监听错误，已断开' : '初始化监听失败', e, '重连', () => {
                this.initWatch(this.data.chats.length ? {
                  sendTimeTS: _.gt(this.data.chats[this.data.chats.length - 1].sendTimeTS),
                } : {})
              })
            } else {
              this.initWatch(this.data.chats.length ? {
                sendTimeTS: _.gt(this.data.chats[this.data.chats.length - 1].sendTimeTS),
              } : {})
            }
          },
        })
      }, '初始化监听失败')
    },

    onRealtimeMessageSnapshot(snapshot) {
      console.warn(`收到消息`, snapshot)

      if (snapshot.type === 'init') {
        this.setData({
          chats: [
            ...this.data.chats,
            ...[...snapshot.docs].sort((x, y) => x.sendTimeTS - y.sendTimeTS),
          ],
        })
        this.scrollToBottom()
        this.inited = true
      } else {
        let hasNewMessage = false
        let hasOthersMessage = false
        const chats = [...this.data.chats]
        for (const docChange of snapshot.docChanges) {
          switch (docChange.queueType) {
            case 'enqueue': {
              hasOthersMessage = docChange.doc._openid !== this.data.openId
              const ind = chats.findIndex(chat => chat._id === docChange.doc._id)
              if (ind > -1) {
                if (chats[ind].msgType === 'image' && chats[ind].tempFilePath) {
                  chats.splice(ind, 1, {
                    ...docChange.doc,
                    tempFilePath: chats[ind].tempFilePath,
                  })
                } else chats.splice(ind, 1, docChange.doc)
              } else {
                hasNewMessage = true
                chats.push(docChange.doc)
              }
              break
            }
          }
        }
        this.setData({
          chats: chats.sort((x, y) => x.sendTimeTS - y.sendTimeTS),
        })
        if (hasOthersMessage || hasNewMessage) {
          this.scrollToBottom()
        }
      }
    },

    async onConfirmSendText(e) {
      this.try(async () => {
        if (!e.detail.value) {
          return
        }

        const {
          collection
        } = this.properties
        const db = this.db
        const _ = db.command

        const doc = {
          _id: `${Math.random()}_${Date.now()}`,
          groupId: this.data.groupId,
          avatar: this.data.userInfo.avatarUrl,
          nickName: this.data.userInfo.nickName,
          msgType: 'text',
          textContent: e.detail.value,
          sendTime: new Date(),
          sendTimeTS: Date.now(), // fallback
        }

        this.setData({
          textInputValue: '',
          chats: [
            ...this.data.chats,
            {
              ...doc,
              _openid: this.data.openId,
              writeStatus: 'pending',
            },
          ],
        })

        this.scrollToBottom(true)

        await db.collection(collection).add({
          data: doc,
        })

        this.setData({
          chats: this.data.chats.map(chat => {
            if (chat._id === doc._id) {
              return {
                ...chat,
                writeStatus: 'written',
              }
            } else return chat
          }),
        })
      }, '发送文字失败')
    },

    async onChooseImage(e) {
      wx.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        success: async res => {
          const {
            envId,
            collection
          } = this.properties
          const doc = {
            _id: `${Math.random()}_${Date.now()}`,
            groupId: this.data.groupId,
            avatar: this.data.userInfo.avatarUrl,
            nickName: this.data.userInfo.nickName,
            msgType: 'image',
            sendTime: new Date(),
            sendTimeTS: Date.now(), // fallback
          }

          this.setData({
            chats: [
              ...this.data.chats,
              {
                ...doc,
                _openid: this.data.openId,
                tempFilePath: res.tempFilePaths[0],
                writeStatus: 0,
              },
            ]
          })
          this.scrollToBottom(true)

          const uploadTask = wx.cloud.uploadFile({
            cloudPath: `${this.data.openId}/${Math.random()}_${Date.now()}.${res.tempFilePaths[0].match(/\.(\w+)$/)[1]}`,
            filePath: res.tempFilePaths[0],
            config: {
              env: envId,
            },
            success: res => {
              this.try(async () => {
                await this.db.collection(collection).add({
                  data: {
                    ...doc,
                    imgFileID: res.fileID,
                  },
                })
              }, '发送图片失败')
            },
            fail: e => {
              this.showError('发送图片失败', e)
            },
          })

          uploadTask.onProgressUpdate(({
            progress
          }) => {
            this.setData({
              chats: this.data.chats.map(chat => {
                if (chat._id === doc._id) {
                  return {
                    ...chat,
                    writeStatus: progress,
                  }
                } else return chat
              })
            })
          })
        },
      })
    },

    onMessageImageTap(e) {
      wx.previewImage({
        urls: [e.target.dataset.fileid],
      })
    },

    scrollToBottom(force) {
      if (force) {
        console.log('force scroll to bottom')
        this.setData(SETDATA_SCROLL_TO_BOTTOM)
        return
      }

      this.createSelectorQuery().select('.body').boundingClientRect(bodyRect => {
        this.createSelectorQuery().select(`.body`).scrollOffset(scroll => {
          if (scroll.scrollTop + bodyRect.height * 3 > scroll.scrollHeight) {
            console.log('should scroll to bottom')
            this.setData(SETDATA_SCROLL_TO_BOTTOM)
          }
        }).exec()
      }).exec()
    },
    //滚动到顶部时触发
    async onScrollToUpper() {
      if (this.db && this.data.chats.length) {
        const {
          collection
        } = this.properties
        const _ = this.db.command
        const {
          data
        } = await this.db.collection(collection).where(this.mergeCommonCriteria({
          sendTimeTS: _.lt(this.data.chats[0].sendTimeTS),
        })).orderBy('sendTimeTS', 'desc').get()
        this.data.chats.unshift(...data.reverse())
        this.setData({
          chats: this.data.chats,
          scrollToMessage: `item-${data.length}`,
          scrollWithAnimation: false,
        })
      }
    },

    async try (fn, title) {
      try {
        await fn()
      } catch (e) {
        this.showError(title, e)
      }
    },

    showError(title, content, confirmText, confirmCallback) {
      console.error(title, content)
      wx.showModal({
        title,
        content: content.toString(),
        showCancel: confirmText ? true : false,
        confirmText,
        success: res => {
          res.confirm && confirmCallback()
        },
      })
    },
  },

  ready() {
    global.chatroom = this
    this.initRoom()
    this.fatalRebuildCount = 0
  },
})
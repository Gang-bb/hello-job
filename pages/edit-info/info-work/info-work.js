// pages/edit-info/info-work/info-work.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    min: 0,
    max: 500,
    //页面数据
    data: {
      userId: "",
      company: "",
      startTime: "",
      endTime: "",
      experience: "",
    },
    getid:"",
    // 时间选择器参数
    type: 2,
    startYear: 1980,
    endYear: 2030,
    cancelColor: "#888",
    color: "#f37b1d",
    setDateTime: "2020/04/23",
    result: "",
    select: "1",
  },
  // 显示时间选择器
  show: function (e) {
    console.log(e)
    this.setData({
      cancelColor: "#888",
      color: "#f37b1d",
      setDateTime: "2020/04/23",
      startYear: 1980,
      endYear: 2020,
      select: e.currentTarget.dataset.id
    })
    this.dateTime.show();
  },
  // 改变时间
  change: function (e) {
    if (this.data.select == '1') {
      this.setData({
        'data.startTime': e.detail.result
      })
    }
    if (this.data.select == '2') {
      this.setData({
        'data.endTime': e.detail.result
      })
    }

  },
  // 添加函数封装
  addData() {
    var _this = this
    console.log(_this.data.data)
    wx.showModal({
      title: '提示',
      content: '确定提交信息吗？',
      confirmColor: "#f37b1d",
      success(res) {
        if (res.confirm) {
          // 提交添加信息
          wx.request({
            url: getApp().globalData.baseURL + '/resume/add',
            method: 'POST',
            data: {
              "id": _this.data.data.userId,
              "data": _this.data.data,
              "type": 2
            },
            success(res) {
              if (res.statusCode == 200) {
                wx.showToast({
                  title: '提交成功',
                  icon: 'none',
                })
                // 清空数据
                for (let key in _this.data.data) {
                  _this.setData({
                    ['data.' + key + '']: ""
                  })

                }
              } else {
                wx.showToast({
                  title: '提交失败，请联系管理员',
                  icon: 'none',
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 修改函数封装
  mofifyData() {
    var _this = this
    wx.showModal({
      title: '提示',
      content: '确定修改信息吗？',
      confirmColor: "#f37b1d",
      success(res) {
        if (res.confirm) {
          // 修改添加信息
          wx.request({
            url: getApp().globalData.baseURL + '/resume/modify',
            method: 'POST',
            data: {
              "id": _this.data.getid,
              "data": _this.data.data,
              "type": 2
            },
            success(res) {
              if (res.statusCode == 200) {
                wx.showToast({
                  title: '提交成功',
                  icon: 'none',
                })
              } else {
                wx.showToast({
                  title: '提交失败，请联系管理员',
                  icon: 'none',
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 表单提交和重置
  formSubmit: function (e) {
    // 表单赋值
    console.log(e)
    for (let key in e.detail.value) {
      this.setData({
        ['data.' + key + '']: e.detail.value[key]
      })

    }
    // 判空
    for (let key in this.data.data) {
      if (this.data.data[key] == '') {
        wx.showToast({
          title: '请填写完整的信息再提交',
          icon: 'none',
        })
        return
      }
    }
    // 条件判断是修改还是添加
    if (this.data.getid) {
      //修改
      console.log('修改')
      this.mofifyData()
    }
    if (!this.data.getid) {
      //添加
      console.log('增加')
      this.addData()
    }
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  // 输入经历
  inputs: function (e) {
    var value = e.detail.value;
    var len = parseInt(value.length);
    if (len > this.data.max) return;

    this.setData({
      currentWordNumber: len,
      'data.experience': value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取uid
    try {
      var value = wx.getStorageSync('uid')
      if (value) {
        this.setData({
          'data.userId': value
        });
      }
    } catch (e) {
      console.log(e)
    }
    // 获取页面传参
    if (options.getid) {
      this.setData({
        getid: options.getid
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dateTime = this.selectComponent("#tui-dateTime-ctx")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    //如果界面是修改界面 获取数据
    if (_this.data.getid) {
      wx.request({
        url: getApp().globalData.baseURL + '/resume/id',
        method: 'GET',
        data: {
          "id": _this.data.getid,
          "type": 2
        },
        success(res) {
          _this.setData({
            data: res.data.data,
          });

        }
      })
    }
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
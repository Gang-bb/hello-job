// pages/edit-info/info-self/info-self.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    min: 0,
    max: 500,
    selfIntroduction:"",
    userId:""
  },
  // 点击重置
  reset(e) {
    this.setData({
      selfIntroduction: ""
    });
  },
  // 点击提交
  submit(e) {
    var _this = this
    console.log(this.data)
    wx.request({
      url: getApp().globalData.baseURL + '/resume/modify',
      method: 'POST',
      data: {
        "id": _this.data.userId,
        "self": _this.data.selfIntroduction,
        "type": 4
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
  },
  inputs: function (e) {
    var value = e.detail.value;
    var len = parseInt(value.length);
    if (len > this.data.max) return;

    this.setData({
      currentWordNumber: len,
      selfIntroduction: value
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
          userId: value
        });
      }
    } catch (e) {
      console.log(e)
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
    var _this = this
    wx.request({
      url: getApp().globalData.baseURL + '/resume/id',
      method: 'GET',
      data: {
        "id": _this.data.userId,
        "type": 4
      },
      success(res) {
        if (res.data.code == 10001){
          _this.setData({
            selfIntroduction: '',
          });
        }else{
          _this.setData({
            selfIntroduction: res.data.data.selfIntroduction,
          });
        }
        

      }
    })
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
// pages/signup/signup.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    min: 0,
    max: 200,
    jobId:0,
    message:""
  },
  inputs: function (e) {
    var value = e.detail.value;
    var len = parseInt(value.length);
    if (len > this.data.max) return;

    this.setData({
      currentWordNumber: len,
      message: value
    });
  },
  signup(){
    var _this = this
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
    wx.request({
      url: app.globalData.baseURL + '/job/signup',
      method: 'POST',
      data: {
        "userId": _this.data.userId,
        "jobId": _this.data.jobId,
        "message": _this.data.message
      },
      success(res) {
        if(res.data.code==40003){
          wx.showToast({
            title: '抱歉报名名额已满',
            icon: 'none'
          })
        } else if(res.data.code == 40004){
          wx.showToast({
            title: '报名失败，该用户已报名过该工作',
            icon: 'none'
          })
        }else{
          wx.showToast({
            title: '报名成功',
            icon: 'none'
          })
          wx.reLaunch({
            url: '../result/result'
          })
        }
      }  
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(parseInt(options.id))
    this.setData({
      jobId: options.id
    });
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
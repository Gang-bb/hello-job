// pages/mine/trackingdetail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resList:{},
    jobId: 0,
    uid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      jobId: options.id
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    try {
      var value = wx.getStorageSync('uid')
      if (value) {
        this.setData({
          uid: value
        });
      }
    } catch (e) {
      console.log(e)
    }
    wx.request({
      url: app.globalData.baseURL + '/job/mysign-detail',
      method: 'GET',
      data: {
        "useId": _this.data.uid,
        "jobId": _this.data.jobId
      },
      success(res) {
        _this.setData({
          resList: res.data.data[0]
        });
        console.log(res.data)
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
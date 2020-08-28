// pages/commodity-detail/commodity-detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    job:{}
  },
  company(e){
    // wx.navigateTo({
    //   url: '../company/company',
    // })
  },
  share(e){
    wx.showToast({
      icon: "none",
      title: '跳转到微信官方分享列表',
    })
  },
  place(e){
    wx.showToast({
      icon: "none",
      title: '跳转到微信官方地图组件',
    })
  },
  signup(event) {
    wx.navigateTo({
      url: '../signup/signup?id='+this.data.job.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(parseInt(options.id))
    var _this = this
    wx.request({
      url: app.globalData.baseURL + '/job/',
      method: 'GET',
      data: {
        "id": options.id
      },
      success(res) {
        _this.setData({
          job: res.data.data
        });
        console.log(res.data.data)

      }
    })
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
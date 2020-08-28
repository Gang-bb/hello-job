// pages/mine/tracking/tracking.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resList:[],
    key: "4",
    uid:""
  },
  // 问题反馈
  withAdmin(){
    wx.showToast({
      title: '反馈电话：13978223101',
      icon: 'none',
      duration: 3000
    })
  },
  // 加群
  takeGroup(){
    wx.showToast({
      title: '工作QQ群号：98576254',
      icon: 'none',
      duration: 3000
    })
  },
  // 联系企业
  contact(){
    wx.showToast({
      title: '企业电话：0771-664599',
      icon: 'none',
      duration: 3000
    })
  },
  detail(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../trackingdetail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  changeTabs(e) {
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      key: options.key
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
      url: app.globalData.baseURL + '/job/mysign-list',
      method: 'GET',
      data: {
        "useId": _this.data.uid
      },
      success(res) {
        _this.setData({ 
          resList: res.data.data
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
// pages/pre-info/pre-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {    
    // 基础信息
    baseinfo:{
      name: "梁艺翔",
      sex: 1,
      place: "暂无",
      birthday: "暂无",
      height: "暂无",
      eduStatus: 1,
      phoneNumber: "暂无",
      email: "暂无",
      qqNum: "暂无",
    },
    otherInfoList: [
      {
        oClass: 'item',
        itemTittle: '教育经历',
        experienceList: [
          {
            startTime: '2012-09',
            endTime: '2016-06',
            shcool: '北京大学 |',
            degree: ' 本科',
            thirdTittle: '主修专业：',
            project: '软件工程',
            fourthTittle: '在校经历：',
            schoolsExperience: '暂无'
          },
          {
            startTime: '2016-09',
            endTime: '2019-06',
            shcool: '清华大学 |',
            degree: ' 硕士',
            thirdTittle: '主修专业：',
            project: '软件工程',
            fourthTittle: '在校经历：',
            schoolsExperience: '我在学校表现良好，绩点全班排名前三好唔好前端其后期的以定期维护轻微电话轻微电话青海湖去耦合器好多钱情况文化的切换我的前后端我确定好群殴我等会群殴我好多去哦好的去哦好的群殴电话启动启动群殴电话群殴我好多气得我轻微电话群殴电话去'
          }
        ]
      },
      {
        oClass: 'item',
        itemTittle: '工作经历',
        experienceList: [
          {
            startTime: '2012-09',
            endTime: '2016-06',
            company: '字节跳动',
            thirdTittle: '主要工作内容：',
            content: '打杂'
          }
        ]
      },
      {
        oClass: 'item',
        itemTittle: '工作期望',
      },
      {
        oClass: 'item',
        itemTittle: '自我评价',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 获取主要信息
    wx.request({
      url: getApp().globalData.baseURL + '/user/',
      method: 'GET',
      data: {
        "id": _this.data.uid
      },
      success(res) {
        console.log(res.data)
        var data = _this.data.baseinfo
        if (res.data.data) {
          _this.setData({
            baseinfo: res.data.data,
          });
        } else {
          _this.setData({
            baseinfo: data,
          });
        }
      }
    })
    // 获取其他简历信息
    wx.request({
      url: getApp().globalData.baseURL + '/resume/others',
      method: 'GET',
      data: {
        "id": _this.data.uid
      },
      success(res) {
        _this.setData({
          otherInfoList: res.data,
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
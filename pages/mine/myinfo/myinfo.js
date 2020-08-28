// pages/mine/myinfo/myinfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:"",
    mainInfo:{
      sname: "",
      age: "",
      eduStatus: 1,
      place: "暂无",
      phoneNumber: "暂无"
    },
    percentage:"0",
    // oClass:"item",
    otherInfoList:[
      {
        oClass: 'item',
        itemTittle:'教育经历',
        experienceList:[
          {
            startTime: '2012-09',
            endTime: '2016-06',
            shcool:'北京大学 |',
            degree:' 本科',
            thirdTittle:'主修专业：',
            project:'软件工程',
            fourthTittle:'在校经历：',
            schoolsExperience:'暂无'
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
            company:'字节跳动',
            thirdTittle: '主要工作内容：',
            content:'打杂'
          }
        ]
      },
      {
        oClass: 'none',
        itemTittle: '工作期望',
      },
      {
        oClass: 'none',
        itemTittle: '自我评价',
      }
    ]
  },
  // 点击预览
  preview(e){
    wx.navigateTo({
      url: '../../pre-info/pre-info',
    })
  },
  // 点击修改该项记录
  modify(e) {
    switch (e.currentTarget.dataset.index) {
      case 0:
        wx.navigateTo({
          url: '../../edit-info/info-edu/info-edu?getid=' + e.currentTarget.dataset.id,
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../../edit-info/info-work/info-work?getid=' + e.currentTarget.dataset.id,
        })
        break;
    }
    // wx.showToast({
    //   icon:"none",
    //   title: '跳转到修改该项信息页面',
    // })
  },
  // 点击编辑
  base(e) {
    wx.navigateTo({
      url: '../../edit-info/info-base/info-base',
    })
  },
  // 该项没有记录时 点击 +添加....
  none(e) {
    switch (e.currentTarget.dataset.index) {
      case 0:
        wx.navigateTo({
          url: '../../edit-info/info-edu/info-edu',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../../edit-info/info-work/info-work',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../../edit-info/info-hope/info-hope',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../../edit-info/info-self/info-self',
        })
        break;
    }
  },
  // 该项记录原有时 点击 +添加
  have(e) {
    switch (e.currentTarget.dataset.index) {
      case 0:
        wx.navigateTo({
          url: '../../edit-info/info-edu/info-edu',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../../edit-info/info-work/info-work',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../../edit-info/info-hope/info-hope?id=' + e.currentTarget.dataset.index,
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../../edit-info/info-self/info-self?id=' + e.currentTarget.dataset.index,
        })
        break;
    }
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
      url: app.globalData.baseURL + '/user/',
      method: 'GET',
      data: {
        "id": _this.data.uid
      },
      success(res) {
        console.log(res.data)
        var data = _this.data.mainInfo
        if(res.data.data){
          _this.setData({
            mainInfo: res.data.data,
          });
        }else{
          _this.setData({
            mainInfo: data,
          });
        }
        
        console.log(res)
      }
    })
    // 获取简历百分比
    wx.request({
      url: app.globalData.baseURL + '/resume/percentage',
      method: 'GET',
      data: {
        "uid": _this.data.uid
      },
      success(res) {
        console.log(res.data.percentage)
        _this.setData({
          percentage: res.data.percentage
        });
      }
    })
    // 获取其他简历信息
    wx.request({
      url: app.globalData.baseURL + '/resume/others',
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
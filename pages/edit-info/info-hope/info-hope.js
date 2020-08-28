// pages/edit-info/info-hope/info-hope.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isModify: false,
    r1: "1",
    r2: "1",
    //页面数据
    data:{
      expectedJobType: "不限",
      shortJobTime: "不限",
      ableWorkDay: "均可",
      isFullTime: 1,
      userId: "",
    },
    // checkbox数据
    isExpectedJobType: true,
    isShortJobTime: true,
    position: 'left',
    items1: [{
      id: 1,
      name: '短期兼职',
      checked: false
    }, {
      id: 2,
      name: '长期兼职',
      checked: false
    }, {
      id: 3,
      name: '周末兼职',
      checked: false
    },{
      id: 4,
      name: '实习',
      checked: false
      }
    ],
    items2: [{
      id: 1,
      name: '工作日',
      checked: false
    }, {
      id: 2,
      name: '周末',
      checked: false
    }, {
      id: 3,
      name: '节假日',
      checked: false
    }, {
      id: 4,
      name: '寒暑假',
      checked: false
    }
    ],
  },
  //点击选择可上班时间
  workday(){
    var _this = this
    wx.showActionSheet({
      itemList: ['均可', '每周1天', '每周2天', '每周3天', '每周4天', '每周5天'],
      success(res) {
        if (res.tapIndex==0){
          _this.setData({
            'data.ableWorkDay': '均可'
          });
        }else{
          _this.setData({
            'data.ableWorkDay': '每周' + res.tapIndex + '天'
          });
        }
        console.log(_this.data)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  // 点击重置
  reset(e){

  },
  // 点击提交
  submit(e){
    var _this = this
    wx.request({
      url: getApp().globalData.baseURL + '/resume/modify',
      method: 'POST',
      data: {
        "id": _this.data.data.userId,
        "type": 3,
        "data": _this.data.data
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
  // 期望的工作类型checkbox监听事件
  checkboxChange(e){
    console.log(e.detail)
    let index = e.currentTarget.dataset['index'];
    let items = this.data[`items${index}`];
    items.forEach(item => {
      if (item.id == e.detail.key) {
        item.checked = e.detail.checked;
      }
    });
    this.setData({
      [`items${index}`]: items
    });
    items.forEach(item => {
      if (item.checked) {
        if (index == '1') {
          this.setData({
            'data.expectedJobType': item.name
          });
        } else if (index == '2'){
          this.setData({
            'data.shortJobTime': item.name
          });
        }
        
      }
    });   
  },
  // 短期工作时间checkbox监听事件
  checkboxChange2(e){
    
  },
  // 选择短期工作时间
  workTimeChange(e){
    if(e.detail.currentKey=="2"){
      this.setData({
        isShortJobTime: false
      });
    }else{
      this.setData({
        isShortJobTime: true,
        shortJobTime: "不限"
      });
    }
  },
  // 选择是否支持全职上班
  fullTimeChange(e){
    if (e.detail.currentKey == "2") {
      this.setData({
        isFullTime: 2
      });
    } else {
      this.setData({
        isFullTime: 1
      });
    }
  },
  // 选择期望工作类型
  workTypeChange(e){
    if (e.detail.currentKey == "2") {
      this.setData({
        isExpectedJobType: false
      });
    } else {
      this.setData({
        isExpectedJobType: true,
        expectedJobType: "不限"
      });
    }
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
        "id": _this.data.data.userId,
        "type": 3
      },
      success(res) {
        var mydata = _this.data.data
        // 如果请求有数据， 就赋值
        if (res.data.data){
          mydata = res.data.data
        }
        console.log(mydata)
        // 给短期工作选择
        if(mydata.shortJobTime != '不限'){
          _this.setData({
            r1: '2',
          });
        }
        for (var j = 0; j < _this.data.items2.length; j++) {
          if (_this.data.items2[j].name === mydata.shortJobTime){
            _this.setData({
              isShortJobTime: false,
              ['items2[' + j + '].checked']: true
            });
          }
        }
        // 给期望工作选择
        if (mydata.expectedJobType != '不限') {
          _this.setData({
            r2: '2',
          });
        }
        for (var j = 0; j < _this.data.items1.length; j++) {
          if (_this.data.items1[j].name === mydata.expectedJobType) {
            _this.setData({
              isExpectedJobType: false,
              ['items1[' + j + '].checked']: true
            });
          }
        }
        _this.setData({
          data: mydata,
        });
        console.log(_this.data)
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
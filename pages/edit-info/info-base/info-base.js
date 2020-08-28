// pages/edit-info/info-base/info-base.js
const cityData = require('../../../utils/picker.city.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 时间选择器参数
    type: 2,
    startYear: 1980,
    endYear: 2030,
    cancelColor: "#888",
    color: "#f37b1d",
    setDateTime: "",
    result: "",
    // 页面信息参数
    mainInfo:{
      sname: "",
      sex: 1,
      place: "",
      birthday: "",
      height: "",
      eduStatus: 1,
      bestEdu: "",
      phoneNumber: "",
      email: "",
      qqNum: "",
      weChat: "",
    },
    uid:"",
    // 城市选择器
    proviceArr: [],
    cityArr: [],
    districtArr: [],
    value: [0, 0, 0],
    iconHidden: true,
    showPickerStatus: false,
    animationData: "",

  },
  // 选择教育状态
  eduStatusChange(e){
    var eduStatus = parseInt(e.detail.currentKey)
    console.log(eduStatus)
    this.setData({
      'mainInfo.eduStatus': eduStatus
    })
  },
  // 表单提交和重置
  formSubmit: function (e) {
    for (let key in e.detail.value){
      this.setData({
        ['mainInfo.' + key + '']: e.detail.value[key]
      })
    }
    var _this = this
    wx.showModal({
      title: '提示',
      content: '确定提交修改的信息吗？',
      confirmColor:"#f37b1d",
      success(res) {
        if (res.confirm) {
          // 提交修改信息
          wx.request({
            url: getApp().globalData.baseURL + '/user/modify',
            method: 'POST',
            data: {
              "id": _this.data.uid,
              "data": _this.data.mainInfo
            },
            success(res) {
              if(res.statusCode==200){
                wx.showToast({
                  title: '提交成功',
                  icon: 'none',
                })
              }else{
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
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  // 选择性别
  sexChange(e){
    var sex = parseInt(e.detail.currentKey)
    console.log(sex)
    this.setData({
      'mainInfo.sex': sex
    })
  },
  // 显示生日选择器
  show: function (e) {
    let type = Number(e.currentTarget.dataset.type);
    this.setData({
      cancelColor: "#888",
      color: "#f37b1d",
      setDateTime: "",
      startYear: 1980,
      endYear: 2005
    })
    this.dateTime.show();
  },
  // 改变时间
  change: function (e) {
    console.log(e)
    this.setData({
      'mainInfo.birthday': e.detail.result
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化城市选择器数据
    this.setData({
      proviceArr: this.toArr(cityData),
      cityArr: this.toArr(cityData[0].children),
      districtArr: this.toArr(cityData[0].children[0].children)
    })
  },
  onReady: function (options) {
    this.dateTime = this.selectComponent("#tui-dateTime-ctx")
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
        var data = _this.data.mainInfo
        if (res.data.data) {
          _this.setData({
            mainInfo: res.data.data,
          });
        } else {
          _this.setData({
            mainInfo: data,
          });
        }
        console.log(res)
      }
    })
  },
  toArr(object) {
    let arr = [];
    for (let i in object) {
      arr.push(object[i].name);
    }
    return arr;
  },
  /**
   * 城市选择器相关
   */
  //picker change切换事件
  columnPicker: function (e) {
    let value = e.detail.value;
    //如果两者下标不一致，表示滚动过
    if (this.data.value[0] !== value[0]) {
      this.setData({
        proviceArr: this.data.proviceArr,
        cityArr: this.toArr(cityData[value[0]].children),
        districtArr: this.toArr(cityData[value[0]].children[0].children),
        value: [value[0], 0, 0]
      })
    } else if (this.data.value[1] !== value[1]) {
      this.setData({
        proviceArr: this.data.proviceArr,
        cityArr: this.data.cityArr,
        districtArr: this.toArr(cityData[value[0]].children[value[1]].children),
        value: [value[0], value[1], 0]
      })
    } else {
      this.setData({
        value: value
      })
    }
  },
  //确定按钮
  picker: function (e) {
    let value = this.data.value;
    if (cityData.length > 0) {
      let provice = cityData[value[0]].name
      let city = cityData[value[0]].children[value[1]].name
      let district = cityData[value[0]].children[value[1]].children[value[2]].name
      this.setData({
        text: [provice, city, district],
        showPickerStatus: false,
        nativePlace: provice + ' ' + city + ' ' + district
      })
    }
  },
  // 显示picker-view
  showPicker: function () {
    var animation = wx.createAnimation({
      duration: 220,
      timingFunction: "linear",
      delay: 0
    })
    animation.translateY(500).step()
    this.setData({
      animationData: animation.export(),
      showPickerStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  // 隐藏picker-view
  hidePicker: function () {
    this.setData({
      showPickerStatus: false
    })
  },
})
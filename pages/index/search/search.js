// pages/index/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotsearch:"在家兼职",
    hotsearchList:[],
    searchValue:"",
    searchRecordList:[],
    isSearch:false,
    searchResList:[]
  },
  // 点击搜索结果的每项
  clickRes(e){
    console.log("1")
    wx.navigateTo({
      url: '../../commodity-detail/commodity-detail?id=' + e.currentTarget.dataset.id,
    })
  },
  //清除事件
  clearValue(e){
    this.setData({
      searchValue: ""
    });
  },
  //输入事件
  input(e){
    this.setData({
      searchValue: e.detail.value
    });
  },
  // 从数组头添加数据
  prepend(arr, item) {
    return [item].concat(arr);
    // console.log(arr)
    // console.log(item)
    // if(arr.length == 0){
    //   console.log("不包含1")
    //   this.setData({
    //     searchRecordList: [item].concat(arr)
    //   });
    // }else{
    //   for (let i = 0; i < arr.length; i++) {
    //     //如果找到相同的
    //     if (arr[i].message === item.message) {
    //       console.log("包含")
    //       //删除该重复元素
    //       var newarr = arr.splice(i+1, 1)
    //       console.log(newarr)
    //       //再添加到首项并赋值
    //       this.setData({
    //         searchRecordList: [item].concat(newarr)
    //       });
    //       break
    //     } 

    //   }
    // }
    
  },
  // 删除搜索历史
  deleteRecord(e){
    this.setData({
      searchRecordList: []
    });
    wx.setStorage({
      key: "searchRecordList",
      data: []
    })
  },
  // 点击搜索按钮
  search(e){
    var _this = this
    wx.request({
      url: app.globalData.baseURL + '/job/search',
      method: 'GET',
      data: {
        "key": _this.data.searchValue
      },
      success(res) {
        _this.setData({
          searchResList: res.data.data,
        });
        //如果当前为未搜索时
        if (!_this.data.isSearch){
          _this.setData({
            isSearch: !_this.data.isSearch
          });
        }
        console.log(res.data.data)
      }
    })

  },
  // 点击热门搜索热词
  clickHot(e){
    //获取点击的词的内容，并赋值给搜索框
    var value = this.data.hotsearchList[e.currentTarget.dataset.index].message
    //赋值给搜索历史数组并更新缓存
    var item = { message: value}
    this.setData({
      searchValue: value,
      searchRecordList: this.prepend(this.data.searchRecordList, item)
    });
    wx.setStorage({
      key: "searchRecordList",
      data: this.data.searchRecordList
    })
    
  },
  // 点击搜索历史记录词
  clickRecord(e){
    // console.log(this.data.searchRecordList)
    this.setData({
      searchValue: this.data.searchRecordList[e.currentTarget.dataset.index].message
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.request({
      url: app.globalData.baseURL + '/job/hot',
      method: 'GET',
      success(res) {
        _this.setData({
          hotsearchList: res.data.data
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    try {
      var value = wx.getStorageSync('searchRecordList')
      if (value) {
        // Do something with return value
        this.setData({
          searchRecordList: value,
        });
      }
    } catch (e) {
      // Do something when catch error
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
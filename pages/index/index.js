// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: { name: 'tag', isShow: true },
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://cdn.pixabay.com/photo/2018/09/24/15/04/board-3700116__340.jpg'
    }, {
      id: 1,
      type: 'image',
        url: 'https://cdn.pixabay.com/photo/2015/09/02/12/26/desk-918425__340.jpg',
    }, {
      id: 2,
      type: 'image',
        url: 'https://cdn.pixabay.com/photo/2015/07/31/14/59/creative-869200__340.jpg'
    }, {
      id: 3,
      type: 'image',
        url: 'https://cdn.pixabay.com/photo/2019/03/12/20/27/kanban-4051777__340.jpg'
    }],
    jobList:[
      {
        tittle:"测试数据的标题",
        reward:"180/天",
        place:"西乡塘",
        settlement:1,
        isBagEating:1,
        encase:1,
        isTrafficSubsidy:1,
        royalty:1
      },
      {
        tittle: "测试数据的标题",
        reward: "90/天",
        place: "西乡塘",
        settlement: 1,
        isBagEating: 0,
        encase: 1,
        isTrafficSubsidy: 1,
        royalty: 0
      },
      {
        tittle: "测试数据的标题",
        reward: "50/天",
        place: "西乡塘",
        settlement: 1,
        isBagEating: 1,
        encase: 0,
        isTrafficSubsidy: 0,
        royalty: 1
      },
      {
        tittle: "测试数据的标题",
        reward: "80/天",
        place: "西乡塘",
        settlement: 3,
        isBagEating: 1,
        encase: 1,
        isTrafficSubsidy: 1,
        royalty: 1
      },
      {
        tittle: "测试数据的标题",
        reward: "80/天",
        place: "西乡塘",
        settlement: 2,
        isBagEating: 1,
        encase: 1,
        isTrafficSubsidy: 0,
        royalty: 1
      }
    ],
    page:1,
    page_size:6,
    isover:1,
    value:"123"
  },
  //点击搜索按钮
  search: function (event) {
    try {
      var value = wx.getStorageSync('uid')
      if (!value) {
        wx.showToast({
          title: '请到个人中心登录',
          icon: 'none'
        })
      }
      if (value) {
        wx.navigateTo({
          url: 'search/search',
        })
      }
    } catch (e) {
      console.log(e)
    }
  },
  // 跳转至商品详情
  job: function (e){
    try {
      var value = wx.getStorageSync('uid')
      if (!value) {
        wx.showToast({
          title: '请到个人中心登录',
          icon: 'none'
        })
      }
      if(value){
        wx.navigateTo({
          url: '../commodity-detail/commodity-detail?id=' + e.currentTarget.dataset.id,
        })
      }
    } catch (e) {
      console.log(e)
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    wx.request({
      url: app.globalData.baseURL + '/job/jobs',
      method: 'GET',
      success(res) {
        _this.setData({
          jobList: res.data.data
        });
        console.log(res.data.data)

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // var _this = this
    // wx.request({
    //   url: app.globalData.baseURL + '/jobs/',
    //   method: 'GET',
    //   data: {
    //     "page": 1,
    //     "page_size": 6,
    //   },
    //   success(res) {
    //     _this.setData({ 
    //       jobList: res.data ,
    //       page: 2
    //       });
    //     console.log(_this.data.jobList)
        
    //   }
    // })
    
    this.towerSwiper('swiperList');
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("下拉刷新")
    function randomSort(a, b) { return Math.random() > 0.5 ? -1 : 1; }
    this.setData({
      jobList: this.data.jobList.sort(randomSort)
    })
    wx.stopPullDownRefresh();


    // wx.startPullDownRefresh();
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // var _this = this
    // if (_this.data.isover==0){
    //   wx.request({
    //     url: app.globalData.baseURL + '/jobs/',
    //     method: 'GET',
    //     data: {
    //       "page": _this.data.page,
    //       "page_size": 6,
    //     },
    //     success(res) {
    //       if (res.statusCode == 200) {
    //         _this.setData({
    //           jobList: _this.data.jobList.concat(res.data),
    //           page: _this.data.page + 1
    //         });
    //         console.log(res)
    //       } else {
    //         console.log('没有更多了哦')
    //         _this.setData({
    //           isover: 1,
    //         });
    //       }
    //     }
    //   })
    // }
    
  },
})
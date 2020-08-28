// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:"",
    content:"登录查看更多内容",
    isTittle:true,
    isLogin:0,
    percentage:"0",
    isVerify:"马上登录",
    tips:"让我们见证您的兼职历程",
    name:"",
    isShow:false,
    trackingList:[
      {
        tittle:"已报名",
        number:0
      },
      {
        tittle: "已录用",
        number: 0
      },
      {
        tittle: "已到岗",
        number: 0 
      },
      {
        tittle: "已结算",
        number: 0
      }
    ],
    otherListItems:[
      // {
      //   src:"../../image/add_person.png",
      //   itemLeftWord:"我要招人",
      //   itemRightWord:"一招就够"
      // },
      // {
      //   src:"../../image/pocket.png",
      //   itemLeftWord: "我的钱包",
      //   itemRightWord: "0元"
      // },
      // {
      //   src:"../../image/add_person.png",
      //   itemLeftWord: "联系客服",
      //   itemRightWord: "欢迎吐槽"
      // },
      {
        src:"../../image/yijian2.png",
        itemLeftWord: "意见反馈",
        itemRightWord: ""
      }
    ]
  },
  //点击了头像
  onHead(e){
    if (this.data.isLogin == 0) {
      this.showdialog();
    } else {
      wx.navigateTo({
        url: 'myinfo/myinfo',
      })
    }
  },
  //退出
  exit(e){
    this.setData({
      content:"确定退出并解绑吗？",
      isTittle:false,
      isShow: true
    });
  },
  //调出对话框
  showdialog(){
    if (this.data.isLogin == 0) {
      this.setData({
        isShow: true,
        content: "登录查看更多内容",
        isTittle: true,
      });
    }
  },
  //点击马上登录或者未认证
  onVerify(e){
    if (this.data.isLogin == 0) {
      this.showdialog();
    }else{
      wx.showToast({
        title: '点击未认证',
        icon: 'none'
      })
    }
  },
  // 确定按钮
  onConfirmTap(e) {
    if (this.data.isLogin == 0) {
      this.onLogin()
      
    } else if (this.data.isLogin == 1){
      try {
        wx.removeStorageSync('uid')
      } catch (e) {

      }
      this.setData({
        isLogin: 0,
        isShow: false,
        trackingList: [
          {
            tittle: "已报名",
            number: 0
          },
          {
            tittle: "已录用",
            number: 0
          },
          {
            tittle: "已到岗",
            number: 0
          },
          {
            tittle: "已结算",
            number: 0
          }
        ],
        percentage:"0"
      });
    }
  },
  // 取消按钮
  onCancelTap(e) {
    this.setData({
      isShow: false
    });
  },
  //点击马上完善按钮
  fillResume: function(e){
    if (this.data.isLogin == 0) {
      this.showdialog();
    } else {
      wx.navigateTo({
        url: 'myinfo/myinfo',
      })
    }
  },
  //点击其他选项列表相关
  otherList: function(e){
    switch (e.currentTarget.dataset.index) {
      case 0:
        wx.navigateTo({
          url: 'feedback/feedback',
        })
        break;
    }
  },
  // 点击报名跟踪相关
  trackingNumber: function(e){
    console.log(e.target.dataset.index)
    if (this.data.isLogin == 0) {
      this.showdialog();
    }else{
      wx.navigateTo({
        url: 'tracking/tracking?key=' + e.target.dataset.index,
      })
    }
  },
  //登录函数
  onLogin(){
    var _this = this
    wx.login({
      success(res) {
        if (res.code) {
          console.log("获取的code: " + res.code)
          wx.request({
            url: app.globalData.baseURL + '/login_stu',
            method: 'POST',
            data: {
              code: res.code
            },
            success(res) {
              console.log(res)
              if (res.statusCode==200){
                // 获取报名跟踪数据
                wx.request({
                  url: app.globalData.baseURL + '/job/mysign',
                  method: 'GET',
                  data: {
                    "useId": res.data.uid,
                  },
                  success(res) {
                    var myarr = _this.data.trackingList
                    var arr = res.data.data
                    for (let i = 0; i < arr.length; i++) {
                      for (let j = 0; j < myarr.length; j++) {
                        if (arr[i].status == (j + 1)) {
                          myarr[j].number++;
                        }
                      }
                    }
                    _this.setData({
                      trackingList: myarr
                    });
                  }
                })
                // 获取简历百分比
                wx.request({
                  url: app.globalData.baseURL + '/resume/percentage',
                  method: 'GET',
                  data: {
                    "uid": res.data.uid
                  },
                  success(res) {
                    console.log(res.data.percentage)
                    _this.setData({
                      percentage: res.data.percentage
                    });
                  }
                })
                wx.setStorage({
                  key: "uid",
                  data: res.data.uid
                })
                _this.setData({
                  uid: res.data.uid,
                  isShow: false,
                  isLogin: 1,
                  isVerify: "未认证 >",
                  tips: "完成认证可提高简历曝光度"
                });
             // _this.getUserInfo()
              }else{
                wx.showToast({
                  title: '服务器错误，登陆失败',
                  icon:'none'
                })
              }
            },
            fail(res){
              _this.setData({
                isShow: false,
                isLogin: 0,
                isVerify: "马上登录",
                tips: "让我们见证您的兼职历程"
              });
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
          _this.setData({
            isShow: false,
            isLogin: 0,
            isVerify: "马上登录",
            tips: "让我们见证您的兼职历程"
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function () {
    var _this = this
    wx.checkSession({
      success: function () {
        //存在登陆态,再查看缓存
        try {
          let val = wx.getStorageSync("uid")
          console.log(val)
          if (!val) {
            console.log("没有登陆")
            _this.setData({
              isLogin: 0
            });
          } else {
            // 获取报名跟踪数据
            wx.request({
              url: app.globalData.baseURL + '/job/mysign',
              method: 'GET',
              data: {
                "useId": val
              },
              success(res) {
                var myarr = _this.data.trackingList
                var arr = res.data.data
                myarr.forEach(item => {
                  item.number = 0
                });
                console.log(myarr)
                for (let i = 0; i < arr.length; i++) {
                  for (let j = 0; j < myarr.length; j++) {
                    if (arr[i].status == (j + 1)) {
                      myarr[j].number++;
                    }
                  }
                }
                _this.setData({
                  trackingList: myarr
                });
              }
            })
            // 获取简历百分比
            wx.request({
              url: app.globalData.baseURL + '/resume/percentage',
              method: 'GET',
              data: {
                "uid": val
              },
              success(res) {
                console.log(res.data.percentage)
                _this.setData({
                  percentage: res.data.percentage
                });
              }
            })
            _this.setData({
              isShow: false,
              isLogin: 1,
              isVerify: "未认证 >",
              tips: "完成认证可提高简历曝光度"
            });
          }
        } catch (e) {
          // console.log(e)
          _this.setData({
            isLogin: 0
          });
        }
      },
      fail: function () {
        //不存在登陆态
        _this.setData({
          isLogin: 0
        });
      }
    })
  },

})
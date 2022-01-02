import store from '@/store'

// console.log(11, store);
var env = require("@/configs/env.js")
var util = require("@/utils/util.js")
const domain = env.apiDomain
const qiniu_upload_domain = env.qiniu_upload_domain
const qiniu_domain = env.qiniu_domain

const request = {
  service({
		data,
		success,
		method,
		fail,
		complete,
		path,
		headers
	}) {
    return new Promise((resolved, rejected) => {
      const url = domain + path
      console.log(url)

      const header = { ...getHeader(), ...headers, }
			uni.showLoading({
        title: '',
        mask: true,
      })
      uni.request({
        url, //仅为示例，并非真实接口地址。
        data,
        header,
        method,
        success: (res) => {
          uni.hideLoading()
          // console.log(res, 'success')
          if([401].includes(res.data.code)){ // 鉴权错误
            uni.navigateTo({
              url:'/pages/login/login',
            })
          } else if ([200].includes(res.data.code)) {
            // console.log(res, 'request')
            // console.log(res.data, 'request')
            resolved(res.data)
            if (success) success(res.data)
          } else if ([4030].includes(res.data.code)) { // 接口报错
            uni.showModal({
              title: '提示',
              showCancel: false,
              content: res.data.msg,
              success: function (res) {
                util.returnPage(99)
              }
            });
          } else { // 接口报错
            // console.log(res.data.msg, 'error')
            // util.showToast(res.data.msg)
            setTimeout(() => {
              uni.showToast({
                title: res.data.msg,
                icon: "none",
                mask: true,
                duration: 2000,
              })
            },500)
            // Promise.reject(res.data)
            // rejected(res.data)
          }
          
        },
        fail:(err) => {
          uni.hideLoading();
          console.log(err, 'fail')
          rejected(err)
          if (fail) fail(res.data)
        }
      })
    })
  },

  login() {
      // #ifdef MP-WEIXIN
      // 微信登录
    return new Promise((resolve,reject)=>{
        uni.getUserProfile({
          desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
						
            console.log({ ...res }, 'getUserProfile')
            let userInfo = res.userInfo
            console.log(userInfo, 'userInfo')
            uni.setStorageSync('userInfo', userInfo) // 微信给的
            uni.setStorageSync('wxInfo', userInfo) // 微信给的

          // avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/VCwf3KferJV4Z87z1tLFjTpV3fU7IaPC9k7ibF6PWFrWb5F2GYkD7U8SfGIIzqjAwqdicuoBmJEvpFpMBrVMxLgg/132"
          // city: ""
          // country: "Yemen"
          // gender: 1
          // language: "zh_CN"
          // nickName: "夏平安"
          // province: ""
          

            // this.setData({
            //   userInfo: res.userInfo,
            //   hasUserInfo: true
            // })
            uni.login({
              provider: 'weixin',
              success: (loginRes) => {
                console.log(loginRes, 'loginRes.authResult');
                // console.log(loginRes.authResult);
                const data = {
                  code: loginRes.code,
                }
                // this.network().login(data)
                console.log(data, 'loginRes.authResult');
								uni.setStorageSync('session_key', data)
                resolve(get_session_key(data))
              }
            })
          }
        })
      // uni.login({
      //     success: res => {
      //       resolve(get_session_key(res.code))
      //     },
      //     fail:error=>{
      //       console.log(error)
      //     }
      //   })
      })
      // #endif
    },
  }

  function getHeader() {
    // var timestamp = Date.parse(new Date()) / 1000 // 时间戳
    const header = {}
    const token = uni.getStorageSync('token')
    header['Supplier-Id'] = store.state.storeId
    if (token) {
      header['token'] = token
    }
    // if (store.state.env == 'xcx') {
    // 	header.type = 'xcx'
    // } else {
    //   header.type = 'h5'
    // }
    return header
  }

  function set_userInfo(params, token) {
    let data = {
      ...params
    }
    const url =  domain + '/api/updateWechatMsg' // 授权登录
    const header = {
      token
    }
    uni.request({
      url,
      data,
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      header, // 设置请求的 header  
      success: res=>{
        
      },
      fail: function() {
    
      },
      complete: function(error) {
        // complete  
      }
    })
  }
  
  function get_session_key(params) {
    // console.log('params',params)
    let data = {
      ...params
    }
    const header = {}
    // data.jscode = code
    var url = domain + '/api/getUserInfoByWechatCode'//授权登录
    return new Promise((resolve,reject) =>{
      // console.log(111)
      uni.request({
        url,
        data,
        method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
        header, // 设置请求的 header  
        success: res=>{
          // console.log(res.data, 'res.data.token')
          const { data: info } = res.data
          // console.log(info, 'res.data.token')
          if (info.session_key){
            let session_key = uni.getStorageSync('session_key')
            session_key.session_key = info.session_key
            uni.setStorageSync('session_key', session_key)
          }
          if (res.data) {
            if (JSON.stringify(info.user) != '{}' && info.token != '') {
              uni.setStorageSync('userInfo', info.user) // 接口给的
            }

            uni.setStorageSync('token', info.token)

            let wx = uni.getStorageSync('wxInfo')
            const params = {
              headimgurl: wx.avatarUrl,
              nickname: wx.nickName,
              sex: wx.gender,
            }
            set_userInfo(params, info.token)
          }

          util.returnPage(1, function(pages, beforePage) {
            // route: "pages/index/tabbar/user"
            console.log(beforePage)
            if (beforePage.route == 'pages/index/tabbar/user') {
              beforePage.$vm.init()
            } else if (beforePage.route == 'packageMy/team/info') {
              beforePage.$vm.init()
            }
          })
          resolve(res)

        },
        fail: function() {
      
        },
        complete: function(error) {
          // complete  
        }
      })
    })
  }

export default request


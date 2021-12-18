// 引入SDK核心类
var QQMapWX = require('utils/qqmap-wx-jssdk.min.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'ICXBZ-XOK3U-QNSVW-B3PSL-2FB7E-EKFCJ' // 必填
})


const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
	var pages = getCurrentPages() //获取加载的页面
	console.log(pages)
	var currentPage = pages[pages.length - 1] //获取当前页面的对象  
	var url = currentPage.route //当前页面url
	var options = currentPage.options //如果要获取url中所带的参数可以查看options

	//拼接url的参数
	var urlWithArgs = url + '?'
	for (var key in options) {
		var value = options[key]
		urlWithArgs += key + '=' + value + '&'
	}
	urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

	return urlWithArgs
}

function navigateBack() {
	var self = this;
	var pages = getCurrentPages();
	if (pages.length == 1) {
		// if (self.data.circleId && self.data.circleId > 0) {
		//   uni.redirectTo({
		//     url: '../../circle/index/index?circleId=' + self.data.circleId + '&circleName=' + (self.data.circleName || '')
		//   });
		// } else {
		//   uni.switchTab({
		//     url: "../../home/grouplist/grouplist"
		//   });
		// }
	} else {
		uni.navigateBack({
			changed: true
		}); //返回上一页   
	}
}

function onShareAppMessage(res) {
	console.log(res)
	if (res.from == 'button') {
		const article_id = res.target.dataset.articleid
		const article_content = res.target.dataset.articlecontent
		const imageUrl = res.target.dataset.image
		const user_info = uni.getStorageSync('user_info')
		return {
			title: article_content,
			path: 'pages/article/index?article_id=' + article_id + '&share_uid=' + user_info.uid,
			imageUrl,
			success: res => {
				console.log(res)
			}
		}
	}
}

// 跳转绑定手机页面
function toBindPhone() {
	const return_url = getCurrentPageUrlWithArgs()
	// console.log(return_url)
	uni.setStorageSync('return_url', return_url)
	// uni.redirectTo({
	//   url: '/pages/index/bindphone',
	// })
	uni.navigateTo({
		url: '/pages/index/bindphone',
	})
}

function showLogin() {
	// #ifdef APP-PLUS
	plus.nativeUI.confirm("请先进行登陆", (e) => {
		if (e.index == 0) {
			uni.navigateTo({
				url: '/pages/index/login'
			})
		}
	})
	// #endif

	// #ifdef H5
	uni.showModal({
		title: '请先进行登陆',
		success: (res) => {
			if (res.confirm) {
				uni.navigateTo({
					url: '/pages/index/login'
				})
			}
		}
	})
	// #endif
}

function checkauth() {
	uni.getSetting({
		success: res => {
			if (!res.authSetting['scope.userInfo']) {
				console.error('未授权')
				uni.navigateTo({
					url: '/pages/index/index',
				})
				return
			}
		}
	})
}

function checkPhone(phone) {
	if (!(/^1\d{10}$/.test(phone))) {
		return false;
	}
	return true
}

function base64encode(str) {
	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var base64DecodeChars = new Array(
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
		52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
		-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
		15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
		-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
		41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
	//编码的方法
	var out, i, len;
	var c1, c2, c3;
	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt((c1 & 0x3) << 4);
			out += "==";
			break;
		}
		c2 = str.charCodeAt(i++);
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
			out += base64EncodeChars.charAt((c2 & 0xF) << 2);
			out += "=";
			break;
		}
		c3 = str.charCodeAt(i++);
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
		out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
		out += base64EncodeChars.charAt(c3 & 0x3F);
	}
	return out;
}

// 微信登录
function wxlogin() {
	uni.setStorageSync('wxlogin_redirect_uri', window.location.href)
	const url = window.location.protocol + '//' + window.location.host + window.location.pathname + '#/pages/index/wxlogin'
	const appid = 'wxb1728811c1f3dd9e'
	const redirect_uri = encodeURIComponent(url)
	const response_type = 'code'
	const scope = 'snsapi_userinfo'
	localStorage.setItem('wxlogin', 1)
	// uni.showModal({
	// 	title: '是否进行登录',
	// 	success: res => {
	// 		if (res.confirm) {
	// 			window.location.href =
	// 				`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}#wechat_redirect`
	// 		}
	// 	}
	// })
	window.location.href =
		`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}#wechat_redirect`
}

// 获取url参数
function getQueryString(param) {
  const reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg) || window.location.hash.substring((window.location.hash.search(/\?/)) + 1).match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  }
}

// 根据类型打开
function openUrl(url, type , appId) {
  // console.log(url, type)
  const _this = this
  // 0h5 1 小程序内页面 2小程序 3直播 4功能未开放提示
  switch(type) {
    case "0":
      uni.navigateTo({
        url: '/pages/h5/index?url=' + url
      })
    break
    case "1":
      console.log(url, type)
      uni.navigateTo({
        url:url,
        fail: function(res) {
          // 普通跳转链接方式失败，转换为跳转tabbar
          uni.switchTab({
            url:url
          })
        }
      })
    break
    case "2":
      uni.navigateToMiniProgram({
        appId: appId,
        path: url
      })
    break
    case "3":
    break
    case "4":
      _this.showToast('该功能暂未开放')
    break
  }
}

// 回退指定页面,并调用上级方法
function returnPage(index, callback) {
  var pages = getCurrentPages(); //当前页面栈
  // console.log(pages)
  if (pages.length > 1) {
    // 返回页面栈
    if (callback) {
      var beforePage = pages[pages.length - 2]
      // 如果存在回调方法
      // 所有页面、上一页
      // console.log(pages, 'pages')
      // console.log(beforePage, 'pages')
      callback(pages, beforePage)
    }
  }
  uni.navigateBack({
    delta: index
  })
}

// 弹出框
function showToast(title, icon, complete, onSuccess){
  uni.showToast({
    title: title,
    icon: icon ? icon : 'none',
    mask: true,
    duration: 1500,
    success: function(){
      setTimeout(() => {
      if(onSuccess){
        onSuccess()
      }
      }, 1500);
    },
    complete: function(){
      if(complete) complete()
    }
  })
}

// 根据腾讯地图api获取地理位置信息
function getTencentMapApi(res, callback){
  const _this = this
  qqmapsdk.reverseGeocoder({
    sig: 'lVg8SoYMsP5F5vlSeCzUckTdak3l3VqU',
    location:{
      latitude: res.latitude,
      longitude: res.longitude
    },
    success: function(res) {
      let resultData = res.result
      uni.setStorageSync('locationData', resultData)
      
      if(callback) callback(res)
    }
  })
}

// 获取用户地理位置
function getUserAddress(callback){
  // const _this = this
  // 获取你的位置信息
  uni.getLocation({
    type: 'wgs84',
    success (res) {
      // console.log(res)
      // uni.setStorageSync('positionData', res)

      getTencentMapApi(res, callback)
    },
    fail(){
      // console.log('拒绝了授权地理位置,默认设置为广东省深圳市南山区')
      // _this.globalData.userPosition = ''
      if(callback) callback() // 授权失败回调
    }
  })
}

// 计算两个坐标距离
function getTencentDistanceApi(from, to, callback, callback2){
  const _this = this
  qqmapsdk.calculateDistance({
    sig: 'lVg8SoYMsP5F5vlSeCzUckTdak3l3VqU', // 签名
    from, //若起点有数据则采用起点坐标，若为空默认当前地址
    to, //终点坐标
    success: function(res) {//成功后的回调
      if(callback) callback(res)
    },
    fail: function(error) {
      // console.error(error);
      if(callback2) callback2(error)
    }
  })
}

// 判断有无登录  有无帮手机号
function judgeLoginj(call) {
  let data = uni.getStorageSync('userInfo'), token = uni.getStorageSync('token')
  if (JSON.stringify(data) === '{}' || !data) {
    openUrl('/pages/login/login', '1')
    return false
  }

  if (call) call(token)
}

module.exports = {
	formatTime,
	getCurrentPageUrlWithArgs,
	navigateBack,
	onShareAppMessage,
	toBindPhone,
	checkauth,
	base64encode,
	checkPhone,
	wxlogin,
	getQueryString,
	showLogin,
	openUrl,
  returnPage,
  showToast,
  getTencentMapApi,
  getUserAddress,
  getTencentDistanceApi,
  judgeLoginj
}

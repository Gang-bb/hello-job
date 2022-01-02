const wx = require('jweixin-module')
import store from '@/store'

var def_title = '威威篮球'
var def_desc = ''
var def_link = 'http://wwlq.cnnetmall.com/#/'
var def_imgUrl = 'http://wwqlqn.cnnetmall.com/wwlq-logo.jpg'

// 获取重置分享内容参数
function updateAppMessageShareData({ title, hash, link, imgUrl, desc, success }) {
	console.log('updateAppMessageShareData')
	const user = uni.getStorageSync('user')
	hash = hash ? hash : ''
	if (user.uid) {
		if (hash.split("?").length > 1) {
			hash = hash + '&suid='+user.uid
		} else {
			hash = hash + '?suid='+user.uid
		}
	}
	
	if (!link && hash) {
		link = def_link + hash
	}
	
	link = link ? link : def_link
	title = title ? title : def_title
	imgUrl = imgUrl ? imgUrl : def_imgUrl
	desc = desc ? desc : def_desc,
	
	console.log(title)
	console.log(link)
	console.log(imgUrl)
	console.log(desc)
	
	// 如果是小程序环境 也初始化小程序分分享
	if (store.state.env == 'xcx') {
		const xcx_desc = title ? title: desc
		this.$jweixin.miniProgram.postMessage({ data: {hash, imgUrl, desc: xcx_desc } })
	}
  wx.updateAppMessageShareData({
		title, // 分享标题
		desc, // 分享描述
		link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl, // 分享图标
		success: () => {
			if (success) {
				success()
			}
		}
	})
}

// 获取重置分享内容参数
function updateTimelineShareData({ title, hash, link, imgUrl, success }) {	
	const user = uni.getStorageSync('user')
	hash = hash ? hash : ''
	if (user.uid) {
		if (hash.split("?").length > 1) {
			hash = hash + '&suid='+user.uid
		} else {
			hash = hash + '?suid='+user.uid
		}
	}

	if (!link && hash) {
		link = def_link + hash
	}
	link = link ? link : def_link
	title = title ? title : def_title
	imgUrl = imgUrl ? imgUrl : def_imgUrl
	console.log(link)
  wx.updateTimelineShareData({
		title, // 分享标题
		link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl, // 分享图标
		success: function () {
			if (success) {
				success()
			}
		}
	})
}

module.exports = {
	updateTimelineShareData,
	updateAppMessageShareData,
}

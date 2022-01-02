import axios from 'axios'
import { apiDomain } from '@/configs/env'

const developmentDomain = uni.getStorageSync('developmentDomain')
console.log('developmentDomain', developmentDomain)

//真机获取  
axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
	return new Promise((resolve, reject) => {
		console.log("请求体",config.data)
		// config.data = config.data ? JSON.parse(config.data) : []
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				}
				settle(resolve, reject, response)
			}
		})
	})
}

// 创建axios实例
const service = axios.create({
	withCredentials: true,
	crossDomain: true,
	// #ifdef H5
	baseURL: '/prefix',
	// #endif
	// #ifdef APP-PLUS
	baseURL: developmentDomain ? developmentDomain : apiDomain,
	// #endif
	// timeout: 6000
  // timeout: 5000 // 请求超时时间
})




// request拦截器
service.interceptors.request.use(
  config => {
		
		// #ifdef APP-PLUS
		const token = uni.getStorageSync('token')
		const cookie = uni.getStorageSync('cookie')
		config.headers = {
			token,
			cookie,
		}
		// #endif
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const data = response.data
		// console.log('response', response)
    const { success, msg, errorCode } = response.data
    if (success === false) { // 后台接口报错时的统一返回格式，和后台开发人员确认
      if(['http_401', 'http_403'].indexOf(errorCode) !== -1){ // 未登录或者授权过期跳转登录页
        uni.reLaunch({
        	url: '/pages/index/login',
        })
      } else {
				uni.showToast({
					title: msg,
					icon: 'none',
				})
			}
			
      return Promise.reject(response.data)
    } else {
      return data
    }
  },
  error => {
    console.log('err==' + error) // for debug
    if (error) {
      uni.showToast({
      	title: '网络错误',
      	icon: 'none',
      })
    }
    return Promise.reject(error)
  }
)
export default service

// hello-job vuex配置
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		sysNav: {}, // 系统状态栏或导航栏高度
		city: uni.getStorageSync('city') || '' // 当前城市
	},
	mutations:{
		// 设置导航栏高度
		SET_SYSTEM_NAV(state, value) {
			state.sysNav = value
		},
		// 设置城市
		SET_CITY(state, value) {
			state.city = value
			uni.setStorageSync('city', value) // 存缓存
		}
	},
	actions:{
		/* 获取系统状态栏高度 */
		GetSystemInfo({ commit, state }) {
			const data = {}
			// #ifdef MP-WEIXIN
			const nav = uni.getMenuButtonBoundingClientRect()
			data.top = nav.top
			data.height = nav.height
			// #endif
			
			// #ifdef H5
			data.top = 0
			data.height = 0
			// #endif
			// console.log('GetSystemInfo---', data);
			commit('SET_SYSTEM_NAV', data) // 设置设备类型
		},
		GetCurrentCity({commit, state }) {
			
		}
	},
	getters: {
		sysNav: state => state.sysNav,
		city: state => state.city,
	}
})

export default store
import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from './store/index.js'
import common from '@/mixin/common' // 全局函数
import nativeUI from '@/mixin/nativeUI' // 全局ui

// 引入uView主JS库
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
		store,
})
app.$mount()

Vue.mixin(common)
Vue.mixin(nativeUI)
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
<!-- 引入uView基础样式 -->
<!-- // <style lang="scss">
// 	* 注意要写在第一行，同时给style标签加入lang="scss"属性 *
// 	@import "@/uni_modules/uview-ui/index.scss";
// </style> -->

<script>
	import {mapActions} from 'vuex'
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			this.GetSystemInfo()
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		methods:{
			...mapActions(['GetSystemInfo']),
			/* ...mapMutations([
			  'SET_SYSTEM_NAV'
			]), */
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";	// 引入uView基础样式 
	@import '@/static/style/style.scss';
	@import '@/static/style/mixins.scss';
	@import '@/static/style/variables.scss';
	/*每个页面公共css */
	.page {
		background: $default-bg-color;
		color: #303133;
		// padding: 0 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		// font-weight: 400;
		min-height: 100vh;
	}
</style>

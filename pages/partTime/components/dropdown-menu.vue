<template>
	<view>
		<view 
			v-if="show" 
			class="mask" 
			:style="{'--top':sysNav.top + sysNav.height + 50 }" 
			@click="maskClick" 
			@touchmove.stop.prevent="moveHandle">
		</view>
		<view scroll-y="true" v-if="show" class="bg-fff select-menu-block" :style="{'--top':sysNav.top + sysNav.height + 50 }">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import DropdownItem from './dropdown-item.vue'
	export default {
		name: 'dropdown-item',
		components: { DropdownItem },
		data() {
			return {
				show: false, // 筛选下拉框显隐
			};
		},
		computed:{
			...mapState(['sysNav']),
		},
		methods: {
			maskClick(){
				this.$emit('mask')
			},
			moveHandle(){},
		}
	}
</script>

<style lang="scss" scoped>
	
	.mask {
		position: fixed;
		/* #ifdef MP-WEIXIN */
		top: calc(var(--top)*2rpx);
		/* #endif */
		/* #ifdef H5 */
		top: 100rpx;
		/* #endif */
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: rgba($color: #000000, $alpha: 0.3);
		z-index: -1;
		overflow: hidden;
	}
		
	.select-menu-block {
		min-height: 300rpx;
		max-height: 800rpx;
		border-radius: 0 0 12rpx 12rpx;
		position: fixed;
		top: calc(var(--top)*2rpx);
		left: 0;
		right: 0;
		box-sizing: border-box;
		overflow-y: hidden;
	}
	
</style>

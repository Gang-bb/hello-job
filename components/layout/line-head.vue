<template>
	<view class="head row-between">
		<view class="head-left row center">
			<view class="head-left-line m-r-10"></view>
			<text>{{title}}</text>
		</view>
		<slot>
			<view v-if="isReload" class="row-center" @click="$emit('reload')">
				<u-icon name="reload" color="#999" size="20"></u-icon><text class="m-l-15 f-s-22">换一换</text>
			</view>
		</slot>
	</view>
</template>

<script>
	export default {
		name: 'line-head',
		props:{
			title: {
				type: String,
				default: ''
			},
			isReload: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/style/variables.scss';
	.head {
		width: 100%;
		.head-left {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			.head-left-line {
				width: 10rpx;
				height: 30rpx;
				border-radius: 6rpx;
				background: $primary-color;
			}
		}
		
	}
</style>

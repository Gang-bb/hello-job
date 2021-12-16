<template>
	<view>
		<u-navbar :safeAreaInsetTop="true" :fixed="true" :placeholder="true" bgColor="#fff">
			<view class="row-center" slot="left">
				<view class="nav-left">
					<text class="city-text">广州</text>
					<u-icon name="arrow-down" size="15"></u-icon>
				</view>
				<view class="m-l-20">
					<u-search placeholder="搜索你喜欢的兼职" disabled v-model="keyword" shape="round" :showAction="false" :clearabled="true" height="46"></u-search>
				</view>
			</view>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		name:'commonNav',
		data() {
			return {
				keyword: '', // 搜索框绑定字段
			};
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifdef H5 */
	.u-search {
		width: 550rpx;
	}
	/* #endif */
	
	.nav-left {
		display: flex;
		align-items: center;
		.city-text {
			font-size: 26rpx;
			color: #333;
			margin-right: 20rpx;
		}
	}
	
</style>

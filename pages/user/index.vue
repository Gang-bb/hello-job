<template>
	<view class="page user-page">
		<!-- 用户信息 -->
		<view class="top-block">
			<view class="user-box">
				<u-navbar :safeAreaInsetTop="true" leftIcon=" " :fixed="true" :placeholder="true" bgColor="transparent"></u-navbar>
				<view class="row p-l-r-76 m-t-30">
					<image :src="avater_url" mode="aspectFill" class="user-avatar m-r-50"></image>
					<view class="">
						<view class="row center">
							<text class="f-s-40 m-r-20">张*</text>
							<u-tag text="去实名认证" type="warning" shape="circle"></u-tag>
						</view>
						<view class="f-s-26 m-t-20">139******01</view>
					</view>
				</view>
			</view>
			
			<view class="my-profile box-shadow row-between bg-fff p-30 m-l-r-30">
				<view class="my-profile-left">
					<view class="my-profile-head row center m-b-20">
						<view class="head-left-line m-r-10"></view>我的资料
					</view>
					<view class="f-s-24 m-b-20">企业都喜欢完善度比较高的资料哦~</view>
					<view class="my-profile-btn">立即完善</view>
				</view>
				<view class="" style="">
					<ProgressBar percent="50" />
					<!-- <ProgressBa2 /> -->
				</view>
			</view>
		</view>
		
		<view class="menu-item box-shadow m-t-30 m-l-30 m-r-30">
			<u-cell title="报名记录" :border="false" isLink>
				<u-badge slot="value" :isDot="true" type="error"></u-badge>
			</u-cell>
		</view>
		
		<view class="menu-block box-shadow m-t-30 m-l-30 m-r-30">
			<view class="menu-item bottom">
				<u-cell title="联系客服" :border="false" isLink>
					<text slot="value" class="tip">欢迎吐槽</text>
				</u-cell>
			</view>
			<view class="menu-item bottom">
				<u-cell title="求助反馈" :border="false" isLink>
					<text slot="value" class="u-slot-value"></text>
				</u-cell>
			</view>
			<view class="menu-item bottom">
				<u-cell title="退出并解绑" :border="false" isLink>
					<text slot="value" class="u-slot-value"></text>
				</u-cell>
			</view>
		</view>
		
	</view>
</template>

<script>
	import ProgressBar from './components/ProgressBar.vue'
	import ProgressBa2 from './components/ProgressBa2.vue'
	export default {
		components: {ProgressBar, ProgressBa2},
		data() {
			return {
				avater_url: require('@/static/images/icon/index/search-more.png'),
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.top-block {
		width: 750rpx;
		height: 600rpx;
		position: relative;
		.user-box {
			width: 750rpx;
			height: 400rpx;
			background: linear-gradient(to right, #E25C41, #E69323);
			border-radius: 0 0 40rpx 40rpx;
			color: #fff;
			.user-avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				border: 8rpx solid #FFFFFF;
			}
		}
		
		.my-profile {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 690rpx;
			border-radius: 12rpx;
			box-sizing: border-box;
			color: #999;
			.my-profile-left {
				width: 100%;
				.my-profile-head {
					font-size: 32rpx;
					font-weight: bold;
					color: #333;
					.head-left-line {
						width: 10rpx;
						height: 30rpx;
						border-radius: 6rpx;
						background: #F56718;
					}
				}
				.my-profile-btn {
					width: 180rpx;
					height: 54rpx;
					line-height: 54rpx;
					text-align: center;
					border-radius: 6rpx;
					background: #F56718;
					color: #fff;
					font-size: 24rpx;
				}
			}
			
		}
	}
	
	.menu-block {
		border-radius: 12rpx;
	}
	
	.menu-item {
		border-radius: 12rpx;
		box-sizing: border-box;
		background: #fff;
		.tip {
			font-size: 24rpx;
			color: #999;
		}
	}
	
	.bottom {
		border-radius: 0;
	}
	
</style>

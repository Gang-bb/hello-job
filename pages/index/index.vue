<template>
	<view class="page">
		<u-navbar :safeAreaInsetTop="true" :fixed="true" :placeholder="true" bgColor="#F8F8F8">
			<view class="nav-left" slot="left">
				<text class="city-text">广州</text>
				<u-icon name="arrow-down" size="15"></u-icon>
			</view>
			<view class="" slot="right">
				<u-search placeholder="搜索你喜欢的兼职" v-model="keyword" shape="round" :showAction="false" :clearabled="true" @change="" @search="" @blur="" @focus=""></u-search>
			</view>
		</u-navbar>
		<view class="top-tab-block m-b-20">
			<u-tabs 
				:list="topTabList" :current="tabIndex" sticky lineWidth="20" lineHeight="4" lineColor="#F56718"
				:activeStyle="{color: '#F56718',fontWeight: 'bold', fontSize: '32rpx'}"
				:inactiveStyle="{color: '#303133', fontSize: '26rpx'}"
				itemStyle="height: 80rpx;">
			</u-tabs>
		</view>
		<!-- 金刚区 -->
		<view class="m-b-20">
			<u-grid :border="false" col="5">
				<u-grid-item v-for="(listItem,listIndex) in categorys" :key="listIndex">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="listItem.name" :size="40"></u-icon>
					<text class="categorys-text">{{listItem.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<!-- 轮播图 -->
		<u-swiper :list="banners" height="300rpx" @change="e => bannerIndex = e.current" :autoplay="false">
			<view slot="indicator" class="indicator">
				<view class="indicator__dot" v-for="(item, index) in banners" :key="index" :class="[index === bannerIndex && 'indicator__dot--active']"></view>
			</view>
		</u-swiper>
		<!-- 卡片 -->
		<view class="top-card-block">
			<view class="card-item">
				<view class="card-item-left">
					<view class="card-item-title">周末兼职</view>
					<view class="card-item-text">赚点零花钱</view>
				</view>
				<u-icon name="photo" :size="60"></u-icon>
			</view>
			<view class="card-item">
				<view class="card-item-left">
					<view class="card-item-title">周末兼职</view>
					<view class="card-item-text">赚点零花钱</view>
				</view>
				<u-icon name="photo" :size="60"></u-icon>
			</view>
		</view>
		<!-- 名企兼职 -->
		<view class="mqjz-block">
			<view class="mqjz-head m-b-20">
				<view class="head-left-line"></view>名企兼职
			</view>
			<view class="mqjz-tip m-b-20">工作好~环境好~福利更好~</view>
			<view class="job-list">
				<view v-for="(item, index) in 3" :key="index">
					<view class="job-item m-b-20">
						<view class="job-item-left">
							<image src="https://cdn.uviewui.com/uview/album/1.jpg" mode="aspectFill"></image>
							<view class="">
								<view>货拉拉</view>
								<view class="job-text job-inline">1个岗位在招，工作简单自由就等你1个岗位在招，工作简单自由就等你1个岗位在招，工作简单自由就等你</view>
							</view>
						</view>
						
						<view class="">200/单</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '', // 搜索框绑定字段
				tabIndex: 0, // 当前选中tab
				topTabList:[
					{
						name: '推荐'
					}, {
						name: '附近'
					}
				],
				categorys: [
					{
						name: 'photo',
						title: '图片'
					},
					{
							name: 'lock',
							title: '锁头'
					},
					{
							name: 'star',
							title: '星星'
					},
					{
							name: 'hourglass',
							title: '沙漏'
					},
					{
							name: 'home',
							title: '首页'
					}
				],
				bannerIndex: 0,
				banners: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],
			}
		},
		onLoad() {

		},
		methods: {
			init(){
				return {
					getData: () => {
						
					},
					network: ()=> {
						
					}
				}
			},
			handler(){
				return {
					click(name) {
						this.$refs.uToast.success(`点击了第${name}个`)
					}
				}
			},
			network(){
				return {
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 修改微信小程序环境组件的navbar右插槽样式
	/deep/.u-navbar__content__right.data-v-95dec1ae {
		right: 160rpx;
	}
	.nav-left {
		display: flex;
		align-items: center;
		.city-text {
			font-size: 26rpx;
			color: #333;
			margin-right: 20rpx;
		}
	}
	
	.top-tab-block {
		width: 300rpx;
	}
	
	.categorys-text {
		font-size: 26rpx;
		padding: 10rpx 0 20rpx 0rpx;
		box-sizing: border-box;
	}
	
	// 轮播图指示器样式 
	.indicator {
		@include flex(row);
		justify-content: center;
		&__dot {
			height: 10rpx;
			width: 10rpx;
			border-radius: 50%;
			background-color: rgba(255, 255, 255, 0.35);
			margin: 0 10rpx;
			transition: background-color 0.3s;
			&--active {
				width: 30rpx;
				border-radius: 6rpx;
				background-color: #ffffff;
			}
		}
	}
	
	.top-card-block {
		display: flex;
		width: 100%;
		// padding: 30rpx 0;
		background: #fff;
		border-radius: 12rpx;
		margin-top: 20rpx;
		.card-item {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 50%;
			padding: 30rpx 50rpx 30rpx 30rpx;
			.card-item-left {
				// margin-right: 60rpx;
				.card-item-title {
					font-size: 28rpx;
				}
				.card-item-text {
					margin-top: 10rpx;
					color: #999;
					font-size: 24rpx;
				}
			}
			
		}
		
		.card-item:first-child {
			border-right: 1rpx solid #eaeaea;
		}
	}
	
	// 名企兼职
	.mqjz-block {
		margin-top: 60rpx;
		.mqjz-head {
			display: flex;
			align-items: center;
			font-size: 32rpx;
			font-weight: bold;
			.head-left-line {
				width: 10rpx;
				height: 30rpx;
				border-radius: 3rpx;
				background: #F56718;
				margin-right: 8rpx;
			}
		}
		
		.mqjz-tip {
			color: #999;
			font-size: 22rpx;
			margin-left: 10rpx;
		}
		
		.job-list {
			padding-bottom: 30rpx;
			.job-item {
				width: 100%;
				box-sizing: border-box;
				display: flex;
				// align-items: center;
				justify-content: space-between;
				padding: 30rpx;
				color: #F56718;
				font-size: 30rpx;
				font-weight: bold;
				background: #fff;
				border-radius: 12rpx;
				box-shadow: 0 3rpx 4rpx rgba($color: #000000, $alpha: 0.05);
				.job-item-left {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #303133;
					>image {
						display: block;
						width: 80rpx;
						height: 80rpx;
						margin-right: 20rpx;
					}
					.job-text {
						font-size: 22rpx;
						color: #999;
						font-weight: normal;
						margin-top: 15rpx;
						width: 100%;
						width: 400rpx;
					}
				}
			}
			
		}
	}
</style>

<template>
	<view class="page index-page">
		<!-- nav -->
		<u-navbar :safeAreaInsetTop="true" :fixed="true" :placeholder="true" bgColor="#fff">
			<view class="nav-left" slot="left">
				<text class="city-text">广州</text>
				<u-icon name="arrow-down" size="15"></u-icon>
			</view>
			<view class="" slot="right">
				<u-search placeholder="搜索你喜欢的兼职" v-model="keyword" shape="round" :showAction="false" :clearabled="true" @change="" @search="" @blur="" @focus=""></u-search>
			</view>
		</u-navbar>
		<!-- 顶部tab -->
		<u-sticky :offset-top="nav.top + nav.height">
			<view style="width: 750rpx;" class="bg-fff border-box">
				<view class="top-tab-block m-b-20 p-l-r-30">
					<u-tabs 
						:list="topTabList" :current="tabIndex" lineWidth="20" lineHeight="4" lineColor="#F56718"
						:activeStyle="{color: '#F56718',fontWeight: 'bold', fontSize: '32rpx'}"
						:inactiveStyle="{color: '#303133', fontSize: '26rpx'}"
						itemStyle="height: 80rpx;">
					</u-tabs>
				</view>
			</view>
			
		</u-sticky>
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
		<view class="bg-F8F8F8 p-t-20 p-l-30 p-r-30">
			<u-swiper :list="banners" height="300rpx" @change="e => bannerIndex = e.current" :autoplay="false">
				<view slot="indicator" class="indicator">
					<view class="indicator__dot" v-for="(item, index) in banners" :key="index" :class="[index === bannerIndex && 'indicator__dot--active']"></view>
				</view>
			</u-swiper>
		</view>
		<!-- 卡片 -->
		<view class="top-card-block bg-F8F8F8">
			<view class="card-item bg-fff">
				<view class="card-item-left">
					<view class="card-item-title">周末兼职</view>
					<view class="card-item-text">赚点零花钱</view>
				</view>
				<u-icon name="photo" :size="60"></u-icon>
			</view>
			<view class="card-item bg-fff">
				<view class="card-item-left">
					<view class="card-item-title">周末兼职</view>
					<view class="card-item-text">赚点零花钱</view>
				</view>
				<u-icon name="photo" :size="60"></u-icon>
			</view>
		</view>
		<!-- 名企兼职 -->
		<view class="mqjz-block bg-F8F8F8 p-l-30 p-r-30 p-t-60 p-b-20">
			<view class="mqjz-head m-b-20">
				<view class="head-left-line"></view>名企兼职
			</view>
			<view class="mqjz-tip m-b-20">工作好~环境好~福利更好~</view>
			<view class="jz-item m-b-20">
				<view class="jz-item-left">
					<image src="https://cdn.uviewui.com/uview/album/1.jpg" mode="aspectFill"></image>
					<view class="">
						<view>货拉拉</view>
						<view class="jz-text job-inline">1个岗位在招，工作简单自由就等你1个岗位在招，工作简单自由就等你1个岗位在招，工作简单自由就等你</view>
					</view>
				</view>
				<view class="">200/单</view>
			</view>
			<view class="more-item m-b-20">
				更多名企兼职，点这里发现！>
				<image src="@/static/images/icon/index/search-more.png" mode="aspectFill" class="bg"></image>
			</view>
		</view>
		<!-- 中间tab -->
		<u-sticky :offset-top="nav.top + nav.height">
			<view class="bg-fff m-b-20 p-l-r-30 center-tab-block">
				<u-tabs
					:list="centerTabList" :current="cTabIndex" lineWidth="20" lineHeight="2" lineColor="#F56718"
					:activeStyle="{color: '#F56718',fontWeight: 'bold', fontSize: '30rpx'}"
					:inactiveStyle="{color: '#303133', fontSize: '26rpx'}"
					itemStyle="height: 80rpx;">
				</u-tabs>
			</view>
		</u-sticky>
		<!-- 底部兼职列表 -->
		<view class="job-list bg-fff">
			<view class="job-item" v-for="(item, index) in 9" :key="index">
				<view class="job-title">
					<view class="job-title-left">
						<text class="m-r-10 job-inline">在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职</text>
						<u-icon color="#3c9cff" size="15" name="level"></u-icon>
					</view>
					<view class="money c-F56718">200元/天</view>
				</view>
				<!-- 是否企业直招、是否热点招聘、工资结算方式、是否有提成、是否有免费培训、是否包吃、是否包住、是否有交通补贴、 -->
				<view class="label-block p-t-b-20">
					<view class="blue-tag">企业直招</view>
					<view class="blue-tag orange">有提成</view>
				</view>
				<view class="company-info">
					<view class="company-name">
						<text class="m-r-10">上海为课网络科技有限公司</text>
						<u-icon color="#3c9cff" size="15" name="level"></u-icon>
					</view>
					<view class="">江南</view>
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
				cTabIndex: 0, // 当前选中tab
				centerTabList:[
					{
						name: '推荐'
					}, {
						name: '附近'
					},{
						name: '推荐'
					}, {
						name: '附近'
					},
				],
				
			}
		},
		computed:{
			nav(){
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
				return data
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
	
	/deep/.u-tag--mini.data-v-3732d7af {
	    width: fit-content;
	}
	
	.index-page {
		padding-bottom: 30rpx;
		background-color: #FFFFFF;
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
		width: 750rpx;
		box-sizing: border-box;
		border-radius: 12rpx;
		padding: 20rpx 30rpx;
		.card-item {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 50%;
			padding: 30rpx 50rpx 30rpx 30rpx;
			background: #fff;
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
		.jz-item {
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
			.jz-item-left {
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
				.jz-text {
					font-size: 22rpx;
					color: #999;
					font-weight: normal;
					margin-top: 15rpx;
					width: 100%;
					width: 400rpx;
				}
			}
		}
		
		.more-item {
			box-sizing: border-box;
			background: #fff;
			border-radius: 12rpx;
			box-shadow: 0 3rpx 4rpx rgba($color: #000000, $alpha: 0.05);
			padding: 0 30rpx;
			width: 100%;
			height: 140rpx;
			line-height: 140rpx;
			font-size: 24rpx;
			color: #666;
			position: relative;
			.bg {
				width: 140rpx;
				height: 140rpx;
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
			}
		}
		
	}
	
	.center-tab-block {
		height: 88rpx;
	}
	
	.job-list {
		.job-item {
			box-sizing: border-box;
			padding: 30rpx;
			width: 100%;
			border-bottom: 1rpx solid #f2f2f2;
			// display: flex;
			// justify-content: space-between;
			.job-title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 30rpx;
				color: #303133;
				font-weight: bold;
				.job-title-left {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 530rpx;
				}
				.money {
					
				}
			}
			
			.label-block {
				display: flex;
				.blue-tag {
					background: #3c9cff;
					padding: 4rpx 10rpx;
					border-radius: 3rpx;
					font-size: 24rpx;
					color: #fff;
					margin-right: 10rpx;
					border: 1rpx solid #3c9cff;
					width: fit-content;
					&.orange {
						border: 1rpx solid #f9ae3d;
						color: #f9ae3d;
						background-color: #fdf6ec;
					}
				}
				
			}
			
			.company-info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #999;
				font-size: 24rpx;
				.company-name {
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			
		}
	}	
</style>

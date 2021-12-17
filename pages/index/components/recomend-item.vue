<template>
	<view>
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
			<view class="card-item row-between bg-fff">
				<view class="card-item-left">
					<view class="card-item-title">周末兼职</view>
					<view class="card-item-text">赚点零花钱</view>
				</view>
				<u-icon name="photo" :size="60"></u-icon>
			</view>
			<view class="card-item row-between bg-fff">
				<view class="card-item-left">
					<view class="card-item-title">在线兼职</view>
					<view class="card-item-text">在家就能做</view>
				</view>
				<u-icon name="home" :size="60"></u-icon>
			</view>
		</view>
		<!-- 名企兼职 -->
		<view class="mqjz-block bg-F8F8F8 p-l-30 p-r-30 p-t-60 p-b-20">
			<view class="mqjz-head row center m-b-20">
				<view class="head-left-line"></view>名企兼职
			</view>
			<view class="mqjz-tip m-b-20">工作好~环境好~福利更好~</view>
			<view class="jz-item box-shadow row space-between m-b-20">
				<view class="jz-item-left row center">
					<image src="https://cdn.uviewui.com/uview/album/1.jpg" mode="aspectFill"></image>
					<view class="">
						<view>货拉拉</view>
						<view class="jz-text job-inline">1个岗位在招，工作简单自由就等你1个岗位在招，工作简单自由就等你1个岗位在招，工作简单自由就等你</view>
					</view>
				</view>
				<view class="">200/单</view>
			</view>
			<view class="more-item box-shadow m-b-20">
				更多名企兼职，点这里发现！>
				<image src="@/static/images/icon/index/search-more.png" mode="aspectFill" class="bg"></image>
			</view>
		</view>
		<!-- 中间tab -->
		<u-sticky :offset-top="sysNav.top + sysNav.height">
			<view class="bg-fff m-b-20 p-l-r-30 center-tab-block bottom-line">
				<u-tabs
					:list="centerTabList" :current="cTabIndex" lineWidth="20" lineHeight="3" lineColor="#F56718"
					:activeStyle="{color: '#333',fontWeight: 'bold', fontSize: '30rpx'}"
					:inactiveStyle="{color: '#303133', fontSize: '26rpx'}"
					itemStyle="padding: 20rpx 30rpx;">
				</u-tabs>
				<view class="row f-s-22 m-t-10">
					<view class="row-center select-box m-r-20">
						<text class="m-r-10">类型</text>
						<u-icon name="arrow-down" size="9"></u-icon>
					</view>
					<view class="row-center select-box">
						<text class="m-r-10">区域</text>
						<u-icon name="arrow-down" size="9"></u-icon>
					</view>
				</view>
			</view>
		</u-sticky>
		<!-- 底部兼职列表 -->
		<JobList :list="jobList"></JobList>
	</view>
</template>

<script>
	import JobList from '@/components/list/job-list.vue'
	import {mapState} from 'vuex'
	export default {
		name: 'recomend-item',
		components: { JobList },
		data() {
			return {
				categorys: [
					{
						name: 'photo',
						title: '热招兼职'
					},
					{
							name: 'lock',
							title: '学生兼职'
					},
					{
							name: 'star',
							title: '高薪日结'
					},
					{
							name: 'hourglass',
							title: '严选兼职'
					},
					{
							name: 'home',
							title: '企业直招'
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
						name: '精选'
					}, {
						name: '在线课程'
					},{
						name: '技能兼职'
					}, {
						name: '日结兼职'
					}
				],
				jobList:[
					{
						title:'在家线上学习PS做兼职',
						level: 0,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司',
						good: 0,
						place: '江南'
					},{
						title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
						level: 1,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司上海为课网络科技有限公司',
						good: 1,
						place: '江南江南江南江南江南江南江南江南江南江南'
					},{
						title:'在家线上学习PS做兼职',
						level: 0,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司',
						good: 0,
						place: '江南'
					},{
						title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
						level: 1,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司上海为课网络科技有限公司',
						good: 1,
						place: '江南江南江南江南江南江南江南江南江南江南'
					},{
						title:'在家线上学习PS做兼职',
						level: 0,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司',
						good: 0,
						place: '江南'
					},{
						title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
						level: 1,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司上海为课网络科技有限公司',
						good: 1,
						place: '江南江南江南江南江南江南江南江南江南江南'
					},{
						title:'在家线上学习PS做兼职',
						level: 0,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司',
						good: 0,
						place: '江南'
					},{
						title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
						level: 1,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司上海为课网络科技有限公司',
						good: 1,
						place: '江南江南江南江南江南江南江南江南江南江南'
					},{
						title:'在家线上学习PS做兼职',
						level: 0,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司',
						good: 0,
						place: '江南'
					},{
						title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
						level: 1,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司上海为课网络科技有限公司',
						good: 1,
						place: '江南江南江南江南江南江南江南江南江南江南'
					},
				]
				
			};
		},
		computed:{
			...mapState(['sysNav'])
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	
	.categorys-text {
		font-size: 24rpx;
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
			width: 50%;
			padding: 30rpx 50rpx 30rpx 30rpx;
			background: #fff;
			.card-item-left {
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
			padding: 30rpx;
			color: #F56718;
			font-size: 30rpx;
			font-weight: bold;
			background: #fff;
			border-radius: 12rpx;
			.jz-item-left {
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
		height: 150rpx;
	}
	
	.select-box {
		padding: 6rpx 20rpx;
		background-color: #eee;
		border-radius: 20rpx;
	}
	
</style>

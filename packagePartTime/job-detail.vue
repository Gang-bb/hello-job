<template>
	<view class="page p-b-30">
		<view class="detail-top">
			<image src="" mode="aspectFill" class="detail-top-bg"></image>
			<view class="detail-top-title p-30">
				<view class="f-s-40 m-t-20 m-b-20">白班快递分拣150一天</view>
				<view class="m-b-20 f-s-32 color main">150元/天</view>
				<view class="f-s-28">兴宁|短招</view>
			</view>
			<view class="detail-top-date detail-box">
				<view class="row start m-b-30">
					<u-icon name="calendar" size="20" color="#999"></u-icon>
					<view class="m-l-20">
						<view class="f-s-26 m-b-20 color font">工作日期</view>
						<view class="f-s-24">12月10日-12月31日（报名后具体沟通）</view>
					</view>
				</view>
				<view class="row start">
					<u-icon name="map" size="20" color="#999"></u-icon>
					<view class="m-l-20">
						<view class="f-s-26 m-b-20 color">工作地点</view>
						<view class="f-s-24">三塘昆仑大道金仑路10号</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 职位详情 -->
		<view class="detail-box f-s-26 c6 m-30">
			<LineHead title="职位详情"/>
			<view class="content m-t-30">
				【工作内容】
			</view>
			<view class="content">
				【任职要求】<text>双十二招聘200名兼职，要求：男女不限，16-50岁</text>
			</view>
			<view class="content">【工作时间】</view>
			<view class="content">
				12月10-12月11日(培训两天有工资)早班8-20,14/小时
				中班14.00-1.30。15/小时12月12—12月15日中班转夜班
				早班:8:00～21:00(14元/小时)
				夜班:20:00～08:00(15元/小时)(补贴10元)有休息时间,休息吃饭时间不算工时,相对轻松,都是小件货!
			</view>
			<view class="content">
				工作内容:<text>根据需求在指定区域打包、捡货。</text>
			</view>
			<view class="content">
				工资发放说明:<text>满5天才有工资,活动结束后一周内结算。</text>
			</view>
			<view class="content">
				提供住宿10元一天,不住不扣。吃饭有食堂自费10一20一餐。
			</view>
		</view>
		
		<!-- 温馨提醒 -->
		<view class="detail-box f-s-26 c6 m-30">
			<LineHead title="温馨提醒" class="m-b-40 " />
			<view class="row start m-t-30">
				<u-icon name="info-circle" size="17" color="#F56718" class="m-r-6"></u-icon>
				<text class="main-color f-s-22">凡涉及到工作内容不符,收费、违法信息传播的工作,请您警惕并收集关联证据向我们举报。</text>
			</view>
		</view>
		
		<!-- 发布机构 -->
		<view class="detail-box f-s-26 c6 m-30">
			<LineHead title="发布机构" />
			<view class="row-between m-t-30">
				<view class="row center" @click="navigateTos('/packagePartTime/company-detail')">
					<view class="org-avatar m-r-30">
						<image src="../static/images/icon/index/search-more.png" mode="aspectFill"></image>
						<view class="row-center org-tag f-s-20 color white">
							<u-icon name="integral-fill" size="10" color="#fff" class="m-r-6"></u-icon>
							企业认证
						</view>
					</view>
					<view class="">
						<view class="f-s-28 color m-b-15">广西瑞申电子设备有限公司</view>
						<view class="f-s-24 c9">1个岗位在招</view>
					</view>
				</view>
				
				<u-icon name="arrow-right" size="17" color="#999"></u-icon>
			</view>
		</view>
		
		<!-- 根据你浏览的职位推荐 -->
		<view class="detail-box f-s-26 c6 m-30 detail-box-bottom">
			<view class="p-b-30 p-l-30 p-r-30 bottom-line" style="width: 630rpx;">
				<LineHead title="根据你浏览的职位推荐" class="" :isReload="true" @reload="()=>handler().reload()" />
			</view>
			
			<JobList :list="jobList"></JobList>
		</view>
		
	</view>
</template>

<script>
	import LineHead from '@/components/layout/line-head.vue'
	import JobList from '@/components/list/job-list.vue'
	export default {
		components: { LineHead, JobList },
		data() {
			return {
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
		methods: {
			handler(){
				return {
					reload: ()=> {
						
					},
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'static/style/variables.scss';
	/deep/.job-list .job-item:last-child {
		border-bottom: none;
	}
	.detail-box {
		box-sizing: border-box;
		width: 690rpx;
		background: #fff;
		border-radius: 12rpx;
		padding: 50rpx 30rpx;
		box-shadow: 0 3rpx 6rpx rgba($color: #000000, $alpha: 0.05);
	}
	
	.detail-box-bottom {
		padding: 50rpx 0 0 0;
		overflow: hidden;
	}
	
	.detail-top {
		width: 750rpx;
		height: 560rpx;
		position: relative;
		.detail-top-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 350rpx;
			background: #000;
			border-radius: 0 0 20rpx 20rpx;
		}
		
		.detail-top-title {
			position: absolute;
			top: 0;
			left: 0;
			color: #fff;
		}
		
		.detail-top-date {
			position: absolute;
			bottom: 0;
			left: 0;
			margin: 0 30rpx;
			color: #999;
		}
		
	}
	
	.content {
		line-height: 40rpx;
	}
	
	.org-avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		position: relative;
		>image {
			display: block;
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		.org-tag {
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 100%;
			background-color: $primary-color;
			border-radius: 20rpx;
			padding: 2rpx 10rpx;
		}
	}
	
</style>

<template>
	<view class="page index-page">
		<!-- nav -->
		<CommonNav />
		<!-- 顶部tab -->
		<u-sticky :offset-top="sysNav.top + sysNav.height">
			<view class="bg-fff border-box top-box">
				<view class="top-tab-block m-b-20 p-l-r-30">
					<u-tabs 
						:list="topTabList" :current="tabIndex" lineWidth="20" lineHeight="4" lineColor="#F56718"
						:activeStyle="{color: '#F56718',fontWeight: 'bold', fontSize: '32rpx'}"
						:inactiveStyle="{color: '#303133', fontSize: '26rpx'}"
						itemStyle="height: 80rpx;" @change="(item)=>handler().click(item)">
					</u-tabs>
				</view>
			</view>
		</u-sticky>
		<!-- 推荐 -->
		<view class="" v-if="tabIndex===0">
			<RecomendItem />
		</view>
		<!-- 附近 -->
		<view class="" v-else>
			<!-- 地点 -->
			<view class="place-box row-between m-t-20 m-b-40 p-l-r-30">
				<view class="row-center place-box-left">
					<u-icon name="reload" size="15" color=""></u-icon>
					<text class="f-s-22 job-inline m-l-15">广西壮族自治区南宁市兴宁区金仑路32号广西壮族自治区南宁市兴宁区金仑路32号</text>
				</view>
				<view class="row-center place-box-right">
					<text class="f-s-22 m-r-15 job-inline">5公里内5公里内5公里内5公里内</text>
					<u-icon name="arrow-down" size="12" color=""></u-icon>
				</view>
			</view>
			<u-sticky :offset-top="sysNav.top + sysNav.height">
				<view class="row center f-s-22 m-t-b-20 p-l-r-30 bg-fff near-select-block">
					<view class="row-center select-box m-r-20">
						<text class="m-r-10">兼职猫自营</text>
					</view>
					<view class="row-center select-box m-r-20">
						<text class="m-r-10">类型</text>
						<u-icon name="arrow-down" size="9"></u-icon>
					</view>
					<view class="row-center select-box">
						<text class="m-r-10">排序</text>
						<u-icon name="arrow-down" size="9"></u-icon>
					</view>
				</view>
			</u-sticky>
			
			<JobList :list="jobList"></JobList>
		</view>
		<u-back-top :scroll-top="scrollTop" icon="arrow-up" :iconStyle="iStyle" :customStyle="cStyle"></u-back-top>
	</view>
</template>

<script>
	import CommonNav from '@/components/layout/common-nav.vue'
	import JobList from '@/components/list/job-list.vue'
	import RecomendItem from './components/recomend-item.vue'
	import {mapState} from 'vuex'
	import {getUserAddress} from '@/utils/util'
	export default {
		components: { CommonNav, JobList, RecomendItem },
		data() {
			return {
				scrollTop: 0, 
				// mode: 'circle',
				iStyle: {
					fontSize: '32rpx',
					color: '#ffffff',
				},
				cStyle: {
					backgroundColor: '#F56718',
				},
				tabIndex: 0, // 当前选中tab
				topTabList:[
					{
						name: '推荐'
					}, {
						name: '附近'
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
			
			}
		},
		computed:{
			...mapState(['sysNav'])
		},
		onLoad() {
			
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onPullDownRefresh() {
			this.handler().stopPullDownRefresh()
		},
		onReachBottom() {
			
		},
		methods: {
			isGetLocation(a = "scope.userLocation") { // 3. 检查当前是否已经授权访问scope属性，参考下截图
				let _this = this;
				uni.getSetting({
					success(res) {
						if (!res.authSetting[a]) { //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
							uni.setStorageSync('locationData', '')
							openUrl('/pages/login/unlocate', '1')
						} else { // 如果授权了 直接获取定位信息
							getUserAddress(function(val) {
								let locationData = uni.getStorageSync('locationData')
								if (locationData) {
									let params = {
										city_name: locationData.ad_info.city,
										longitude: locationData.location.lng,
										latitude: locationData.location.lat,
										page: 1,
										page_size: 10,
										pon_type: 'tencent'
									}
									getS(params).then(suc => { // 获取距离最近的门店
										console.log(suc, 'suc')
										let {
											data
										} = suc
										if (data.data.length == 0) {
											_this.setStoreID('')
											_this.setStoreData({})
										} else {
											_this.setStoreID(data.data[0].id)
											_this.setStoreData(data.data[0])
										}
									})
								}
							})
						}
					}
				});
			},
			
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
					click: (item)=> {
						const { index, name } = item
						this.tabIndex = index
						// console.log(`点击了`,item, this.tabIndex);
					},
					stopPullDownRefresh: ()=> {
						uni.stopPullDownRefresh()
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
	.index-page {
		padding-bottom: 30rpx;
		background-color: #FFFFFF;
	}
	
	.top-box {
		width: 750rpx;
		height: 100rpx;
		.top-tab-block {
			width: 300rpx;
		}
		
	}
	
	.select-box {
		padding: 6rpx 20rpx;
		background-color: #eee;
		border-radius: 20rpx;
	}
	
	.place-box {
		color: #999;
		box-sizing: border-box;
		.place-box-left {
			width: 460rpx;
		}
		.place-box-right {
			width: 180rpx;
		}
	}
	
	.near-select-block {
		height: 88rpx;
		/* .select-box {
			height: 40rpx;
		} */
	}
	
</style>
